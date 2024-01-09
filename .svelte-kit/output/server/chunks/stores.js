import { w as writable } from "./index3.js";
const currentDate = writable(new Date().toString().split("T")[0]);
const user = writable({});
export {
  currentDate as c,
  user as u
};
