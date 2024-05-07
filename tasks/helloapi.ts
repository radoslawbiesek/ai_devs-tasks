import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

export function helloapi(input: unknown) {
  const { cookie } = z
    .object({
      cookie: z.string(),
    })
    .parse(input);

  return cookie;
}
