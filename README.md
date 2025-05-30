# Sensay MCP Server

A Model Context Protocol (MCP) server that provides access to Sensay AI replicas for business rules and information.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```bash
X_USER_ID=your_user_id_here
X_ORGANIZATION_SECRET=your_organization_secret_here
REPLICA_UUID=your_replica_uuid_here
```

3. Build the project:

```bash
npm run build
```

## Adding to Cursor

### For Local Development

Create a `.cursor/mcp.json` file in your project directory:

```json
{
  "mcpServers": {
    "sensay": {
      "command": "node",
      "args": ["build/index.js"],
      "env": {
        "X_USER_ID": "your_user_id_here",
        "X_ORGANIZATION_SECRET": "your_organization_secret_here",
        "REPLICA_UUID": "your_replica_uuid_here"
      }
    }
  }
}
```

### For Published Package

If installed via npm, create a `.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "sensay": {
      "command": "npx",
      "args": ["-y", "hackaton-may-mcp-server"],
      "env": {
        "X_USER_ID": "your_user_id_here",
        "X_ORGANIZATION_SECRET": "your_organization_secret_here",
        "REPLICA_UUID": "your_replica_uuid_here"
      }
    }
  }
}
```

### Global Configuration

To use this MCP server across all Cursor projects, create `~/.cursor/mcp.json` in your home directory with the same configuration.

## Usage

Once configured, the "Ask Sensay" tool will be available in Cursor's chat. The agent can automatically use this tool to get business rules and information from your Sensay AI replica.

## Tools Provided

- **Ask Sensay**: Get business rules and information from the Sensay.ai replica
