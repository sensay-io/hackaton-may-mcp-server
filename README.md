# Sensay MCP Server

This repository contains an MCP (Model Context Protocol) server that integrates with Sensay.ai's Replika. The goal is to bridge the gap between AI code generation tools (like Cursor IDE) and your organization's business rules (e.g. pricing, KYC compliance, regulatory data). The MCP server exposes an API for developers and AI agents to query business logic stored in Replika's RAG system, enabling direct access to business knowledge while writing code.

## What Does the MCP Server Do?

- Connects to Sensay.ai's Replika to fetch business rules.
- Exposes endpoints for agents (like Cursor IDE) to retrieve or verify business logic in real time.
- Designed to help developers ensure compliance and accuracy by embedding business rules directly into the development workflow.

**Example use case:**
A developer is building a feature that depends on pricing plans. They can call the MCP server to get up-to-date business rules, integrate them into their code, and verify compliance—all from within their IDE.

## Prerequisites

- Node.js (v16+ recommended)
- npm
- Sensay.ai credentials (User ID, Organization Secret, Replica UUID)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Build the project:**
   ```bash
   npm run build
   ```

## Integrating with Cursor IDE

To make the MCP server available in Cursor, you need to provide a configuration file. Use the provided `mcp-example.json` as a template:

1. **Copy and rename:**
   ```bash
   cp mcp-example.json .cursor/mcp.json
   ```
2. **Edit `.cursor/mcp.json`** to match your environment variables and server command.

### Global Configuration

To make the MCP server available in all your Cursor projects:

1. Copy your `mcp.json` to your home directory:
   ```bash
   cp mcp-example.json ~/.cursor/mcp.json
   # or if you already have a project-specific mcp.json
   cp .cursor/mcp.json ~/.cursor/mcp.json
   ```
2. Cursor will now recognize your MCP server globally, making the "Ask Sensay" tool available in any project.

---

For more details, see Sensay.ai documentation or contact your admin for credentials.

## Tools Provided

- **Ask Sensay**: Get business rules and information from the Sensay.ai replica
