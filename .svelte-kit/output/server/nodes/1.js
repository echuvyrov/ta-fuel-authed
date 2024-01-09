

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.f2d17509.js","_app/immutable/chunks/index.2f3c9293.js","_app/immutable/chunks/stores.137a8900.js","_app/immutable/chunks/singletons.3e2d54fb.js","_app/immutable/chunks/index.2a178420.js"];
export const stylesheets = [];
export const fonts = [];
