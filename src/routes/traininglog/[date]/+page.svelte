<script>
    export let data;	
	import { onDestroy, onMount } from 'svelte';
	import { Grid } from 'ag-grid-community';
	import { Chasing } from 'svelte-loading-spinners';

	var isLoading = true;
	var trainingGridNode;
    var grid;

	const submitTrainingProgram = (e) => {
		/* populate hidden form value and submit form programmatically */
		isLoading = true;
		document.forms["trainingprogram"].submit();
	}

	/* sveltekit fetch method to update the record */
	async function updateRecord(row, data) {
		/* read the contents of the AgGrid and save it as a JSON object */
		

		/* commenting the update portion to work out the kinks 
		const jsonData = JSON.stringify(data);
		const res = await fetch('/traininglog/[date]/updaterecord', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: jsonData
		});
		const json = await res.json();
		if (!res.ok) {
			console.log(json);
		}
		return json;
		*/
	}

	// resize/hide columns based on grid width
	function onGridSizeChanged(params) {
        // get the current grids width
        var gridWidth = document.getElementById('trainingLog').offsetWidth;

        // keep track of which columns to hide/show
        var columnsToShow = [];
        var columnsToHide = [];

        // iterate over all columns (visible or not) and
		//  determine if we'll need to hide columns
		//   that will be the case if we can't fit them in
        var totalColsWidth = 0;
        var allColumns = params.columnApi.getColumns();
        for (var i = 0; i < allColumns.length; i++) {
            let column = allColumns[i];
            totalColsWidth += column.getMinWidth();

			if (totalColsWidth > gridWidth) {
				// add multiple elements to columnsToShow array
				//  to ensure they are shown in the order we want
				columnsToShow.push('Food');
				columnsToShow.push('Fat');
				columnsToShow.push('Carbs');
				columnsToShow.push('Protein');

				columnsToHide.push('Qty');
				columnsToHide.push('Kcals');

				// show/hide columns based on current grid width
				params.columnApi.setColumnsVisible(columnsToShow, true);
    	    	params.columnApi.setColumnsVisible(columnsToHide, false);

        		// fill out any available space to ensure there are no gaps
        		params.api.sizeColumnsToFit();

				break;
            }
		}

		params.api.sizeColumnsToFit();

	}

	/* training grid config and options */
	let columnDefs = [
		{headerName: "Exercise", field: "exercise", editable: true, colId: 'exercise', minWidth: 200, align: 'left'},
		{headerName: "Date", field: "exercise_date", editable: true, colId: 'exercise_date', minWidth: 100},
	];

	// let the grid know which columns and what data to use
	let options = {
		columnDefs: columnDefs,
		rowData: [], //data.trainingDataForDay,
		rowSelection: 'single',
		onCellValueChanged: function(params)  {
			if(params.colDef.colId === 'Kcals') {
				return;
			} else {
				updateRecord(params.node, params.data);
			}
  		},
		onGridSizeChanged: onGridSizeChanged
	};

	onMount(() => {
        grid = new Grid(trainingGridNode, options);
		isLoading = false;
	});

    onDestroy(() => {
    });

	function openTrainingDay(dayId) {
		// Declare all variables
		var i, tabcontent, tablinks;
		console.log("Day Id: " + dayId);

		// Get all elements with class="tabcontent" and hide them
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}

		// Get all elements with class="tablinks" and remove the class "active"
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}

		// Show the current tab, and add an "active" class to the button that opened the tab
	}
</script>

{#if isLoading}
<!-- align in the middle of the screen and on top-->
<div style="display: flex; justify-content: center; padding: 10px;">
	<Chasing size="60" color="#FF3E00" unit="px" duration="1s" />
</div>
{/if}


{#if !data.trainingProgamDays}
	<details open>
		<summary>Create New Training Program</summary>
		<form action="?/createprogram" method = "POST">
		<textarea
		name="trainingprogram"
		value='Create a training program by writing out on what day to train what 
For example:
	
Day 1: Squats
	
Day 2: Bench Press
	
Day 3: 30-45 mins cardio, light Olympic lifts
	
Day 4: OFF
	
Day 5: Deadlifts
Day 6: Shoulders, Arms
Day 7: 30-45 mins cardio, calisthenics
Day 8: OFF'

		on:focus={(evt) => evt.target.select()}
		/>
		<button on:click={submitTrainingProgram}>Submit</button>
		</form>
	</details>		
{:else}
	<details>
		<summary>Create New Training Program</summary>
		<form action="?/createprogram" method = "POST">
		<textarea
		name="trainingprogram"
		value='Create a training program by writing out on what day to train what 
For example:
	
Day 1: Squats
	
Day 2: Bench Press
	
Day 3: 30-45 mins cardio, light Olympic lifts
	
Day 4: OFF
	
Day 5: Deadlifts
Day 6: Shoulders, Arms
Day 7: 30-45 mins cardio, calisthenics
Day 8: OFF'
	
		on:focus={(evt) => evt.target.select()}
		/>
		<button on:click={submitTrainingProgram}>Submit</button>
		</form>
	</details>
{/if}


<!-- show training_days from data in a page-->

<!-- tabs for the training program days-->
<div class="tab">

	<!-- loop through all days in data.trainingProgramDays -->
	{#each data.trainingProgamDays.training_days as day}
		<button on:click={openTrainingDay('London')}>{day.day_description}</button>
	{/each}

</div>

<!-- workout spreadsheet -->
<div style="display: flex; justify-content: center; align-items: center;">
	<div
		id="trainingLog"
		bind:this={trainingGridNode}
		class="ag-theme-alpine"
		style="height: 170vh; width: 100%;"
	/>
</div>

<style>

textarea {
        height: 300px;
		width: 100%;
		display: flex;
		align-items: left;
		justify-content: left;
		text-align: left;
		box-sizing: border-box;
		border: none;
		font-size: 16px;
		border-radius: 2px;
		background: white;
		margin: 0;
		color: rgba(0, 0, 0, 0.7);
	}

button  {
    padding: 1px;
    background: #d95753;
    border: 0;
	margin: 3px;
}

.img-size img {
    width: 75px;
    height: 75px;
}

/* Style the tab */
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}

/* Style the buttons that are used to open the tab content */
.tab button {
  /* background-color: inherit; */
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 4px 3px;
  transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
}

summary {
	background-color: #ccc;
	widows: 100%;
	cursor: pointer;
	padding: 5px 5px 5px 5px;
	margin-bottom: 20px;
}
summary::-webkit-details-marker {
  color: blue;
}
summary:focus {
  outline-style: none;
}

</style>