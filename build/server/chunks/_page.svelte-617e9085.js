import { c as create_ssr_component, a as subscribe, e as escape } from './index3-d06080d5.js';
import { p as page } from './stores2-ff183038.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${$page.data.session ? `<h1>Protected page</h1>
<p>This is a protected content. You can access this content because you are
  signed in.
</p>
<p>Session expiry: ${escape($page.data.session?.expires)}</p>` : `<h1>Access Denied</h1>
<p><a href="${"/auth/signin"}">You must be signed in to view this page
  </a></p>`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-617e9085.js.map
