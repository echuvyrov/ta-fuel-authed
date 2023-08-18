import { c as create_ssr_component, o as onDestroy, v as validate_component, b as add_attribute } from "../../../chunks/index3.js";
import "ag-grid-community";
/* empty css                                                     */import { C as Chasing } from "../../../chunks/Chasing.js";
/* empty css                               */const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "input.svelte-brt59l{height:50px;width:100%;display:flex;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;border:none;font-size:calc(0.08 * var(--width));border-radius:2px;background:white;margin:0;color:rgba(0, 0, 0, 0.7)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  var domNode;
  data.rowData;
  onDestroy(() => {
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<form action="${"?/addfood"}" method="${"POST"}"><input name="${"food"}" value="${"Search for or add food to the reference list"}" class="${"svelte-brt59l"}"></form>

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
export {
  Page as default
};
