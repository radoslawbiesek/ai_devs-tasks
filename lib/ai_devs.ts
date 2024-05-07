import { type JSONValue } from "./types.ts";
import { config } from "./environment.ts";

const { baseUrl, apiKey } = config.aiDevs;

export async function getToken(taskName: string) {
  const response = await fetch(`${baseUrl}/token/${taskName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ apikey: apiKey }),
  });

  if (!response.ok) {
    throw new Error("Failed to get token");
  }

  const data = (await response.json()) as {
    code: number;
    token: string;
    msg: string;
  };

  return data.token;
}

export async function getInput(token: string) {
  const response = await fetch(`${baseUrl}/task/${token}`);

  if (!response.ok) {
    throw new Error("Failed to get input");
  }

  const data = (await response.json()) as unknown;

  return data;
}

export async function submitAnswer(token: string, answer: JSONValue) {
  const response = await fetch(`${baseUrl}/answer/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answer }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit answer");
  }

  const data = (await response.json()) as {
    code: number;
    msg: string;
    note: string;
  };

  return data;
}
