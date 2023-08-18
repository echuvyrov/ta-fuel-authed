

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/protected/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.7c302391.js","_app/immutable/chunks/index.4bd8640c.js","_app/immutable/chunks/stores.97a00edc.js","_app/immutable/chunks/singletons.51925275.js","_app/immutable/chunks/index.fd763c3b.js"];
export const stylesheets = [];
export const fonts = [];
