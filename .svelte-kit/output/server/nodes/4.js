import * as server from '../entries/pages/@_nickname_/__date__/foodlog/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/@_nickname_/__date__/foodlog/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/@[nickname]/[[date]]/foodlog/+page.server.js";
export const imports = ["_app/immutable/nodes/4.PyU_kKoo.js","_app/immutable/chunks/scheduler.D5qmQzhB.js","_app/immutable/chunks/index.eUYc991i.js","_app/immutable/chunks/index.61jbim_M.js","_app/immutable/chunks/index.hoQhhCWd.js","_app/immutable/chunks/stores.N89_U9GC.js","_app/immutable/chunks/ag-theme-alpine.3A7TJ96k.js"];
export const stylesheets = ["_app/immutable/assets/4.YDHiM252.css","_app/immutable/assets/ArrowUp.0wYF0huv.css","_app/immutable/assets/ag-theme-alpine.X7IH5n54.css"];
export const fonts = [];
