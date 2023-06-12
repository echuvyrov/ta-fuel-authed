<script>
  export let data;
  import { onDestroy, onMount } from "svelte";
  import { Grid } from "ag-grid-community";
  import { Chasing } from "svelte-loading-spinners";
  import Modal from "./CreateTrainingProgramModal.svelte";
  import Typeahead from "svelte-typeahead";

  import "ag-grid-community/styles//ag-grid.css";
  import "ag-grid-community/styles//ag-theme-alpine.css";

  var domNode;
  var grid;
  var isLoading = true;
  let showModal = false;
  let dayId = 0;
  let dayDescription = "";
  var columnDefs = [];
  var trainingGrid = [];

  const today = new Date();
	// get month with leading zero
	const todayString = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);

  let typeaheadData = data.exerciseReferences;
  // if typeaheadData does not contain items with "/cmd" options, add them
  if (!typeaheadData.some((item) => item.exercise_name.indexOf("cmd") > 0)) 
  {
    typeaheadData.push({
      user_id: 0,
      exercise_name: "💪 /cmd Count KCals for the Day",
      exercise_id: 0,
    });
  }

  const typeaheadExtract = (item) => item.exercise_name;

  // let the grid know which columns and what data to use
  let options = {
    columnDefs: columnDefs,
    rowData: trainingGrid,
    onCellValueChanged: function (params) {
      updateRecord(params.node, params.data);
    },
    rowEditable: true,
    onGridReady: (params) => {
      params.api.setRowData(trainingGrid);
    },
  };

  const submitTrainingProgram = (e) => {
    isLoading = true;
    document.forms["trainingprogram"].submit();
  };

  const submitTrainingGrid = (e) => {
    /* populate hidden form value and submit form programmatically */
    isLoading = true;
    const exerciseEntered = document.getElementById(
      "exerciseautocomplete"
    ).value;
    document.forms["trainingGrid"].elements["exercise_name"].value =
      exerciseEntered;

    document.forms["trainingGrid"].submit();
  };

  const fillExercise = (e) => {
    if (e.key == "Enter") {
      /* auto-complete the exercise and (maybe) adjust the rest of display fields accordingly
			 i.e., should the fields that follow Deadlift/Squat be different from the fields that follow Run/Swim? */
    }
  };

  const openTrainingDay = (day, day_id) => {
    /* open the training day and populate the grid with the exercises for that day */
    /* turn all tabs to inactive */
    var buttons = document.getElementsByClassName("trainingdaytab");
    dayId = day_id;
    dayDescription = day;

    // Reset all buttons to orange except for the current day
    for (var i = 0; i < buttons.length; i++) {
      /* if the text of the button matches the day, then make it active */
      if (buttons[i].textContent == day) {
        buttons[i].style.backgroundColor = "#007aff";
        // load the training grid for the day by scanning the trainingProgramDays array for the day
        data.trainingProgamDays.training_days.forEach((trainingDay) => {
          if (trainingDay.day_description == day) {
            trainingGrid = trainingDay.training_grid;
            // reload the grid with the new data
            loadColumnDefsFromJson();
            options.api.setColumnDefs(columnDefs);
            options.api.setRowData(trainingGrid);
          }
        });
      } else {
        buttons[i].style.backgroundColor = "#FF3E00";
      }
    }
  };

  /* sveltekit fetch method to update the record */
  async function updateRecord(row, data) {
    // recalc Kcals first by taking integer values of Protein, Carbs, and Fat
    //  and multiplying by 4, 4, and 9 respectively
    const protein = parseInt(data.protein_grams);
    const carbs = parseInt(data.carbs_grams);
    const fat = parseInt(data.fat_grams);
    const kcals = protein * 4 + carbs * 4 + fat * 9;

    data.kkcals = kcals;
    row.setDataValue("kkcals", data.kkcals);

    const jsonData = JSON.stringify(data);
    const res = await fetch("/reference/updaterecord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    if (!res.ok) {
      throw Error(json.message);
    }
  }

  onMount(() => {
    if (data.trainingProgamDays != null) {
      var trainingProgramDays = data.trainingProgamDays.training_days;
      if(trainingProgramDays != null) {
        trainingGrid = data.trainingProgamDays.training_days[0].training_grid;
        loadColumnDefsFromJson();
      }
    }

    grid = new Grid(domNode, options);
    // open the first training day
    if (data.trainingProgamDays != null) {
      if (data.selectedDayId == "") {
        openTrainingDay(data.trainingProgamDays.training_days[0].day_description, data.trainingProgamDays.training_days[0].id);
      } else {
        openTrainingDay(data.selectedDayDescription, data.selectedDayId);
      }
    }
    isLoading = false;
  });

  onDestroy(() => {
    if (grid) {
      grid.destroy();
    }
  });

  function showCreateProgram() {
    showModal = true;
  }

  function createTrainingProgram(event) {
    showModal = false;
  }

  function cancelModal() {
    showModal = false;
  }

  function loadColumnDefsFromJson() {
    if (trainingGrid != null) {
      // reset all columns
      columnDefs = [];
      trainingGrid.forEach((column) => {
        for (const key in column) {
          if (column.hasOwnProperty(key)) {
            const gridColumn = {
              field: key,
              headerName: key,
              editable: true,
              minWidth: 70,
              width: 125
            };

            // add the column to the columnDefs array if the column with the matching key doesn't already exist there
            const columnExists = columnDefs.some(
              (column) => column.field === key
            );

            if (!columnExists) {
              columnDefs.push(gridColumn);
            }
          }
        }
      });
    }
  }
