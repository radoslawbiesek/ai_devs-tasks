import OpenAI from "https://deno.land/x/openai@v4.41.1/mod.ts";
import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

import { config } from "../lib/environment.ts";

export async function blogger(input: unknown): Promise<string[]> {
  const { blog } = z
    .object({
      blog: z.array(z.string()),
    })
    .parse(input);

  const openai = new OpenAI({ apiKey: config.openAI.apiKey });

  const completions = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `
        You are a Polish pizza blogger writing a post about making Margherita pizza. You will receive a list of chapter titles in JSON format, and you need to respond with content for each chapter. Be concise and keep each chapter's content to a maximum of 100 words.

        ### Example
        User: ["Chapter 1 title", "Chapter 2 title"]
        Assistant: ["Content for Chapter 1", "Content for Chapter 2"]        
        `,
      },
      { role: "user", content: `[${blog.join(",")}]` },
    ],
  });

  if (typeof completions.choices[0].message.content !== "string") {
    throw new Error("Invalid response");
  }

  return JSON.parse(completions.choices[0].message.content);
}
