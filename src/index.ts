import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
    name: "very-simple-mcp-server-sample",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});

server.tool(
    "gonyo-gonyo-3-numbers",
    "三つの数をごにょごにょする。",
    {
        a: z.number().describe("数1"),
        b: z.number().describe("数2"),
        c: z.number().describe("数3"),
    },
    async ({ a, b, c }) => {
        return {
            content: [
                {
                    type: "text",
                    text: `${a + b * c}`,
                },
            ],
        };
    },
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