</script>

{#if isLoading}
  <!-- align in the middle of the screen and on top-->
  <div style="display: flex; justify-content: center; padding: 10px;">
    <Chasing size="60" color="#FF3E00" unit="px" duration="1s" />
  </div>
{/if}

<div class="newProgram">
  <button on:click={showCreateProgram}> create new training program </button>
</div>

<!-- tabs for the training program days-->
<div class="trainingdaytabs">
  <!-- loop through all days in data.trainingProgramDays -->
  {#each data.trainingProgamDays.training_days as day}
    <!-- make a pretty button for each tab -->
    <button
      class="trainingdaytab"
      on:click={openTrainingDay(day.day_description, day.id)}
      >{day.day_description}</button
    >
  {/each}
</div>

<div class="exerciseandload">
  <!-- input boxes for exercise and load -->
  <!-- create a div that will take up about 60% of the full width-->
  <form action="?/addexercise" method="POST">
    <Typeahead
      id="exerciseautocomplete"
      name="exerciseautocomplete"
      autofocus
      hideLabel
      focusAfterSelect
      placeholder="Exercise, i.e. Squat or Run"
      limit={5}
      data={typeaheadData}
      extract={typeaheadExtract}
      on:keydown={fillExercise}
      class="training_input"
    />
  </form>

  <form id="trainingGrid" action="?/addexercise" method="POST">
    <input type="hidden" name="day_id" value={dayId} />
    <input type="hidden" name="day_id" value={dayDescription} />
    <input type="hidden" name="exercise_date" value={todayString} />

    <input
      type="hidden"
      name="exercise_name"
      class="training_input"
      width="20%"
    />

    <!-- textbox for load, i.e. weight or distance, should be 50% on mobile but about 20% on desktop -->
    <input
      type="text"
      name="exercise_load"
      placeholder="Load, i.e. weight or distance"
      class="training_input"
      width="20%"
    />

    <!-- textbox for reps -->
    <input
      type="text"
      name="exercise_reps"
      placeholder="Reps"
      class="training_input"
      width="20%"
    />

    <!-- textbox for load, i.e. weight or distance -->
    <input
      type="text"
      name="notes"
      placeholder="Notes, i.e. how you felt or something for next time"
      class="training_input"
      width="30%"
    />

    <input
      type="button"
      value="add"
      on:click={submitTrainingGrid}
      class="training_input submit_button"
    />
  </form>
</div>

<!-- add AgGrid component with grid options -->
<div style="display: flex; justify-content: center; align-items: center;">
  <div
    id="datagrid"
    bind:this={domNode}
    class="ag-theme-alpine"
    style="height: 70vh; width: 100%;"
  />
</div>

{#if showModal}
  <Modal on:save={createTrainingProgram} on:cancel={cancelModal} />
{/if}

<style>
  .training_input {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-sizing: border-box;
    border: none;
    font-size: calc(0.08 * var(--width));
    border-radius: 2px;
    background: #ffffff;
    margin: 0;
    color: #000;
    padding: 5px 5px 5px 5px;
    /* rounded corners */
    border-radius: 5px;
    float: left;
    margin: 5px;
  }

  .submit_button {
    padding-right: 20px;
    padding-left: 20px;
    background: #007aff;
    color: white;
  }

  .submit_button:hover,
  .submit_button:focus {
    /*underline text */
    text-decoration: underline;
    /* turn cursor into a pointer */
    cursor: pointer;
  }

  /* make the button blue and nicely formatted */
  button {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-sizing: border-box;
    border: none;
    font-size: calc(0.08 * var(--width));
    border-radius: 2px;
    background: #007aff;
    margin: 0;
    color: white;
    padding: 5px 5px 5px 5px;
    /* rounded corners */
    border-radius: 5px;
  }

  /* style button with red background and a hover effect, make it pretty */
  /* underline text color on hover */
  button:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .trainingdaytab {
    height: 50px;
    width: 120px;
    display: flex;
    float: left;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-sizing: border-box;
    border: none;
    font-size: calc(0.08 * var(--width));
    border-radius: 2px;
    background: #ff3e00;
    margin: 0px 3px 2px 0px;
    color: white;
    padding: 5px 5px 5px 5px;
    /* rounded corners */
    border-radius: 5px;
  }

  .trainingdaytab:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .selected {
    background-color: #007aff;
  }

  .btn-size {
    width: 30px;
    height: 30px;
  }

  .img-size img {
    width: 75px;
    height: 75px;
  }

  .newProgram {
    display: flex;
    justify-content: left;
    align-items: center;
    padding-bottom: 10px;
  }

  /* make the text inside textarea look nice */
  textarea {
    width: 100%;
    height: 100%;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
  }
  
  /* Media query for mobile */
  @media screen and (max-width: 768px) {
    .training_input {
      width: 100%; /* Set to 100% on screens smaller than 768px */
    }
    #exerciseautocomplete-typeahead {

    }

    .trainingdaytab {
      width: 110px;
    }
  }
  
</style>
