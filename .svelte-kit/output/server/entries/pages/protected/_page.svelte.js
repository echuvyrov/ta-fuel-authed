import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, e as escape } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${$page.data.session ? `<h1 data-svelte-h="svelte-6tucnd">Protected page</h1> <p data-svelte-h="svelte-3fxfne">This is a protected content. You can access this content because you are
  signed in.</p> <p>Session expiry: ${escape($page.data.session?.expires)}</p>` : `<h1 data-svelte-h="svelte-1gz5fm9">Access Denied</h1> <p data-svelte-h="svelte-t1xv50"><a href="/auth/signin">You must be signed in to view this page</a></p>`}`;
});
export {
  Page as default
};
