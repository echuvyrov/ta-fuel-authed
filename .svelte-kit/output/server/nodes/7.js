import * as server from '../entries/pages/experience/_date_/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/experience/_date_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/experience/[date]/+page.server.js";
export const imports = ["_app/immutable/nodes/7.7868ca9e.js","_app/immutable/chunks/index.4bd8640c.js"];
export const stylesheets = ["_app/immutable/assets/7.f5b3306b.css"];
export const fonts = [];
