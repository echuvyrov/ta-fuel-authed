<script>
    export let data;	
	import { onDestroy, onMount } from 'svelte';
	import { Grid } from 'ag-grid-community';
	import { Chasing } from 'svelte-loading-spinners';
	import Modal from './CreateTrainingProgramModal.svelte';
	
	import 'ag-grid-community/styles//ag-grid.css';
	import 'ag-grid-community/styles//ag-theme-alpine.css';

	var domNode;
    var grid;
	var isLoading = true;
	let showModal = false;

	const today = new Date();

	let columnDefs = [
		{headerName: "Exercise", field: "exercise", editable: true, minWidth: 200},
		{headerName: "Date", field: "exercise_date", editable: true, minWidth: 100}
	];
    
	// let the grid know which columns and what data to use
	let options = {
		columnDefs: columnDefs,
		rowData: data.trainingData,
		onCellValueChanged: function(params)  {
			updateRecord(params.node, params.data);
  		},
	};

	const submitTrainingProgram = (e) => {
		/* populate hidden form value and submit form programmatically */
		isLoading = true;
		document.forms["trainingprogram"].submit();
	}

	/* sveltekit fetch method to update the record */
	async function updateRecord(row, data) {
		// recalc Kcals first by taking integer values of Protein, Carbs, and Fat
		//  and multiplying by 4, 4, and 9 respectively
		const protein = parseInt(data.protein_grams);
		const carbs = parseInt(data.carbs_grams);
		const fat = parseInt(data.fat_grams);
		const kcals = (protein * 4) + (carbs * 4) + (fat * 9);
		console.log("protein " + protein + " fat " + fat + " carbs " + carbs + "Kcals: " + kcals)
		data.kkcals = kcals;
		row.setDataValue('kkcals', data.kkcals);

		const jsonData = JSON.stringify(data);
		const res = await fetch('/reference/updaterecord', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: jsonData
		});
		if (!res.ok) {
			throw Error(json.message);
		}
	}

	onMount(() => {
        grid = new Grid(domNode, options);
		isLoading = false;
    });

    onDestroy(() => {
        if (grid) {
            grid.destroy();
        }
    });

	const submitFood = (e) => {
		if (e.key == 'Enter') {
			isLoading = true;
		}
	}

	function showCreateProgram() {
    	showModal = true;
  	}
  
	function createTrainingProgram(event) {
    	alert(event.detail);
    	showModal = false;
  	}
  
  	function cancelModal() {
    	showModal = false;
  	}
</script>

{#if isLoading}
<!-- align in the middle of the screen and on top-->
<div style="display: flex; justify-content: center; padding: 10px;">
	<Chasing size="60" color="#FF3E00" unit="px" duration="1s" />
</div>
{/if}

<div class="newProgram">
	<button on:click={showCreateProgram}>
		create new training program
	</button>
</div>

<!-- tabs for the training program days-->
<div class="trainingdaytabs">

	<!-- loop through all days in data.trainingProgramDays -->
	{#each data.trainingProgamDays.training_days as day}
		<!-- make a pretty button for each tab -->
		<button class="trainingdaytab" on:click={openTrainingDay(day.day_name)}>{day.day_description}</button>
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

{#if showModal}
  <Modal on:save={createTrainingProgram} on:cancel={cancelModal} />
{/if}

<style>

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
		background: #FF3E00;
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

</style>