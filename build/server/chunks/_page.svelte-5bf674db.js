import { c as create_ssr_component, o as onDestroy, v as validate_component, d as add_attribute } from './index3-d06080d5.js';
import 'ag-grid-community';
import { C as Chasing } from './ArrowUp.svelte_svelte_type_style_lang-00b9392b.js';

const css = {
  code: "input.svelte-brt59l{height:50px;width:100%;display:flex;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;border:none;font-size:calc(0.08 * var(--width));border-radius:2px;background:white;margin:0;color:rgba(0, 0, 0, 0.7)}",
  map: null
};
async function updateRecord(row, data) {
  const protein = parseInt(data.protein_grams);
  const carbs = parseInt(data.carbs_grams);
  const fat = parseInt(data.fat_grams);
  const kcals = protein * 4 + carbs * 4 + fat * 9;
  console.log("protein " + protein + " fat " + fat + " carbs " + carbs + "Kcals: " + kcals);
  data.kkcals = kcals;
  row.setDataValue("kkcals", data.kkcals);
  const jsonData = JSON.stringify(data);
  const res = await fetch("/reference/updaterecord", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonData
  });
  if (!res.ok) {
    throw Error(json.message);
  }
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  var domNode;
  let columnDefs = [
    {
      headerName: "Food",
      field: "food_name",
      editable: true,
      minWidth: 100
    },
    {
      headerName: "Qty",
      field: "food_qty",
      editable: true,
      minWidth: 70
    },
    {
      headerName: "Fat, g",
      field: "fat_grams",
      editable: true,
      minWidth: 70
    },
    {
      headerName: "Carbs, g",
      field: "carbs_grams",
      editable: true,
      minWidth: 70
    },
    {
      headerName: "Protein, g",
      field: "protein_grams",
      editable: true,
      minWidth: 70
    },
    {
      headerName: "Kcals",
      field: "kkcals",
      editable: true,
      minWidth: 120
    }
  ];
  ({
    columnDefs,
    rowData: data.rowData,
    onCellValueChanged(params) {
      updateRecord(params.node, params.data);
    }
  });
  onDestroy(() => {
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<form action="${"?/addfood"}" method="${"POST"}"><input name="${"food"}" value="${"Add food to the reference list"}" class="${"svelte-brt59l"}"></form>

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

<center><h3>Food Reference List</h3></center>


<div style="${"display: flex; justify-content: center; align-items: center;"}"><div id="${"datagrid"}" class="${"ag-theme-alpine"}" style="${"height: 70vh; width: 100%;"}"${add_attribute("this", domNode, 0)}></div>
</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-5bf674db.js.map
