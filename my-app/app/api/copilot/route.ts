import { CopilotBackend, OpenAIAdapter } from "@copilotkit/backend";
import { streamText } from "ai";

const copilotKit = new CopilotBackend();

export async function POST(req: Request) {
  return copilotKit.response(req, new OpenAIAdapter());
} 