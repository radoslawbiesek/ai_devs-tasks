import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { z } from "https://deno.land/x/zod@v3.16.1/index.ts";

const env = await load();

export const config = z
  .object({
    aiDevs: z.object({
      apiKey: z.string(),
      baseUrl: z.string(),
    }),
    openAI: z.object({
      apiKey: z.string(),
    }),
  })
  .parse({
    aiDevs: {
      apiKey: env["AIDEVS_API_KEY"],
      baseUrl: env["AIDEVS_BASE_URL"],
    },
    openAI: {
      apiKey: env["OPENAI_API_KEY"],
    },
  });
