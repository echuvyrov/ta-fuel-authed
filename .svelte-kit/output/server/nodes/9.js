

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/protected/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.25ded149.js","_app/immutable/chunks/index.2f3c9293.js","_app/immutable/chunks/stores.d450fb43.js","_app/immutable/chunks/singletons.367e176c.js","_app/immutable/chunks/index.2a178420.js"];
export const stylesheets = [];
export const fonts = [];
