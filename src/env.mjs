import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    // AUTH_DISCORD_ID: z.string(),
    // AUTH_DISCORD_SECRET: z.string(),
  },
  client: {},
  runtimeEnv: process.env,
});
