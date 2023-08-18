import * as server from '../entries/pages/@_nickname_/__date__/traininglog/_page.server.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/@_nickname_/__date__/traininglog/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/@[nickname]/[[date]]/traininglog/+page.server.js";
export const imports = ["_app/immutable/nodes/5.0a193076.js","_app/immutable/chunks/index.4bd8640c.js","_app/immutable/chunks/ag-theme-alpine.28590e6d.js"];
export const stylesheets = ["_app/immutable/assets/5.e6d7855a.css","_app/immutable/assets/ag-theme-alpine.e622b841.css"];
export const fonts = [];
