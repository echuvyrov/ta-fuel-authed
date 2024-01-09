import * as server from '../entries/pages/experience/_date_/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/experience/_date_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/experience/[date]/+page.server.js";
export const imports = ["_app/immutable/nodes/7.2c9801bc.js","_app/immutable/chunks/index.2f3c9293.js"];
export const stylesheets = ["_app/immutable/assets/7.f5b3306b.css"];
export const fonts = [];
