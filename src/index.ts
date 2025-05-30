import 'dotenv/config';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Validate required environment variables
const requiredEnvVars = {
  X_USER_ID: process.env.X_USER_ID,
  X_ORGANIZATION_SECRET: process.env.X_ORGANIZATION_SECRET,
  REPLICA_UUID: process.env.REPLICA_UUID,
};

for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    console.error(`Missing required environment variable: ${key}`);
    console.error('Please create a .env file with all required variables. See README.md for details.');
    process.exit(1);
  }
}

// Create server instance
const server = new McpServer({
  name: "sensay",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {
      listTools: {},
      callTool: {},
    },
  },
});

async function makeChatCompletion(message: string): Promise<{success: boolean, content: string}> {
  const response = await fetch(`https://api.sensay.io/v1/replicas/${process.env.REPLICA_UUID}/chat/completions`, {
    method: "POST",
    headers: {
      "X-API-Version": "2025-03-25",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-USER-ID": process.env.X_USER_ID!,
      "X-ORGANIZATION-SECRET": process.env.X_ORGANIZATION_SECRET!,
    },
    body: JSON.stringify({
      content: message,
      skip_chat_history: true
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

server.tool("Ask Sensay", "Get business rules of the sensay.ai", {
    content: z.string(),
}, async (args, extra) => {
    const { content } = args;
    const { success, content: responseContent } = await makeChatCompletion(content);
    return {
        content: [{ type: "text", text: responseContent }],
    };
});


async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Sensay MCP Server running on stdio");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});