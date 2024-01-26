import { c as create_ssr_component, o as onDestroy, v as validate_component, b as each, a as add_attribute, e as escape } from "../../../../chunks/ssr.js";
import "ag-grid-community";
/* empty css                                                       */
import { C as Chasing } from "../../../../chunks/Chasing.js";
import { T as Typeahead } from "../../../../chunks/Typeahead.js";
/* empty css                                 */
const css = {
  code: ".training_input.svelte-1krqaef{height:50px;display:flex;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;border:none;font-size:calc(0.08 * var(--width));border-radius:2px;background:#ffffff;margin:0;color:#000;padding:5px 5px 5px 5px;border-radius:5px;float:left;margin:5px}.submit_button.svelte-1krqaef{padding-right:20px;padding-left:20px;background:#007aff;color:white}.submit_button.svelte-1krqaef:hover,.submit_button.svelte-1krqaef:focus{text-decoration:underline;cursor:pointer}button.svelte-1krqaef{height:50px;display:flex;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;border:none;font-size:calc(0.08 * var(--width));border-radius:2px;background:#007aff;margin:0;color:white;padding:5px 5px 5px 5px;border-radius:5px}button.svelte-1krqaef:hover{text-decoration:underline;cursor:pointer}.trainingdaytab.svelte-1krqaef{height:50px;width:120px;display:flex;float:left;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;border:none;font-size:calc(0.08 * var(--width));border-radius:2px;background:#ff3e00;margin:0px 3px 2px 0px;color:white;padding:5px 5px 5px 5px;border-radius:5px}.trainingdaytab.svelte-1krqaef:hover{text-decoration:underline;cursor:pointer}.newProgram.svelte-1krqaef{display:flex;justify-content:left;align-items:center;padding-bottom:10px}@media screen and (max-width: 768px){.training_input.svelte-1krqaef{width:100%}.trainingdaytab.svelte-1krqaef{width:110px}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  var domNode;
  let dayId = 0;
  let dayDescription = "";
  const today = /* @__PURE__ */ new Date();
  const todayString = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
  let typeaheadData = data.exerciseReferences;
  if (!typeaheadData.some((item) => item.exercise_name.indexOf("cmd") > 0)) {
    typeaheadData.push({
      user_id: 0,
      exercise_name: "💪 /cmd Count KCals for the Day",
      exercise_id: 0
    });
  }
  const typeaheadExtract = (item) => item.exercise_name;
  onDestroy(() => {
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `${` <div style="display: flex; justify-content: center; padding: 10px;">${validate_component(Chasing, "Chasing").$$render(
    $$result,
    {
      size: "60",
      color: "#FF3E00",
      unit: "px",
      duration: "1s"
    },
    {},
    {}
  )}</div>`} <div class="newProgram svelte-1krqaef"><button class="svelte-1krqaef" data-svelte-h="svelte-pbbhdr">create new training program</button></div>  <div class="trainingdaytabs"> ${each(data.trainingProgamDays.training_days, (day) => {
    return ` <button class="trainingdaytab svelte-1krqaef">${escape(day.day_description)}</button>`;
  })}</div> <div class="exerciseandload">  <form action="?/addexercise" method="POST">${validate_component(Typeahead, "Typeahead").$$render(
    $$result,
    {
      id: "exerciseautocomplete",
      name: "exerciseautocomplete",
      autofocus: true,
      hideLabel: true,
      focusAfterSelect: true,
      placeholder: "Exercise, i.e. Squat or Run",
      limit: 5,
      data: typeaheadData,
      extract: typeaheadExtract,
      class: "training_input"
    },
    {},
    {}
  )}</form> <form id="trainingGrid" action="?/addexercise" method="POST"><input type="hidden" name="day_id"${add_attribute("value", dayId, 0)}> <input type="hidden" name="day_id"${add_attribute("value", dayDescription, 0)}> <input type="hidden" name="exercise_date"${add_attribute("value", todayString, 0)}> <input type="hidden" name="exercise_name" class="training_input svelte-1krqaef" width="20%">  <input type="text" name="exercise_load" placeholder="Load, i.e. weight or distance" class="training_input svelte-1krqaef" width="20%">  <input type="text" name="exercise_reps" placeholder="Reps" class="training_input svelte-1krqaef" width="20%">  <input type="text" name="exercise_notes" placeholder="Notes, i.e. how you felt or something for next time" class="training_input svelte-1krqaef" width="30%"> <input type="button" value="add" class="training_input submit_button svelte-1krqaef"></form></div>  <div style="display: flex; justify-content: center; align-items: center;"><div id="datagrid" class="ag-theme-alpine" style="height: 70vh; width: 100%;"${add_attribute("this", domNode, 0)}></div></div> ${``}`;
});
export {
  Page as default
};
