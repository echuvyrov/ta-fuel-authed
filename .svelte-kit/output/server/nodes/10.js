import * as server from '../entries/pages/reference/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/reference/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/reference/+page.server.js";
export const imports = ["_app/immutable/nodes/10.f375b914.js","_app/immutable/chunks/index.2f3c9293.js","_app/immutable/chunks/ag-theme-alpine.28590e6d.js","_app/immutable/chunks/Chasing.45e5672d.js"];
export const stylesheets = ["_app/immutable/assets/10.00f3fc8b.css","_app/immutable/assets/ArrowUp.ab04f6cd.css","_app/immutable/assets/ag-theme-alpine.e622b841.css"];
export const fonts = [];
