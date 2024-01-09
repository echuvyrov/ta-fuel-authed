import { c as create_ssr_component, a as subscribe, b as add_attribute, e as escape, v as validate_component } from "../../chunks/index3.js";
import { p as page } from "../../chunks/stores2.js";
import { u as user } from "../../chunks/stores.js";
import { t as ta_logo } from "../../chunks/ta-logo.js";
const Header_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "header.svelte-1b1ge90.svelte-1b1ge90{display:flex;justify-content:center}.corner.svelte-1b1ge90.svelte-1b1ge90{width:3em;height:3em}.corner.svelte-1b1ge90 a.svelte-1b1ge90{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.corner.svelte-1b1ge90 img.svelte-1b1ge90{width:2em;height:2em;object-fit:contain}nav.svelte-1b1ge90.svelte-1b1ge90{display:flex;justify-content:center;--background:rgba(255, 255, 255, 0.7)}svg.svelte-1b1ge90.svelte-1b1ge90{width:2em;height:3em;display:block}path.svelte-1b1ge90.svelte-1b1ge90{fill:var(--background)}ul.svelte-1b1ge90.svelte-1b1ge90{position:relative;padding:0;margin:0;height:3em;display:flex;justify-content:center;align-items:center;list-style:none;background:var(--background);background-size:contain}li.svelte-1b1ge90.svelte-1b1ge90{position:relative;height:100%}li.active.svelte-1b1ge90.svelte-1b1ge90::before{--size:6px;content:'';width:0;height:0;position:absolute;top:0;left:calc(50% - var(--size));border:var(--size) solid transparent;border-top:var(--size) solid var(--color-theme-1)}nav.svelte-1b1ge90 a.svelte-1b1ge90{display:flex;height:100%;align-items:center;padding:0 0.5rem;color:var(--color-text);font-weight:700;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;text-decoration:none;transition:color 0.2s linear}a.svelte-1b1ge90.svelte-1b1ge90:hover{color:var(--color-theme-1)}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const today = new Date();
  const todayString = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
  $$result.css.add(css$1);
  $$unsubscribe_page();
  return `<header class="${"svelte-1b1ge90"}"><div class="${"corner svelte-1b1ge90"}"><a href="${"/"}" class="${"svelte-1b1ge90"}"><img${add_attribute("src", ta_logo, 0)} alt="${"Tactical Athletics"}" class="${"svelte-1b1ge90"}"></a></div>

	<div class="${"header"}"><div class="${"signedInStatus"}"><p class="${"nojs-show loaded"}">${$page.data.session ? `${$page.data.session.user?.username ? `${escape(user.username = $page.data.session.user?.username)}` : ``}

					${escape(user.name = $page.data.session.user?.name)}
					${$page.data.session.user?.image ? `<span style="${"background-image: url('" + escape($page.data.session.user.image, true) + "')"}" class="${"avatar"}"></span>` : ``}
					<span class="${"signedInText"}"><small>Signed in as</small><br>
						<strong>${escape($page.data.session.user?.name)}</strong></span>
					<a href="${"/auth/signout"}" class="${"buttonPrimary svelte-1b1ge90"}">Sign out</a>` : `<a href="${"/auth/signin"}" class="${"buttonPrimary svelte-1b1ge90"}">Sign in</a>`}</p></div>
		
		
		${$page.data.session ? `${$page.data.session.user?.name ? `<nav class="${"svelte-1b1ge90"}"><svg viewBox="${"0 0 2 3"}" aria-hidden="${"true"}" class="${"svelte-1b1ge90"}"><path d="${"M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"}" class="${"svelte-1b1ge90"}"></path></svg>
				<ul class="${"svelte-1b1ge90"}"><li class="${[
    "svelte-1b1ge90",
    $page.url.pathname.includes("/experience") ? "active" : ""
  ].join(" ").trim()}"><a href="${"/experience/" + escape(todayString, true)}" class="${"svelte-1b1ge90"}">Experience</a></li>
					<li class="${[
    "svelte-1b1ge90",
    $page.url.pathname.includes("traininglog") ? "active" : ""
  ].join(" ").trim()}"><a href="${"/traininglog/" + escape(todayString, true)}" class="${"svelte-1b1ge90"}">Train</a></li>
					<li class="${["svelte-1b1ge90", $page.url.pathname.includes("foodlog") ? "active" : ""].join(" ").trim()}"><a href="${"/foodlog/" + escape(todayString, true)}" class="${"svelte-1b1ge90"}">Fuel</a></li>
					<li class="${["svelte-1b1ge90", $page.url.pathname === "/reference" ? "active" : ""].join(" ").trim()}"><a href="${"/reference"}" class="${"svelte-1b1ge90"}">Reference</a></li></ul>
				<svg viewBox="${"0 0 2 3"}" aria-hidden="${"true"}" class="${"svelte-1b1ge90"}"><path d="${"M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"}" class="${"svelte-1b1ge90"}"></path></svg>

				<div class="${"corner svelte-1b1ge90"}"></div></nav>` : ``}` : ``}</div></header>`;
});
const styles = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".app.svelte-1pc322i.svelte-1pc322i{display:flex;flex-direction:column;min-height:100vh}main.svelte-1pc322i.svelte-1pc322i{flex:1;display:flex;flex-direction:column;padding:1rem;width:100%;max-width:64rem;margin:0 auto;box-sizing:border-box}footer.svelte-1pc322i.svelte-1pc322i{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:12px}footer.svelte-1pc322i a.svelte-1pc322i{font-weight:bold}@media(min-width: 480px){footer.svelte-1pc322i.svelte-1pc322i{padding:12px 0}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"app svelte-1pc322i"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

	<main class="${"svelte-1pc322i"}">${slots.default ? slots.default({}) : ``}</main>

	<footer class="${"svelte-1pc322i"}"><a href="${"https://kit.svelte.dev"}" class="${"svelte-1pc322i"}">visit tactical athletics for more stuff like this</a></footer>
</div>`;
});
export {
  Layout as default
};
