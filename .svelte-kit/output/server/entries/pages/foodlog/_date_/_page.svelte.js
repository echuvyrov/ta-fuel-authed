import { c as create_ssr_component, o as onDestroy, v as validate_component, e as escape, b as add_attribute } from "../../../../chunks/index3.js";
import "../../../../chunks/index4.js";
import "../../../../chunks/stores.js";
import "ag-grid-community";
import { T as Typeahead } from "../../../../chunks/Typeahead.js";
/* empty css                                                        */import { C as Chasing } from "../../../../chunks/Chasing.js";
/* empty css                                  */const SuggestRecipesForMacros_svelte_svelte_type_style_lang = "";
const VeganizeThis_svelte_svelte_type_style_lang = "";
function onGridSizeChanged(params) {
  var gridWidth = document.getElementById("foodLog").offsetWidth;
  var columnsToShow = [];
  var columnsToHide = [];
  var totalColsWidth = 0;
  var allColumns = params.columnApi.getColumns();
  for (var i = 0; i < allColumns.length; i++) {
    let column = allColumns[i];
    totalColsWidth += column.getMinWidth();
    if (totalColsWidth > gridWidth) {
      columnsToShow.push("Food");
      columnsToShow.push("Fat");
      columnsToShow.push("Carbs");
      columnsToShow.push("Protein");
      columnsToHide.push("Qty");
      columnsToHide.push("Kcals");
      params.columnApi.setColumnsVisible(columnsToShow, true);
      params.columnApi.setColumnsVisible(columnsToHide, false);
      params.api.sizeColumnsToFit();
      break;
    }
  }
  params.api.sizeColumnsToFit();
}
async function updateRecord(row, data) {
  const protein = parseInt(data.protein_grams);
  const carbs = parseInt(data.carbs_grams);
  const fat = parseInt(data.fat_grams);
  const kcals = protein * 4 + carbs * 4 + fat * 9;
  data.Kcals = kcals;
  row.setDataValue("Kcals", data.Kcals);
  const jsonData = JSON.stringify(data);
  const res = await fetch("/foodlog/[date]/updaterecord", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonData
  });
  const json = await res.json();
  if (!res.ok) {
    console.log(json);
  }
  return json;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  var domNode;
  var domNodeTotals;
  data.rowData;
  const today = data.today;
  const todayString = new Date(today).toISOString().split("T")[0];
  var tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split("T")[0];
  var yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split("T")[0];
  let typeaheadData = data.foodReferences;
  if (!typeaheadData.some((item) => item.food_name.indexOf("cmd") > 0)) {
    typeaheadData.push(
      {
        user_id: 0,
        food_name: "💪 /cmd Suggest some food to fit my macros",
        food_id: 0
      },
      {
        user_id: 0,
        food_name: "💪 /cmd Veganize this: suggest how to convert non-vegan foods for the day to vegan (and log them)",
        food_id: 0
      }
    );
  }
  const typeaheadExtract = (item) => item.food_name;
  [data.targetTotals, data.calculatedTotals, data.differenceTotals];
  let columnDefs = [
    {
      headerName: "Food",
      field: "food_name",
      editable: true,
      colId: "Food",
      minWidth: 100,
      align: "left"
    },
    {
      headerName: "Qty",
      field: "food_qty",
      editable: true,
      colId: "Qty",
      minWidth: 100
    },
    {
      headerName: "Fat, g",
      field: "fat_grams",
      editable: true,
      colId: "Fat",
      minWidth: 70
    },
    {
      headerName: "Carbs, g",
      field: "carbs_grams",
      editable: true,
      colId: "Carbs",
      minWidth: 70
    },
    {
      headerName: "Protein, g",
      field: "protein_grams",
      editable: true,
      colId: "Protein",
      minWidth: 70
    },
    {
      headerName: "Kcals",
      field: "kkcals",
      colId: "Kcals",
      minWidth: 120
    }
  ];
  [data.targetTotals, data.calculatedTotals, data.differenceTotals];
  function deleteKeyListener(e) {
    if (e.keyCode === 46) {
      const sel = options.api.getSelectedRows();
      options.api.applyTransaction({ remove: sel });
    }
  }
  let options = {
    columnDefs,
    rowData: data.rowData,
    rowSelection: "single",
    onGridReady: (params) => {
      document.addEventListener("keydown", deleteKeyListener);
    },
    onCellValueChanged(params) {
      if (params.colDef.colId === "Kcals") {
        return;
      } else {
        updateRecord(params.node, params.data);
      }
    },
    onGridSizeChanged
  };
  onDestroy(() => {
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<link rel="${"stylesheet"}" href="${"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}">





<div style="${"text-align:center; margin:25px auto; width:85%; max-width:1200px;"}"><form action="${"?/addfood"}" method="${"POST"}">${validate_component(Typeahead, "Typeahead").$$render(
    $$result,
    {
      id: "foodautocomplete",
      name: "foodautocomplete",
      autofocus: true,
      hideLabel: true,
      focusAfterSelect: true,
      placeholder: "Whatcha eatin'?",
      data: typeaheadData,
      extract: typeaheadExtract
    },
    {},
    {}
  )}</form>

	<form id="${"foodForm"}" action="${"?/addfood"}" method="${"POST"}"><input type="${"hidden"}" name="${"food"}"></form>
	
	
	<div class="${"container"}"><div class="${"left-image"}"><a data-sveltekit-reload href="${"/foodlog/" + escape(yesterdayString, true)}"><i class="${"fa fa-arrow-circle-left"}" style="${"font-size:36px; color:blue; padding:10px"}"></i></a></div>
		<div class="${"foodheader"}">Food Log for ${escape(todayString)}</div>
		<div class="${"right-image"}"><a data-sveltekit-reload href="${"/foodlog/" + escape(tomorrowString, true)}"><i class="${"fa fa-arrow-circle-right"}" style="${"font-size:36px; color:blue; padding:10px"}"></i></a></div></div>		
	${`
		<div style="${"display: flex; justify-content: center; padding: 10px;"}">${validate_component(Chasing, "Chasing").$$render(
    $$result,
    {
      size: "60",
      color: "#FF3E00",
      unit: "px",
      duration: "1s"
    },
    {},
    {}
  )}</div>`}

	<div class="${"grid"}" id="${"foodLog"}">

</div>

	
	<div style="${"display: flex; justify-content: center; align-items: center;"}"><div id="${"totals"}" class="${"ag-theme-alpine"}" style="${"height: 22vh; width: 100%;"}"${add_attribute("this", domNodeTotals, 0)}></div></div>

	
	<div style="${"display: flex; justify-content: center; align-items: center;"}"><div id="${"datagrid"}" class="${"ag-theme-alpine"}" style="${"height: 170vh; width: 100%;"}"${add_attribute("this", domNode, 0)}></div></div></div>	

${``}

${``}`;
});
export {
  Page as default
};
