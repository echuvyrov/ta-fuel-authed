import * as server from '../entries/pages/traininglog/_date_/_page.server.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/traininglog/_date_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/traininglog/[date]/+page.server.js";
export const imports = ["_app/immutable/nodes/12.2139ae72.js","_app/immutable/chunks/index.4bd8640c.js","_app/immutable/chunks/ag-theme-alpine.28590e6d.js","_app/immutable/chunks/Chasing.1e199912.js","_app/immutable/chunks/Typeahead.588c4d72.js"];
export const stylesheets = ["_app/immutable/assets/12.ca4851a4.css","_app/immutable/assets/ArrowUp.ab04f6cd.css","_app/immutable/assets/ag-theme-alpine.e622b841.css","_app/immutable/assets/Typeahead.abe6b2cd.css"];
export const fonts = [];
