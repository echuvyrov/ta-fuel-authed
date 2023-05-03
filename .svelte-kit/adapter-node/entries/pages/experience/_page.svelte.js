import { c as create_ssr_component, f as each, d as add_attribute, e as escape } from "../../../chunks/index3.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "input.svelte-1o6g0ld{height:220px;width:100%;display:flex;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;text-transform:lowercase;border:none;font-size:calc(0.08 * var(--width));border-radius:2px;background:white;margin:0;color:rgba(0, 0, 0, 0.7)}button.svelte-1o6g0ld{width:266px;height:266px;padding:5px;background:#d95753;border:0}.grid.svelte-1o6g0ld{display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));grid-gap:0.8rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<center><div class="${"experienceheader"}">Log foods by simply clicking the images custom created for your foods</div></center>



<div class="${"grid svelte-1o6g0ld"}">
	${each(data.foodReferences, (foodReference, i) => {
    return `<form action="${"?/addfood"}" method="${"POST"}"><div class="${"grid-item"}"><input type="${"hidden"}"${add_attribute("value", JSON.stringify(foodReference), 0)} name="${"food"}" class="${"svelte-1o6g0ld"}">
				
				<button${add_attribute("title", foodReference.food_name, 0)} class="${"svelte-1o6g0ld"}"><img src="${"data:image/png;base64, " + escape(foodReference.imageBase64, true)}">
				</button></div>
		</form>`;
  })}</div>

`;
});
export {
  Page as default
};
