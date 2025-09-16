# 🚀 Base Mainnet Deployment Guide

This guide will help you deploy your TipJar contracts to Base mainnet and get recognized on Talent Protocol.

## Prerequisites

1. **ETH on Base**: Bridge ~$5-10 worth of ETH to Base mainnet via [Base Bridge](https://bridge.base.org/)
2. **Basescan API Key**: Get one from [Basescan](https://basescan.org/apis) for contract verification
3. **Private Key**: Your wallet's private key (keep it secure!)

## Setup Steps

### 1. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your values:
# - Add your private key (without 0x prefix)
# - Add your Basescan API key
```

### 2. Deploy to Base Mainnet

```bash
# Run the deployment script
./deploy-base.sh
```

### 3. Verify Deployment

After successful deployment:
- Check [Basescan](https://basescan.org) for your verified contracts
- Your contract addresses will be saved in `deployments/deployment-base-mainnet.json`

## Cost Breakdown

| Action | Estimated Cost |
|--------|----------------|
| Deploy TipJarFactory | ~$0.50-1.50 |
| Deploy individual TipJars | ~$0.30-1.00 each |
| Contract verification | Free |

## Talent Protocol Recognition

Once deployed, your contracts will be automatically indexed by Talent Protocol:

1. **Verified Smart Contracts**: Your deployed contracts on Base
2. **GitHub Activity**: Your repository commits and contributions  
3. **Builder Score**: Combined score from both on-chain and off-chain activity

## Next Steps

1. 🔗 Connect your GitHub to [Talent Protocol](https://www.talentprotocol.com/)
2. 📄 Add your Base contract addresses to your Talent Passport
3. 🏆 Participate in Base Builder Rewards programs
4. 📈 Monitor your Builder Score and leaderboard position

## Troubleshooting

### Common Issues:

**"Insufficient funds"**: Bridge more ETH to Base
**"Nonce too high"**: Reset your wallet's nonce or wait a few minutes
**"Verification failed"**: Check your Basescan API key

### Get Help:
- [Base Discord](https://discord.gg/buildonbase)
- [Foundry Book](https://book.getfoundry.sh/)
- [Talent Protocol Docs](https://docs.talentprotocol.com/)

---

**Ready to deploy?** Run `./deploy-base.sh` and start earning builder recognition! 🎯
