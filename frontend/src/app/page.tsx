"use client";
import Navbar from "@/components/Navbar";
import TipjarFactory from "../Data/TipjarFactory.json";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "../config";
import LandingPage from "@/components/LandingPage";

const queryClient = new QueryClient();

export default function Home() {
  
  const abi = TipjarFactory.abi;
  const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Navbar />
            <LandingPage ContractAddress={ContractAddress} abi={abi} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
