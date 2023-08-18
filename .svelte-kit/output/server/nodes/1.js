

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.703d9f57.js","_app/immutable/chunks/index.4bd8640c.js","_app/immutable/chunks/stores.97a00edc.js","_app/immutable/chunks/singletons.51925275.js","_app/immutable/chunks/index.fd763c3b.js"];
export const stylesheets = [];
export const fonts = [];
