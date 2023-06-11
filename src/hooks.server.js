import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import Twitter from "@auth/core/providers/twitter"
import Google from "@auth/core/providers/google";
import Discord from "@auth/core/providers/discord";

const GITHUB_ID = process.env.GITHUB_ID;
const GITHUB_SECRET = process.env.GITHUB_SECRET;
const TWITTER_ID = process.env.TWITTER_ID;
const TWITTER_SECRET = process.env.TWITTER_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// import { GITHUB_ID, GITHUB_SECRET, TWITTER_ID, TWITTER_SECRET } from "$env/static/private"

export const handle = SvelteKitAuth({
  debug: true,
  providers: [
    GitHub({ 
      clientId: GITHUB_ID, 
      clientSecret: GITHUB_SECRET 
    }),
    Twitter({
      clientId: TWITTER_ID,
      clientSecret:TWITTER_SECRET,
      version: "2.0"
    }),
    Google({ 
      clientId: GOOGLE_CLIENT_ID, 
      clientSecret: GOOGLE_CLIENT_SECRET 
    }),
  ],
})
