import { d as dev } from './environment-19782cc3.js';
import { p as private_env } from './index-9a1e8654.js';
import { Auth } from '@auth/core';
import GitHub from '@auth/core/providers/github';
import Twitter from '@auth/core/providers/twitter';
import './prod-ssr-17392843.js';
import './index-36410280.js';
import './index2-4f7f68c2.js';
import './index3-d06080d5.js';

async function getSession(req, config) {
  config.secret ??= private_env.AUTH_SECRET;
  config.trustHost ??= true;
  const url = new URL("/api/auth/session", req.url);
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
function AuthHandle(prefix, authOptions) {
  return function({ event, resolve }) {
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
  const { prefix = "/auth", ...authOptions } = options;
  authOptions.secret ??= private_env.AUTH_SECRET;
  authOptions.trustHost ??= !!(private_env.AUTH_TRUST_HOST ?? private_env.VERCEL ?? dev);
  return AuthHandle(prefix, authOptions);
}
const GITHUB_ID = process.env.GITHUB_ID;
const GITHUB_SECRET = process.env.GITHUB_SECRET;
const TWITTER_ID = process.env.TWITTER_ID;
const TWITTER_SECRET = process.env.TWITTER_SECRET;
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
    })
  ]
});

export { handle };
//# sourceMappingURL=hooks.server-cd577cbf.js.map
