<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<script>
    export let data;
	import { connected, selectedAccount, chainId } from 'svelte-web3'
	import { isAuthenticated, user } from "$lib/stores/stores";	
	import { onDestroy, onMount } from 'svelte';
	import { Grid } from 'ag-grid-community';
	import Typeahead from "svelte-typeahead";
	import Modal from "./SuggestRecipesForMacros.svelte";
	import VeganizeThis from "./VeganizeThis.svelte";

	import 'ag-grid-community/styles//ag-grid.css';
	import 'ag-grid-community/styles//ag-theme-alpine.css';
	import { Chasing } from 'svelte-loading-spinners';
	import ta_logo from '$lib/images/ta-logo.png';

	var domNode;
    var grid;
	var isLoading = true;
	var domNodeTotals;
    var gridTotals;
	let showModal = false;
	let showVeganizeThisModal = false;

	const foodLog = data.rowData;
	const today = data.today;
	const todayString = new Date(today).toISOString().split('T')[0];

	// get tomorrow from today + 1 day without time zone

	// tomorrow is today + 1 day
	var tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	const tomorrowString = tomorrow.toISOString().split('T')[0];

	// yesterday is today - 1 day
	var yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	const yesterdayString = yesterday.toISOString().split('T')[0];

	let typeaheadData = data.foodReferences;
  	// if typeaheadData does not contain items with "/cmd" options, add them
  	if (!typeaheadData.some((item) => item.food_name.indexOf("cmd") > 0)) 
  	{
    	typeaheadData.push({
      		user_id: 0,
      		food_name: "💪 /cmd Suggest some food to fit my macros",
      		food_id: 0,
    	},
		{
      		user_id: 0,
      		food_name: "💪 /cmd Veganize this: suggest how to convert non-vegan foods for the day to vegan (and log them)",
      		food_id: 0,
    	});
  	}

	const typeaheadExtract = (item) => item.food_name;

	function showCreativeMacros() {
    	showModal = true;
  	}

  	function getCreativeWithMacros() {
    	showModal = false;
		isLoading = true;
  	}

  	function cancelModal() {
    	showModal = false;
  	}

	function showVeganizeThis() {
		console.log("showVeganizeThis");
    	showVeganizeThisModal = true;
  	}

	function getVeganized() {
    	showVeganizeThisModal = false;
		isLoading = true;
  	}

  	function cancelVeganizeThisModal() {
    	showVeganizeThisModal = false;
  	}

	let foodData = [
		data.targetTotals,
		data.calculatedTotals,
		data.differenceTotals
	];

	const submitFood = (e) => {
		if (e.key == 'Enter') {
			/* populate hidden form value and submit form programmatically */
			const foodEntered = document.getElementById('foodautocomplete').value;
			/* if foodEntered contains cmd, then show modal */
			if (foodEntered.includes("/cmd Suggest some food to fit my macros")) {
				console.log("suggest stuff");
				showCreativeMacros();
			} else if (foodEntered.includes("/cmd Veganize this")) {
				console.log("veganize this");
				showVeganizeThis();
			} else {
				document.forms["foodForm"].elements["food"].value = foodEntered;
				document.forms["foodForm"].submit();
				isLoading = true;
			}
		}
	}

	let columnDefs = [
		{headerName: "Food", field: "food_name", editable: true, colId: 'Food', minWidth: 100, align: 'left'},
		{headerName: "Qty", field: "food_qty", editable: true, colId: 'Qty', minWidth: 100},
		{headerName: "Fat, g", field: "fat_grams", editable: true, colId: 'Fat', minWidth: 70},
		{headerName: "Carbs, g", field: "carbs_grams", editable: true, colId: 'Carbs', minWidth: 70},
		{headerName: "Protein, g", field: "protein_grams", editable: true, colId: 'Protein', minWidth: 70},
		{headerName: "Kcals", field: "kkcals", colId: 'Kcals', minWidth: 120},
	];

	let totalsColumnDefs = [
		{headerName: "Totals", field: "label", editable: false, colId: 'Totals', minWidth: 100, 
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
		{headerName: "", field: "", editable: false, colId: 'Empty', minWidth: 100},
		
		{headerName: "Fat, g", field: "fat_grams", 
			editable: (params) => {
        		return isCellEditable(params);
      		}, 
		colId: 'Fat', minWidth: 70},
		
		{headerName: "Carbs, g", 
		field: "carbs_grams",
		editable: (params) => {
        		return isCellEditable(params);
      		}, 
		colId: 'Carbs', 
		minWidth: 70},
		
		{headerName: "Protein, g", 
		field: "protein_grams",
		editable: (params) => {
        		return isCellEditable(params);
      		}, 
		colId: 'Protein', 
		minWidth: 70},
		
		{headerName: "Kcals", field: "kcals", editable: false, colId: 'Kcals', minWidth: 120}
	];

	function isCellEditable(params) {
		return params.data.label === "Target Totals";
	}

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

	// resize/hide columns based on grid width
	function onTotalsGridSizeChanged(params) {
        // get the current grids width
        var gridWidth = document.getElementById('totals').offsetWidth;

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
				columnsToShow.push('Totals');
				columnsToShow.push('Fat');
				columnsToShow.push('Carbs');
				columnsToShow.push('Protein');

				columnsToHide.push('Empty');
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

	function deleteKeyListener(e) {
	// delete the rows 
	// keyCode 46 is Delete
		if(e.keyCode === 46) {
			const sel = options.api.getSelectedRows();
			options.api.applyTransaction({remove: sel});
		}
	}

	// let the grid know which columns and what data to use
	let options = {
		columnDefs: columnDefs,
		rowData: data.rowData,
		rowSelection: 'single',
		onGridReady: (params) => {
    		document.addEventListener('keydown', deleteKeyListener);
	    },
		onCellValueChanged: function(params)  {
			if(params.colDef.colId === 'Kcals') {
				return;
			} else {
				updateRecord(params.node, params.data);
			}
  		},
		onGridSizeChanged: onGridSizeChanged
	};

	// let the Totals grid know which columns and what data to use
	let totalsOptions = {
		columnDefs: totalsColumnDefs,
		rowData: totalsData,
		onCellValueChanged: function(params)  {
			updateTargetTotalsRecord(params.node, params.data, params.column.colId);
  		},
		onGridSizeChanged: onTotalsGridSizeChanged
	};

	/* fetch method to update the record */
	async function updateRecord(row, data) {
		// recalc Kcals first by taking integer values of Protein, Carbs, and Fat
		//  and multiplying by 4, 4, and 9 respectively
		const protein = parseInt(data.protein_grams);
		const carbs = parseInt(data.carbs_grams);
		const fat = parseInt(data.fat_grams);
		const kcals = (protein * 4) + (carbs * 4) + (fat * 9);
		data.Kcals = kcals;
		row.setDataValue('Kcals', data.Kcals);

		const jsonData = JSON.stringify(data);
		const res = await fetch('/foodlog/[date]/updaterecord', {
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
	}

	/* sveltekit fetch method to update the record */
	async function updateTargetTotalsRecord(row, data, colId) {
		// if it's Kcals col that triggered this, ignore it (avoid the infinite loop)
		if(colId === 'Kcals') {
			return;
		}
		// recalc Kcals first by taking integer values of Protein, Carbs, and Fat
		//  and multiplying by 4, 4, and 9 respectively
		const protein = parseInt(data.protein_grams);
		const carbs = parseInt(data.carbs_grams);
		const fat = parseInt(data.fat_grams);
		const kcals = (protein * 4) + (carbs * 4) + (fat * 9);
		data.Kcals = kcals;
		data.feeding_date = today;
		row.setDataValue('Kcals', data.Kcals, { suppressCellChangedEvent: true });

		const jsonData = JSON.stringify(data);
		const res = await fetch('/foodlog/[date]/updatetargettotals', {
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
	<div class="container">
		<div class="left-image">
			<a data-sveltekit-reload href="/foodlog/{yesterdayString}"><i class="fa fa-arrow-circle-left" style="font-size:36px; color:blue; padding:10px"></i></a>
		</div>
		<div class="foodheader">
			Food Log for {todayString}
		</div>
		<div class="right-image">
			<a data-sveltekit-reload href="/foodlog/{tomorrowString}"><i class="fa fa-arrow-circle-right" style="font-size:36px; color:blue; padding:10px"></i></a>
		</div>
	</div>		
	{#if isLoading}
		<!-- align in the middle of the screen and on top-->
		<div style="display: flex; justify-content: center; padding: 10px;">
			<Chasing size="60" color="#FF3E00" unit="px" duration="1s" />
		</div>
	{/if}

	<div class="grid" id="foodLog">

<!-- hitting serverless functions limits of 4.5 mb per payload on vercel, commenting out this coolest part of the app -->
<!-- due to that limiation -->
<!-- eventually, I will move this to cloudify instead of using the database to store the images

		{#each data.foodReferences as foodReference}
			<form action="?/addfood" method = "POST">

				<input type="hidden" value={foodReference.food_name} name="food">
				<button title = "{foodReference.food_name}">
					<img src="data:image/png;base64, {foodReference.imageBase64}" style="max-height: 62px; max-width: 62px;" alt="{foodReference.food_name}" />
				</button>
				</form>
		{/each}
-->

	</div>

	<!-- add Totals AgGrid component with grid options -->
	<div style="display: flex; justify-content: center; align-items: center;">
		<div
			id="totals"
			bind:this={domNodeTotals}
			class="ag-theme-alpine"
			style="height: 22vh; width: 100%;"
		/>
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
</div>	

{#if showModal}
  <Modal {totalsData} on:save={getCreativeWithMacros} on:cancel={cancelModal} />
{/if}

{#if showVeganizeThisModal}
  <VeganizeThis {foodLog} on:save={getVeganized} on:cancel={cancelVeganizeThisModal} />
{/if}
