<script>
  export let data;
  import { onDestroy, onMount } from "svelte";
  import { Grid } from "ag-grid-community";

  import "ag-grid-community/styles//ag-grid.css";
  import "ag-grid-community/styles//ag-theme-alpine.css";

  var domNode;
  var grid;
  let dayId = 0;
  let dayDescription = "";
  var columnDefs = [];
  var trainingGrid = [];

  const today = data.today;
	const todayString = new Date(today).toISOString().split('T')[0];;

  // let the grid know which columns and what data to use
  let options = {
    columnDefs: columnDefs,
    rowData: trainingGrid,
    rowEditable: false,
    onGridReady: (params) => {
      params.api.setRowData(trainingGrid);
    },
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

  onMount(() => {
    if (data.trainingProgamDays != null) {
      var trainingProgramDays = data.trainingProgamDays.training_days;
      if(trainingProgramDays != null) {
        /* if there are more than 0 elements in training_days */

        if (data.trainingProgamDays.training_days.length > 0) {
          trainingGrid = data.trainingProgamDays.training_days[0].training_grid;
          loadColumnDefsFromJson();
        }
      }
    }

    grid = new Grid(domNode, options);
    // open the first training day
    if (data.trainingProgamDays != null) {
      if (data.selectedDayId == "" && data.trainingProgamDays.training_days.length > 0) {
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

<div class="container">
	<h3><a data-sveltekit-reload href="/@{data.nickname}/">@{data.nickname} Food Porn</a> 
		| <a data-sveltekit-reload href="/@{data.nickname}/traininglog">Training</a> 
		| <a data-sveltekit-reload href="/@{data.nickname}/foodlog">Food Log</a>
	</h3>
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

<!-- add AgGrid component with grid options -->
<div style="display: flex; justify-content: center; align-items: center;">
  <div
    id="datagrid"
    bind:this={domNode}
    class="ag-theme-alpine"
    style="height: 70vh; width: 100%;"
  />
</div>

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
  
	h3 {
		color:#d95753;
	}
</style>
