import { CopilotBackend, OpenAIAdapter } from "@copilotkit/backend"; // For backend functionality with CopilotKit.

// Define a runtime environment variable, indicating the environment where the code is expected to run.
export const runtime = "edge";

// Define the research function without circular import/export issues.
const researchAction = {
  name: "research",
  description: "Call this function to conduct research on a certain topic. Respect other notes about when to call this function",
  argumentAnnotations: [{
    name: "topic",
    type: "string",
    description: "The topic to research. 5 characters or longer.",
    required: true
  }],
  implementation: async (topic: string) => {
    console.log("Researching topic: ", topic);
    return await researchWithLangGraph(topic);
  }
};

// Define an asynchronous function that handles POST requests.
export async function POST(req: Request): Promise<Response> {
  const actions = []; // Initialize an array to hold actions.

  // Check if a specific environment variable is set, indicating access to certain functionality.
  if (process.env["TAVILY_API_KEY"]) {
    actions.push(researchAction); // Add the research action to the actions array if the condition is true.
  }

  // Instantiate CopilotBackend with the actions defined above.
  const copilotKit = new CopilotBackend({
    actions: actions.map(action => ({
      name: action.name,
      description: action.description,
      handler: () => action.implementation(action.argumentAnnotations[0].name),
    })),
  });

  // Use the CopilotBackend instance to generate a response for the incoming request using an OpenAIAdapter.
  return copilotKit.response(req, new OpenAIAdapter());
}

// Define the research function
async function researchWithLangGraph(topic: string) {
  // Implementation of research function
  return `Research results for ${topic}`;
}

export { researchWithLangGraph };

