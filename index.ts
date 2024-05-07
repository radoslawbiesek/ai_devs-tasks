import { getInput, getToken, submitAnswer } from "./lib/ai_devs.ts";
import { helloapi, moderation, blogger } from "./tasks/tasks.ts";
import { type JSONValue } from "./lib/types.ts";

const solutions: Record<
  string,
  (input: unknown) => JSONValue | Promise<JSONValue>
> = {
  helloapi,
  moderation,
  blogger,
} as const;

const taskName = prompt("Enter the task name: ");
if (!taskName || !(taskName in solutions)) {
  throw new Error("Invalid task name");
}

const token = await getToken(taskName);
const input = await getInput(token);
const answer = await solutions[taskName](input);
const result = await submitAnswer(token, answer);

console.log("Result: ", result);
