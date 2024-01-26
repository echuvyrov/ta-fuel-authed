import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.krUvH-bR.js","_app/immutable/chunks/scheduler.D5qmQzhB.js","_app/immutable/chunks/index.eUYc991i.js","_app/immutable/chunks/stores.3myVDNfz.js","_app/immutable/chunks/entry.ATmJBaWq.js","_app/immutable/chunks/index.hoQhhCWd.js","_app/immutable/chunks/stores.N89_U9GC.js","_app/immutable/chunks/ta-logo.bkltSxS2.js"];
export const stylesheets = ["_app/immutable/assets/0.xD34xJz2.css"];
export const fonts = ["_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.dOGCK5uJ.woff2","_app/immutable/assets/fira-mono-all-400-normal.dpry7Ug7.woff","_app/immutable/assets/fira-mono-cyrillic-400-normal.N-vuOVMo.woff2","_app/immutable/assets/fira-mono-greek-ext-400-normal.rKiNtwjr.woff2","_app/immutable/assets/fira-mono-greek-400-normal.At854Oju.woff2","_app/immutable/assets/fira-mono-latin-ext-400-normal.-l34kfv6.woff2","_app/immutable/assets/fira-mono-latin-400-normal.yoy1YEIp.woff2"];
