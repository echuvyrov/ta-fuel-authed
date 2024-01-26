import * as server from '../entries/pages/foodlog/_date_/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/foodlog/_date_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/foodlog/[date]/+page.server.js";
export const imports = ["_app/immutable/nodes/8.FnjRTaCW.js","_app/immutable/chunks/scheduler.D5qmQzhB.js","_app/immutable/chunks/index.eUYc991i.js","_app/immutable/chunks/index.61jbim_M.js","_app/immutable/chunks/index.hoQhhCWd.js","_app/immutable/chunks/stores.N89_U9GC.js","_app/immutable/chunks/ag-theme-alpine.3A7TJ96k.js","_app/immutable/chunks/Typeahead.U1aXNshX.js","_app/immutable/chunks/each.-oqiv04n.js","_app/immutable/chunks/Chasing.mmy04f5_.js"];
export const stylesheets = ["_app/immutable/assets/8.xHIWgLSS.css","_app/immutable/assets/ArrowUp.0wYF0huv.css","_app/immutable/assets/ag-theme-alpine.X7IH5n54.css","_app/immutable/assets/Typeahead.eocfUHgw.css"];
export const fonts = [];
