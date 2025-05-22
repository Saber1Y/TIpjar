"use client";
import TipjarFactory from "@/artifacts/TipjarFactory.json";
import Contract from "@/artifacts/contract.json";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "../utils/rainbow";
import LandingPage from "@/components/landing";
import "./globals.css";

const queryClient = new QueryClient();

export default function Home() {
    const abi = TipjarFactory.abi;
    const ContractAddress = Contract.address as `0x${string}`;

    return (
        <>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider>
                        <LandingPage
                            ContractAddress={ContractAddress}
                            abi={abi}
                        />
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </>
    );
}
