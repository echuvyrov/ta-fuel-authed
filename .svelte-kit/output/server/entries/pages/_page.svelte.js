import { c as create_ssr_component, b as add_attribute } from "../../chunks/index2.js";
import { t as ta_logo } from "../../chunks/ta-logo.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section><h1><img${add_attribute("src", ta_logo, 0)} alt="Tactical Athletics" style="width:256px;"></h1>
	<center><iframe width="375" height="211" src="https://www.youtube.com/embed/B8LQEuIBZp4?si=ugpod5FM-Oe2ppWr" title="YouTube video player" frameborder="1" allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></center></section>`;
});
export {
  Page as default
};
