const load = async (event) => {
  return {
    session: await event.locals.getSession()
  };
};

var _layout_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
const component = async () => (await import('./_layout.svelte-07a59dc5.js')).default;
const file = '_app/immutable/components/pages/_layout.svelte-303aed5c.js';
const imports = ["_app/immutable/components/pages/_layout.svelte-303aed5c.js","_app/immutable/chunks/index-188eb586.js","_app/immutable/chunks/stores-cf543d23.js","_app/immutable/chunks/singletons-518bd6c0.js","_app/immutable/chunks/index-de9ade72.js","_app/immutable/chunks/stores-867fc975.js","_app/immutable/chunks/ta-logo-6eca49f4.js"];
const stylesheets = ["_app/immutable/assets/_layout-11cbf681.css"];
const fonts = ["_app/immutable/assets/fira-mono-cyrillic-ext-400-normal-3df7909e.woff2","_app/immutable/assets/fira-mono-all-400-normal-1e3b098c.woff","_app/immutable/assets/fira-mono-cyrillic-400-normal-c7d433fd.woff2","_app/immutable/assets/fira-mono-greek-ext-400-normal-9e2fe623.woff2","_app/immutable/assets/fira-mono-greek-400-normal-a8be01ce.woff2","_app/immutable/assets/fira-mono-latin-ext-400-normal-6bfabd30.woff2","_app/immutable/assets/fira-mono-latin-400-normal-e43b3538.woff2"];

export { component, file, fonts, imports, index, _layout_server as server, stylesheets };
//# sourceMappingURL=0-1024f395.js.map
