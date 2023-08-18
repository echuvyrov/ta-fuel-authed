import { c as create_ssr_component, e as escape, d as each, b as add_attribute } from "../../../../chunks/index3.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "input.svelte-13ewkjp{height:220px;width:100%;display:flex;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;text-transform:lowercase;border:none;font-size:calc(0.08 * var(--width));border-radius:2px;background:white;margin:0;color:rgba(0, 0, 0, 0.7)}button.svelte-13ewkjp{width:266px;height:266px;padding:5px;background:#d95753;border:0}.grid.svelte-13ewkjp{display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));grid-gap:0.8rem}@media screen and (max-width: 768px){button.svelte-13ewkjp{width:160px;height:160px;padding:5px;background:#d95753;border:0}.food_image.svelte-13ewkjp{width:150px;height:150px}.grid.svelte-13ewkjp{display:grid;grid-template-columns:repeat(auto-fit, minmax(170px, .1fr));grid-gap:0.4rem}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const today = data.today;
  const todayString = new Date(today).toISOString().split("T")[0];
  var tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split("T")[0];
  var yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split("T")[0];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<link rel="${"stylesheet"}" href="${"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}">



<div class="${"container"}"><div class="${"left-image"}"><a data-sveltekit-reload href="${"/experience/" + escape(yesterdayString, true)}"><i class="${"fa fa-arrow-circle-left"}" style="${"font-size:36px; color:blue; padding:10px"}"></i></a></div>
	<div class="${"foodheader"}">What you ate on ${escape(todayString)}</div>
	<div class="${"right-image"}"><a data-sveltekit-reload href="${"/experience/" + escape(tomorrowString, true)}"><i class="${"fa fa-arrow-circle-right"}" style="${"font-size:36px; color:blue; padding:10px"}"></i></a></div></div>



<div class="${"grid svelte-13ewkjp"}">
	${each(data.todaysFoods, (todaysFood, i) => {
    return `${todaysFood.foodReference != null ? `<form action="${"?/addfood"}" method="${"POST"}"><div class="${"grid-item"}">
					<input type="${"hidden"}"${add_attribute("value", JSON.stringify((({ imageBase64, ...rest }) => rest)(todaysFood.foodReference)), 0)} name="${"food"}" class="${"svelte-13ewkjp"}">
					
					<button${add_attribute("title", todaysFood.foodReference.food_name, 0)} class="${"svelte-13ewkjp"}"><img src="${"data:image/png;base64, " + escape(todaysFood.foodReference.imageBase64, true)}"${add_attribute("title", todaysFood.foodReference.food_name, 0)} class="${"food_image svelte-13ewkjp"}">
					</button></div>
			</form>` : ``}`;
  })}</div>

<center><div class="${"experienceheader"}">What you eat most frequently (simply click to add to today&#39;s log)</div></center>


<div class="${"grid svelte-13ewkjp"}">
	${each(data.foodReferences, (foodReference, i) => {
    return `${foodReference.foodReference != null ? `<form action="${"?/addfood"}" method="${"POST"}"><div class="${"grid-item"}">
					<input type="${"hidden"}"${add_attribute("value", JSON.stringify((({ imageBase64, ...rest }) => rest)(foodReference.foodReference)), 0)} name="${"food"}" class="${"svelte-13ewkjp"}">
					
					<button title="${escape(foodReference.foodReference.food_name, true) + " (used " + escape(foodReference.count, true) + " times)"}" class="${"svelte-13ewkjp"}"><img src="${"data:image/png;base64, " + escape(foodReference.foodReference.imageBase64, true)}" alt="${escape(foodReference.foodReference.food_name, true) + " (used " + escape(foodReference.count, true) + " times)"}" class="${"food_image svelte-13ewkjp"}">
					</button></div>
			</form>` : ``}`;
  })}</div>

`;
});
export {
  Page as default
};
