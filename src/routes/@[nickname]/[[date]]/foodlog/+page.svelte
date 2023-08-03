<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<script>
    export let data;
	import { connected, selectedAccount, chainId } from 'svelte-web3'
	import { isAuthenticated, user } from "$lib/stores/stores";	
	import { onDestroy, onMount } from 'svelte';
	import { Grid } from 'ag-grid-community';

	import 'ag-grid-community/styles//ag-grid.css';
	import 'ag-grid-community/styles//ag-theme-alpine.css';
	import { Chasing } from 'svelte-loading-spinners';
	import ta_logo from '$lib/images/ta-logo.png';

	var domNode;
    var grid;
	var domNodeTotals;
    var gridTotals;

	const today = data.today;
	const todayString = new Date(today).toISOString().split('T')[0];;

	// get tomorrow from today + 1 day without time zone

	// tomorrow is today + 1 day
	var tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	const tomorrowString = tomorrow.toISOString().split('T')[0];

	// yesterday is today - 1 day
	var yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	const yesterdayString = yesterday.toISOString().split('T')[0];

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
		
		{
			headerName: "Fat, g", 
			field: "fat_grams", 
			editable: false,
			colId: 'Fat', 
			minWidth: 70,
		},
		
		{
			headerName: "Carbs, g", 
			field: "carbs_grams",
			editable: false,
			colId: 'Carbs', 
			minWidth: 70
		},		
		
		{
			headerName: "Protein, g", 
			field: "protein_grams",
			editable: false,
			colId: 'Protein', 
			minWidth: 70
		},
		
		{	headerName: "Kcals", 
			field: "kcals", 
			editable: false, 
			colId: 'Kcals', 
			minWidth: 120
		}
	];

	function isCellEditable(params) {
		return false;
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

	// let the grid know which columns and what data to use
	let options = {
		columnDefs: columnDefs,
		rowData: data.rowData,
		rowSelection: 'single',
		onGridSizeChanged: onGridSizeChanged
	};

	// let the Totals grid know which columns and what data to use
	let totalsOptions = {
		columnDefs: totalsColumnDefs,
		rowData: totalsData,
		onGridSizeChanged: onTotalsGridSizeChanged
	};

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

<div class="container">
	<h3><a data-sveltekit-reload href="/@{data.nickname}/">@{data.nickname} Food Porn</a> 
		| <a data-sveltekit-reload href="/@{data.nickname}/traininglog">Training</a> 
		| <a data-sveltekit-reload href="/@{data.nickname}/foodlog">Food Log</a>
	</h3>
</div>

<!-- center align text with image in div below -->
<!-- div style that is centered on the screen and takes about 60% on desktop but full screen on mobile-->
<div style="text-align:center; margin:25px auto; width:85%; max-width:1200px;">
	
	<!-- svg icon of rectangle pointing to the left -->
	<div class="container">
		<div class="left-image">
			<a data-sveltekit-reload href="/@{data.nickname}/{yesterdayString}/foodlog/"><i class="fa fa-arrow-circle-left" style="font-size:36px; color:blue; padding:10px"></i></a>
		</div>
		<div class="foodheader">
			{data.nickname} Food Log for {todayString}
		</div>
		<div class="right-image">
			<a data-sveltekit-reload href="/@{data.nickname}/{tomorrowString}/foodlog/"><i class="fa fa-arrow-circle-right" style="font-size:36px; color:blue; padding:10px"></i></a>
		</div>
	</div>

	<div class="grid" id="foodLog">

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

<style>
	h3 {
		color:#d95753;
	}
</style>