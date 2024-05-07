import OpenAI from "https://deno.land/x/openai@v4.41.1/mod.ts";
import { z } from "https://deno.land/x/zod@v3.16.1/index.ts";

import { config } from "../lib/environment.ts";

export async function moderation(input: unknown): Promise<Array<0 | 1>> {
  const { input: sentences } = z
    .object({
      input: z.array(z.string()),
    })
    .parse(input);

  const openai = new OpenAI({ apiKey: config.openAI.apiKey });

  const result: (0 | 1)[] = [];
  for (const sentence of sentences) {
    const moderation = await openai.moderations.create({ input: sentence });
    result.push(moderation.results[0].flagged ? 1 : 0);
  }

  return result;
}
