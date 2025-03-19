import { CopilotBackend, OpenAIAdapter } from "@copilotkit/backend"; // For backend functionality with CopilotKit.
import type { Action, Parameter } from "@copilotkit/shared"; // For function annotations
import { researchWithLangGraph } from "./research"; // Import a custom function for conducting research.

// Define a runtime environment variable, indicating the environment where the code is expected to run.
export const runtime = "edge";

// Define an annotated function for research. This object includes metadata and an implementation for the function.
const researchAction: Action<[Parameter]> = {
  name: "research",
  description: "Call this function to conduct research on a certain topic. Respect other notes about when to call this function",
  parameters: [{
    name: "topic",
    type: "string",
    description: "The topic to research. 5 characters or longer.",
    required: true
  }],
  handler: async (args) => {
    console.log("Researching topic: ", args.topic);
    return await researchWithLangGraph(args.topic as string);
  }
};

// Define an asynchronous function that handles POST requests.
export async function POST(req: Request): Promise<Response> {
    const actions: Action<[Parameter]>[] = []; // Initialize an array to hold actions.
  
    // Check if a specific environment variable is set, indicating access to certain functionality.
    if (process.env["TAVILY_API_KEY"]) {
      actions.push(researchAction); // Add the research action to the actions array if the condition is true.
    }
  
    // Instantiate CopilotBackend with the actions defined above.
    const copilotKit = new CopilotBackend({
      actions: actions.map(action => ({
        name: action.name,
        description: action.description,
        handler: async () => {
          if (action.handler) {
            return await action.handler({ topic: "" });
          }
          return "";
        },
      })),
    });
  
    // Use the CopilotBackend instance to generate a response for the incoming request using an OpenAIAdapter.
    return copilotKit.response(req, new OpenAIAdapter());
  }
  
