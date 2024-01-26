import * as universal from '../entries/pages/about/_page.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/about/+page.js";
export const imports = ["_app/immutable/nodes/6.HBBGU4av.js","_app/immutable/chunks/scheduler.D5qmQzhB.js","_app/immutable/chunks/index.eUYc991i.js"];
export const stylesheets = [];
export const fonts = [];
