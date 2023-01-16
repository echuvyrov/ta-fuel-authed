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
		{headerName: "Food", field: "food_name", editable: true},
		{headerName: "Qty", field: "food_qty", editable: true},
		{headerName: "Fat, g", field: "fat_grams", editable: true},
		{headerName: "Carbs, g", field: "carbs_grams", editable: true},
		{headerName: "Protein, g", field: "protein_grams", editable: true},
		{headerName: "Kcals", field: "kkcals"}
	];
    
	// let the grid know which columns and what data to use
	let options = {
		columnDefs: columnDefs,
		rowData: data.rowData,
		onCellValueChanged: function(params)  {
			// alert('wtf ' + JSON.stringify(params.data));
			updateRecord(params.data);
  		},
	};

	/* sveltekit fetch method to update the record */
	async function updateRecord(data) {
		const jsonData = JSON.stringify(data);
		const res = await fetch('/reference/updaterecord', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: jsonData
		});
		const json = await res.json();
		if (!res.ok) {
			throw Error(json.message);
		}
		return json;
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
		text-transform: lowercase;
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