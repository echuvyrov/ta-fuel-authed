import { c as create_ssr_component, e as escape, b as each } from "./ssr.js";
/* empty css                                      */
const durationUnitRegex = /[a-zA-Z]/;
const range = (size, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);
const css = {
  code: ".wrapper.svelte-1uhddr4{height:var(--size);width:var(--size);display:flex;justify-content:center;align-items:center}.spinner.svelte-1uhddr4{height:var(--size);width:var(--size);animation:svelte-1uhddr4-rotate var(--duration) infinite linear}.dot.svelte-1uhddr4{width:60%;height:60%;display:inline-block;position:absolute;top:0;background-color:var(--color);border-radius:100%;animation:svelte-1uhddr4-bounce var(--duration) infinite ease-in-out}.pause-animation.svelte-1uhddr4{animation-play-state:paused}@keyframes svelte-1uhddr4-rotate{100%{transform:rotate(360deg)}}@keyframes svelte-1uhddr4-bounce{0%,100%{transform:scale(0)}50%{transform:scale(1)}}",
  map: null
};
const Chasing = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color = "#FF3E00" } = $$props;
  let { unit = "px" } = $$props;
  let { duration = "2s" } = $$props;
  let { size = "60" } = $$props;
  let { pause = false } = $$props;
  let durationUnit = duration.match(durationUnitRegex)?.[0] ?? "s";
  let durationNum = duration.replace(durationUnitRegex, "");
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.unit === void 0 && $$bindings.unit && unit !== void 0)
    $$bindings.unit(unit);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.pause === void 0 && $$bindings.pause && pause !== void 0)
    $$bindings.pause(pause);
  $$result.css.add(css);
  return `<div class="wrapper svelte-1uhddr4" style="${"--size: " + escape(size, true) + escape(unit, true) + "; --color: " + escape(color, true) + "; --duration: " + escape(duration, true) + ";"}"><div class="${["spinner svelte-1uhddr4", pause ? "pause-animation" : ""].join(" ").trim()}">${each(range(2, 0), (version) => {
    return `<div class="${["dot svelte-1uhddr4", pause ? "pause-animation" : ""].join(" ").trim()}" style="${"animation-delay: " + escape(
      version === 1 ? `${+durationNum / 2}${durationUnit}` : "0s",
      true
    ) + "; " + escape(version === 1 ? "bottom: 0;" : "", true) + " " + escape(version === 1 ? "top: auto;" : "", true)}"></div>`;
  })}</div> </div>`;
});
export {
  Chasing as C
};
