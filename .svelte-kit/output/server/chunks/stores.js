import { w as writable } from "./index2.js";
const currentDate = writable((/* @__PURE__ */ new Date()).toString().split("T")[0]);
const user = writable({});
export {
  currentDate as c,
  user as u
};
