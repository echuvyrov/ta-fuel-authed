import * as server from '../entries/pages/@_nickname_/__date__/foodlog/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/@_nickname_/__date__/foodlog/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/@[nickname]/[[date]]/foodlog/+page.server.js";
export const imports = ["_app/immutable/nodes/4.7117faa2.js","_app/immutable/chunks/index.2f3c9293.js","_app/immutable/chunks/index.745f23a9.js","_app/immutable/chunks/index.2a178420.js","_app/immutable/chunks/stores.61120b96.js","_app/immutable/chunks/ag-theme-alpine.28590e6d.js"];
export const stylesheets = ["_app/immutable/assets/4.fac49f65.css","_app/immutable/assets/ArrowUp.ab04f6cd.css","_app/immutable/assets/ag-theme-alpine.e622b841.css"];
export const fonts = [];
