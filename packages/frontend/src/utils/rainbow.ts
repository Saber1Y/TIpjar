import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";
import { http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

const localhost = defineChain({
    id: 31337,
    name: "Avil",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
    },
    rpcUrls: {
        default: { http: ["http://127.0.0.1:8545"] },
    },
});

export const config = getDefaultConfig({
    // export const config = createConfig({
    appName: process.env.NEXT_PUBLIC_APP_NAME || "",
    projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_CLIENT_ID || "",
    appDescription: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "",
    chains: [mainnet, sepolia, localhost],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [localhost.id]: http("http://127.0.0.1:8545"),
    },
});
