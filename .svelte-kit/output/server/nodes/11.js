import * as server from '../entries/pages/traininglog/_date_/_page.server.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/traininglog/_date_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/traininglog/[date]/+page.server.js";
export const imports = ["_app/immutable/nodes/11.cc168ecb.js","_app/immutable/chunks/index.2f3c9293.js","_app/immutable/chunks/ag-theme-alpine.28590e6d.js","_app/immutable/chunks/Chasing.45e5672d.js","_app/immutable/chunks/Typeahead.3433a08a.js"];
export const stylesheets = ["_app/immutable/assets/11.ca4851a4.css","_app/immutable/assets/ArrowUp.ab04f6cd.css","_app/immutable/assets/ag-theme-alpine.e622b841.css","_app/immutable/assets/Typeahead.abe6b2cd.css"];
export const fonts = [];
