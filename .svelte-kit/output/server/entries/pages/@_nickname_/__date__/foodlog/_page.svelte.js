import { c as create_ssr_component, o as onDestroy, e as escape, b as add_attribute } from "../../../../../chunks/index2.js";
import "../../../../../chunks/index4.js";
import "../../../../../chunks/stores.js";
import "ag-grid-community";
/* empty css                                     *//* empty css                                                           */const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h3.svelte-1w4daxs{color:#d95753}",
  map: null
};
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
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  var domNode;
  var domNodeTotals;
  const today = data.today;
  const todayString = new Date(today).toISOString().split("T")[0];
  var tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split("T")[0];
  var yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split("T")[0];
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
  ({
    columnDefs,
    rowData: data.rowData,
    rowSelection: "single",
    onGridSizeChanged
  });
  onDestroy(() => {
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">



<div class="container"><h3 class="svelte-1w4daxs"><a data-sveltekit-reload href="${"/@" + escape(data.nickname, true) + "/"}">@${escape(data.nickname)} Food Porn</a> 
		| <a data-sveltekit-reload href="${"/@" + escape(data.nickname, true) + "/traininglog"}">Training</a> 
		| <a data-sveltekit-reload href="${"/@" + escape(data.nickname, true) + "/foodlog"}">Food Log</a></h3></div>



<div style="text-align:center; margin:25px auto; width:85%; max-width:1200px;">
	<div class="container"><div class="left-image"><a data-sveltekit-reload href="${"/@" + escape(data.nickname, true) + "/" + escape(yesterdayString, true) + "/foodlog/"}"><i class="fa fa-arrow-circle-left" style="font-size:36px; color:blue; padding:10px"></i></a></div>
		<div class="foodheader">${escape(data.nickname)} Food Log for ${escape(todayString)}</div>
		<div class="right-image"><a data-sveltekit-reload href="${"/@" + escape(data.nickname, true) + "/" + escape(tomorrowString, true) + "/foodlog/"}"><i class="fa fa-arrow-circle-right" style="font-size:36px; color:blue; padding:10px"></i></a></div></div>

	<div class="grid" id="foodLog"></div>

	
	<div style="display: flex; justify-content: center; align-items: center;"><div id="totals" class="ag-theme-alpine" style="height: 22vh; width: 100%;"${add_attribute("this", domNodeTotals, 0)}></div></div>

	
	<div style="display: flex; justify-content: center; align-items: center;"><div id="datagrid" class="ag-theme-alpine" style="height: 170vh; width: 100%;"${add_attribute("this", domNode, 0)}></div></div>
</div>`;
});
export {
  Page as default
};
