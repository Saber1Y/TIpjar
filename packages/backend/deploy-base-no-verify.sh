#!/bin/bash

# Base Mainnet Deployment Script (No Verification)
echo "🚀 Deploying to Base Mainnet (without verification)..."

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

# Deploy without verification first
echo "🏭 Deploying TipJarFactory (no verification)..."
forge script script/DeployTipjarFactory.s.sol \
    --rpc-url https://mainnet.base.org \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --legacy \
    -vvvv

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "📄 Contract deployed! You can verify it manually on Basescan later"
    echo "🎯 Now you can update your Talent Protocol profile!"
    echo ""
    echo "To verify later, run:"
    echo "forge verify-contract <CONTRACT_ADDRESS> src/TIpjarFactory.sol:TipJarFactory --chain base --etherscan-api-key \$BASESCAN_API_KEY"
else
    echo "❌ Deployment failed!"
    exit 1
fi
