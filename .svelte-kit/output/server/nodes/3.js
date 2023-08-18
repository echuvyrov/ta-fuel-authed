import * as server from '../entries/pages/@_nickname_/__date__/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/@_nickname_/__date__/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/@[nickname]/[[date]]/+page.server.js";
export const imports = ["_app/immutable/nodes/3.77a412d6.js","_app/immutable/chunks/index.4bd8640c.js"];
export const stylesheets = ["_app/immutable/assets/3.5560e1bb.css"];
export const fonts = [];
