#!/bin/bash

# Base Mainnet Deployment Script
echo "🚀 Deploying to Base Mainnet..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found! Please create one based on .env.example"
    exit 1
fi

# Load environment variables
source .env

# Check if private key is set
if [ -z "$PRIVATE_KEY" ]; then
    echo "❌ PRIVATE_KEY not set in .env file!"
    exit 1
fi

echo "📡 Network: Base Mainnet (Chain ID: 8453)"
echo "💰 Estimated cost: ~$0.50-2.00 USD in ETH"

# Deploy the factory contract
echo "🏭 Deploying TipJarFactory..."
forge script script/DeployTipjarFactory.s.sol \
    --rpc-url base \
    --broadcast \
    --verify \
    --etherscan-api-key $BASESCAN_API_KEY \
    -vvvv

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "📄 Check Basescan for your verified contracts"
    echo "🎯 Now you can update your Talent Protocol profile!"
else
    echo "❌ Deployment failed!"
    exit 1
fi
