<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<script>
    export let data;
	import { connected, selectedAccount, chainId } from 'svelte-web3'
	import { isAuthenticated, user } from "$lib/stores/stores";	
	import { onDestroy, onMount } from 'svelte';
	import { Grid } from 'ag-grid-community';
	import Typeahead from "svelte-typeahead";

	import 'ag-grid-community/styles//ag-grid.css';
	import 'ag-grid-community/styles//ag-theme-alpine.css';
	import { Chasing } from 'svelte-loading-spinners';
	import ta_logo from '$lib/images/ta-logo.png';

	var domNode;
    var grid;
	var isLoading = true;

	var domNodeTotals;
    var gridTotals;

	const today = data.today;
	// get tomorrow from today + 1 day without time zone

	// tomorrow is today + 1 day
	var tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	const tomorrowString = tomorrow.toISOString().split('T')[0];

	// yesterday is today - 1 day
	var yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	const yesterdayString = yesterday.toISOString().split('T')[0];

	const typeaheadData = data.foodReferences;
	const typeaheadExtract = (item) => item.food_name;

	const submitFood = (e) => {
		if (e.key == 'Enter') {
			/* populate hidden form value and submit form programmatically */
			const foodEntered = document.getElementById('foodautocomplete').value;
			document.forms["foodForm"].elements["food"].value = foodEntered;
			document.forms["foodForm"].submit();
			isLoading = true;
		}	
	}

	let columnDefs = [
		{headerName: "Food", field: "food_name", editable: true, colId: 'Food', minWidth: 250},
		{headerName: "Qty", field: "food_qty", editable: true, colId: 'Qty', minWidth: 100},
		{headerName: "Fat, g", field: "fat_grams", editable: true, colId: 'Fat', minWidth: 100},
		{headerName: "Carbs, g", field: "carbs_grams", editable: true, colId: 'Carbs', minWidth: 100},
		{headerName: "Protein, g", field: "protein_grams", editable: true, colId: 'Protein', minWidth: 100},
		{headerName: "Kcals", field: "kkcals", colId: 'Kcals', minWidth: 120},
	];

	let totalsColumnDefs = [
		{headerName: "Totals", field: "label", editable: false, colId: 'Totals',
			cellStyle: params => {
					if (params.value === 'Target Totals') {
						//mark police cells as red
						return {color: 'white', backgroundColor: 'lightblue'};
					} else if (params.value === 'Difference') {
						//mark police cells as red
						return {color: 'white', backgroundColor: 'red'};
					} else {
						return {color: 'white', backgroundColor: 'grey'};
					}
					return null;
				},
		}, 
		{headerName: "", field: "", editable: false, colId: 'Empty'},
		{headerName: "Fat, g", field: "fat_grams", editable: false, colId: 'Fat'},
		{headerName: "Carbs, g", field: "carbs_grams", editable: false, colId: 'Carbs'},
		{headerName: "Protein, g", field: "protein_grams", editable: false, colId: 'Protein'},
		{headerName: "Kcals", field: "kkcals", editable: false, colId: 'Kcals'}
	];

	// create data for AgGrid totalsColumnDefs
	let totalsData = [
		data.targetTotals,
		data.calculatedTotals,
		data.differenceTotals
	];

	// resize/hide columns based on grid width
	function onGridSizeChanged(params) {
        // get the current grids width
        var gridWidth = document.getElementById('foodLog').offsetWidth;
		console.log('gridWidth: ' + gridWidth);

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
			console.log('totalColsWidth: ' + totalColsWidth);

			if (totalColsWidth > gridWidth) {
				console.log('totalColsWidth: ' + totalColsWidth);
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

	// let the grid know which columns and what data to use
	let options = {
		columnDefs: columnDefs,
		rowData: data.rowData,
		rowSelection: 'single',
		onCellValueChanged: function(params)  {
			updateRecord(params.data);
  		},
		onGridSizeChanged: onGridSizeChanged
	};

	// let the Totals grid know which columns and what data to use
	let totalsOptions = {
		columnDefs: totalsColumnDefs,
		rowData: totalsData
	};

	/* sveltekit fetch method to update the record */
	async function updateRecord(data) {
		const jsonData = JSON.stringify(data);
		const res = await fetch('/foodlog/updaterecord', {
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
        gridTotals = new Grid(domNodeTotals, totalsOptions);
		isLoading = false;
    });

    onDestroy(() => {
        if (grid) {
            grid.destroy();
        }
        if (gridTotals) {
            gridTotals.destroy();
        }
	});

</script>

<!-- center align text with image in div below -->
<!-- div style that is centered on the screen and takes about 60% on desktop but full screen on mobile-->
<div style="text-align:center; margin:25px auto; width:85%; max-width:1200px;">

	<form action="?/addfood" method = "POST">
		<Typeahead 
			id = "foodautocomplete"
			name="foodautocomplete"
			autofocus
			hideLabel
			focusAfterSelect
			placeholder="Whatcha eatin'?"
			data={typeaheadData} 
			extract={typeaheadExtract}
			on:keydown={submitFood}
		/>	
		</form>

	<form id="foodForm" action="?/addfood" method = "POST">
	<input
	type="hidden"
	name="food"
	/>
	</form>
	
	<!-- svg icon of rectangle pointing to the left -->
	<center>
		<a data-sveltekit-reload href="/foodlog/{yesterdayString}"><i class="fa fa-arrow-circle-left" style="font-size:36px; color:blue; padding:10px"></i></a>

		<div class="foodheader">Food Log for {today}
		</div>
		
		<a data-sveltekit-reload href="/foodlog/{tomorrowString}"><i class="fa fa-arrow-circle-right" style="font-size:36px; color:blue; padding:10px"></i></a>
	</center>
	{#if isLoading}
		<!-- align in the middle of the screen and on top-->
		<div style="display: flex; justify-content: center; padding: 10px;">
			<Chasing size="60" color="#FF3E00" unit="px" duration="1s" />
		</div>
	{/if}

	<div class="grid" id="foodLog">
		<!-- iterate over all items in data.foodReferences -->
		{#each data.foodReferences as foodReference}
			<form action="?/addfood" method = "POST">

				<input type="hidden" value={foodReference.food_name} name="food">
				<!-- image from base64 string -->
				<button>
					<img src="data:image/png;base64, {foodReference.imageBase64}" style="max-height: 62px; max-width: 62px;" />
				</button>
				</form>
		{/each}
	</div>

	<!-- add AgGrid component with grid options -->
	<div style="display: flex; justify-content: center; align-items: center;">
	<div
		id="datagrid"
		bind:this={domNode}
		class="ag-theme-alpine"
		style="height: 170vh; width: 100%;"
	/>
	</div>

	<h3>Totals:</h3>
	<!-- add Totals AgGrid component with grid options -->
	<div style="display: flex; justify-content: center; align-items: center;">
		<div
			id="totals"
			bind:this={domNodeTotals}
			class="ag-theme-alpine"
			style="height: 22vh; width: 100%;"
		/>
	</div>
</div>	

