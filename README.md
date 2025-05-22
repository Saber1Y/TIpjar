# New Tip Jar

A decentralized tipping platform built with Solidity, Next.js, and RainbowKit.

## Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/) - Install with `npm install -g pnpm`
- [Foundry](https://book.getfoundry.sh/getting-started/installation) - For Solidity development
    ```bash
    curl -L https://foundry.paradigm.xyz | bash
    foundryup
    ```

## Setup

1. Clone the repository and install dependencies:

    ```bash
    git clone <repository-url>
    cd new-tip-jar
    pnpm install
    ```

2. Set up environment variables:
    - Copy `.env.example` to `.env` in the frontend package
    - Fill in required variables:
        - `NEXT_PUBLIC_RAINBOWKIT_CLIENT_ID` - From RainbowKit
        - `THIRDWEB_CLIENT_ID` - From ThirdWeb
        - `THIRDWEB_SECRET_KEY` - From ThirdWeb

## Available Scripts

### Frontend Development

- `pnpm frontend:dev` - Start the Next.js development server
- `pnpm frontend:check-types` - Run TypeScript type checking

### Smart Contract Development

- `pnpm forge:node` - Start a local Anvil blockchain node
- `pnpm forge:build` - Compile smart contracts
- `pnpm forge:deploy` - Deploy contracts and copy artifacts to frontend
- `pnpm forge:copy-contract` - Copy contract artifacts to frontend
- `pnpm forge:copy-tipjar-abi` - Copy Tipjar ABI to frontend
- `pnpm forge:copy-tipjar-factory-abi` - Copy TipjarFactory ABI to frontend

### Other

- `pnpm format` - Format all files using Prettier

## Development Workflow

1. Start the local blockchain:

    ```bash
    pnpm forge:node
    ```

2. In a new terminal, deploy the contracts:

    ```bash
    pnpm forge:deploy
    ```

3. Start the frontend development server:

    ```bash
    pnpm frontend:dev
    ```

4. Visit `http://localhost:3000` to see the application

## Project Structure

- `packages/frontend` - Next.js frontend application
- `packages/backend` - Solidity smart contracts
