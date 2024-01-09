

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/protected/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.0d6c8156.js","_app/immutable/chunks/index.2f3c9293.js","_app/immutable/chunks/stores.137a8900.js","_app/immutable/chunks/singletons.3e2d54fb.js","_app/immutable/chunks/index.2a178420.js"];
export const stylesheets = [];
export const fonts = [];
