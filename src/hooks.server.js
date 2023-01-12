import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import Twitter from "@auth/core/providers/twitter"

import { GITHUB_ID, GITHUB_SECRET, TWITTER_ID, TWITTER_SECRET } from "$env/static/private"

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
    })
  ],
})
