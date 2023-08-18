import { c as create_ssr_component, o as onDestroy, e as escape, d as each, b as add_attribute } from "../../../../../chunks/index3.js";
import "ag-grid-community";
/* empty css                                     */const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "button.svelte-hl29oo{height:50px;display:flex;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;border:none;font-size:calc(0.08 * var(--width));border-radius:2px;background:#007aff;margin:0;color:white;padding:5px 5px 5px 5px;border-radius:5px}button.svelte-hl29oo:hover{text-decoration:underline;cursor:pointer}.trainingdaytab.svelte-hl29oo{height:50px;width:120px;display:flex;float:left;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;border:none;font-size:calc(0.08 * var(--width));border-radius:2px;background:#ff3e00;margin:0px 3px 2px 0px;color:white;padding:5px 5px 5px 5px;border-radius:5px}.trainingdaytab.svelte-hl29oo:hover{text-decoration:underline;cursor:pointer}@media screen and (max-width: 768px){.trainingdaytab.svelte-hl29oo{width:110px}}h3.svelte-hl29oo{color:#d95753}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  var domNode;
  const today = data.today;
  new Date(today).toISOString().split("T")[0];
  onDestroy(() => {
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="${"container"}"><h3 class="${"svelte-hl29oo"}"><a data-sveltekit-reload href="${"/@" + escape(data.nickname, true) + "/"}">@${escape(data.nickname)} Food Porn</a> 
		| <a data-sveltekit-reload href="${"/@" + escape(data.nickname, true) + "/traininglog"}">Training</a> 
		| <a data-sveltekit-reload href="${"/@" + escape(data.nickname, true) + "/foodlog"}">Food Log</a></h3></div>


<div class="${"trainingdaytabs"}">
  ${each(data.trainingProgamDays.training_days, (day) => {
    return `
    <button class="${"trainingdaytab svelte-hl29oo"}">${escape(day.day_description)}</button>`;
  })}</div>


<div style="${"display: flex; justify-content: center; align-items: center;"}"><div id="${"datagrid"}" class="${"ag-theme-alpine"}" style="${"height: 70vh; width: 100%;"}"${add_attribute("this", domNode, 0)}></div>
</div>`;
});
export {
  Page as default
};
