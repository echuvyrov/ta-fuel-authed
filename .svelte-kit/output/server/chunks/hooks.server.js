import dotenv from "dotenv";
import { d as dev } from "./environment.js";
import { e as env, b as base } from "./index.js";
import { Auth } from "@auth/core";
import GitHub from "@auth/core/providers/github";
import Twitter from "@auth/core/providers/twitter";
import Google from "@auth/core/providers/google";
import "@auth/core/providers/discord";
async function getSession(req, config) {
  config.secret ??= env.AUTH_SECRET;
  config.trustHost ??= true;
  const prefix = config.prefix ?? `${base}/auth`;
  const url = new URL(prefix + "/session", req.url);
  const request = new Request(url, { headers: req.headers });
  const response = await Auth(request, config);
  const { status = 200 } = response;
  const data = await response.json();
  if (!data || !Object.keys(data).length)
    return null;
  if (status === 200)
    return data;
  throw new Error(data.message);
}
const actions = [
  "providers",
  "session",
  "csrf",
  "signin",
  "signout",
  "callback",
  "verify-request",
  "error"
];
function AuthHandle(svelteKitAuthOptions) {
  return async function({ event, resolve }) {
    const authOptions = typeof svelteKitAuthOptions === "object" ? svelteKitAuthOptions : await svelteKitAuthOptions(event);
    const { prefix = `${base}/auth` } = authOptions;
    const { url, request } = event;
    event.locals.getSession ??= () => getSession(request, authOptions);
    const action = url.pathname.slice(prefix.length + 1).split("/")[0];
    if (!actions.includes(action) || !url.pathname.startsWith(prefix + "/")) {
      return resolve(event);
    }
    return Auth(request, authOptions);
  };
}
function SvelteKitAuth(options) {
  if (typeof options === "object") {
    options.secret ??= env.AUTH_SECRET;
    options.trustHost ??= !!(env.AUTH_TRUST_HOST ?? env.VERCEL ?? dev);
    options.prefix ??= `${base}/auth`;
  }
  return AuthHandle(options);
}
dotenv.config();
const GITHUB_ID = process.env.GITHUB_ID;
const GITHUB_SECRET = process.env.GITHUB_SECRET;
const TWITTER_ID = process.env.TWITTER_ID;
const TWITTER_SECRET = process.env.TWITTER_SECRET;
const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
const handle = SvelteKitAuth({
  debug: true,
  providers: [
    GitHub({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET
    }),
    Twitter({
      clientId: TWITTER_ID,
      clientSecret: TWITTER_SECRET,
      version: "2.0"
    }),
    Google({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET
    })
  ]
});
export {
  handle
};
