import * as server from '../entries/pages/@_nickname_/__date__/traininglog/_page.server.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/@_nickname_/__date__/traininglog/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/@[nickname]/[[date]]/traininglog/+page.server.js";
export const imports = ["_app/immutable/nodes/5.4k6Yn4t1.js","_app/immutable/chunks/scheduler.D5qmQzhB.js","_app/immutable/chunks/each.-oqiv04n.js","_app/immutable/chunks/index.eUYc991i.js","_app/immutable/chunks/ag-theme-alpine.3A7TJ96k.js"];
export const stylesheets = ["_app/immutable/assets/5.8yW9VKCj.css","_app/immutable/assets/ag-theme-alpine.X7IH5n54.css"];
export const fonts = [];
