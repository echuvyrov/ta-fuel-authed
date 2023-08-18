import { c as create_ssr_component } from "../../../chunks/index3.js";
import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  Chatbot.init({
    chatflowid: "e7a805b6-b3da-4918-bad2-ff7a5550ffa3",
    apiHost: "https://flowiseai-railway-production-a40c.up.railway.app"
  });
  return ``;
});
export {
  Page as default
};
