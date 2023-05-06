<script>
    export let data;	
	import { onDestroy, onMount } from 'svelte';
	import { Grid } from 'ag-grid-community';
	import { Chasing } from 'svelte-loading-spinners';

	import 'ag-grid-community/styles//ag-grid.css';
	import 'ag-grid-community/styles//ag-theme-alpine.css';

	var domNode;
    var grid;
	var isLoading = true;

	const today = new Date();

	let columnDefs = [
		{headerName: "Food", field: "food_name", editable: true, minWidth: 100},
		{headerName: "Qty", field: "food_qty", editable: true, minWidth: 70},
		{headerName: "Fat, g", field: "fat_grams", editable: true, minWidth: 70},
		{headerName: "Carbs, g", field: "carbs_grams", editable: true, minWidth: 70},
		{headerName: "Protein, g", field: "protein_grams", editable: true, minWidth: 70},
		{headerName: "Kcals", field: "kkcals", editable: true, minWidth: 120}
	];
    
	// let the grid know which columns and what data to use
	let options = {
		columnDefs: columnDefs,
		rowData: data.rowData,
		onCellValueChanged: function(params)  {
			updateRecord(params.node, params.data);
  		},
	};

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

</script>

<form action="?/addfood" method = "POST">
<input
name="food"
value='Add food to the reference list'
on:focus={(evt) => evt.target.select()}
on:keydown={submitFood}
/>
</form>

{#if isLoading}
<!-- align in the middle of the screen and on top-->
<div style="display: flex; justify-content: center; padding: 10px;">
	<Chasing size="60" color="#FF3E00" unit="px" duration="1s" />
</div>
{/if}

<center><h3>Food Reference List</h3></center>

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

input {
        height: 50px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		box-sizing: border-box;
		border: none;
		font-size: calc(0.08 * var(--width));
		border-radius: 2px;
		background: white;
		margin: 0;
		color: rgba(0, 0, 0, 0.7);
	}

button  {
	width: 75px;
    height: 75px;
    padding: 5px;
    background: #d95753;
    border: 0;
}

.btn-size {
    width: 30px;
    height: 30px;
}

.img-size img {
    width: 75px;
    height: 75px;
}
</style>