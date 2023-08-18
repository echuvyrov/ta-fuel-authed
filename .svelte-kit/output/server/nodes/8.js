import * as server from '../entries/pages/foodlog/_date_/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/foodlog/_date_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/foodlog/[date]/+page.server.js";
export const imports = ["_app/immutable/nodes/8.1f742ecd.js","_app/immutable/chunks/index.4bd8640c.js","_app/immutable/chunks/index.af0d9252.js","_app/immutable/chunks/index.fd763c3b.js","_app/immutable/chunks/stores.5294ae04.js","_app/immutable/chunks/ag-theme-alpine.28590e6d.js","_app/immutable/chunks/Typeahead.588c4d72.js","_app/immutable/chunks/Chasing.1e199912.js"];
export const stylesheets = ["_app/immutable/assets/8.471bc88c.css","_app/immutable/assets/ArrowUp.ab04f6cd.css","_app/immutable/assets/ag-theme-alpine.e622b841.css","_app/immutable/assets/Typeahead.abe6b2cd.css"];
export const fonts = [];
