import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import "@copilotkit/react-textarea/styles.css";

import { Article } from "../components/Article";
import Header from "../components/Header";


export default function WriteArticle() {
  return (
    <>
    <Header />
    <CopilotKit
      publicApiKey="pk-123456789"
      runtimeUrl="http://localhost:3000/api/copilot"
    >
      <CopilotSidebar
        instructions="Help the user research a blog article topic."
        defaultOpen={true}
        labels={{
          title: "Blog Article Copilot",
          initial:
            "Hi you! 👋 I can help you research any topic for a blog article.",
        }}
        clickOutsideToClose={false}>
        <Article />
      </CopilotSidebar>
    </CopilotKit>
  </>
);
}

