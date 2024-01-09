

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.f9a2f30a.js","_app/immutable/chunks/index.2f3c9293.js","_app/immutable/chunks/ta-logo.67b4efbd.js"];
export const stylesheets = [];
export const fonts = [];
