"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseEther } from "viem";

interface TipJarPageProps {
    FactoryAddress: `0x${string}`;
    FactoryAbi: any;
    TipJarAbi: any;
}

interface TipJarMetadata {
    name: string;
    description: string;
    avatarUrl: string;
    slug: string;
    owner: string;
    createdAt: string;
}

const TipJarPage: React.FC<TipJarPageProps> = ({
    FactoryAddress,
    FactoryAbi,
    TipJarAbi,
}) => {
    const { slug } = useParams();
    const router = useRouter();
    const { address, isConnected } = useAccount();

    const [metadata, setMetadata] = useState<TipJarMetadata | null>(null);
    const [tipJarAddress, setTipJarAddress] = useState<`0x${string}` | null>(
        null,
    );
    const [amountToTip, setAmountToTip] = useState<string>("0.01");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [tipHistory, setTipHistory] = useState<any[]>([]);

    // Get TipJar address from factory contract
    const { data: contractTipJarAddress } = useReadContract({
        address: FactoryAddress,
        abi: FactoryAbi,
        functionName: "getTipJarBySlug",
        args: [slug as string],
        // enabled: !!slug,
    });

    // Get CID from factory contract
    const { data: metadataCID } = useReadContract({
        address: FactoryAddress,
        abi: FactoryAbi,
        functionName: "getCIDBySlug",
        args: [slug as string],
        // enabled: !!slug && !!contractTipJarAddress,
    });

    const { writeContractAsync: sendTipAsync } = useWriteContract();

    useEffect(() => {
        if (
            contractTipJarAddress &&
            contractTipJarAddress !==
                "0x0000000000000000000000000000000000000000"
        ) {
            setTipJarAddress(contractTipJarAddress as `0x${string}`);
        }
    }, [contractTipJarAddress]);

    useEffect(() => {
        const fetchMetadata = async () => {
            if (!metadataCID) return;

            setIsLoading(true);
            try {
                // Fetch metadata from IPFS gateway
                const response = await axios.get(
                    `https://gateway.pinata.cloud/ipfs/${metadataCID}`,
                );
                setMetadata(response.data);

                // Check if current user is the owner
                if (address && response.data.owner) {
                    setIsOwner(
                        address.toLowerCase() ===
                            response.data.owner.toLowerCase(),
                    );
                }
            } catch (error) {
                console.error("Error fetching TipJar metadata:", error);
                toast.error("Failed to load TipJar details");
            } finally {
                setIsLoading(false);
            }
        };

        if (metadataCID) {
            fetchMetadata();
        }
    }, [metadataCID, address]);

    // Fetch tip history (placeholder - would need contract events in production)
    useEffect(() => {
        // Mock data for now - in production this would come from contract events
        if (tipJarAddress) {
            setTipHistory([
                {
                    tipper: "0x123...789",
                    amount: "0.05 ETH",
                    timestamp: "2 days ago",
                },
                {
                    tipper: "0x456...abc",
                    amount: "0.01 ETH",
                    timestamp: "1 week ago",
                },
            ]);
        }
    }, [tipJarAddress]);

    const handleSendTip = async () => {
        if (!isConnected) {
            toast.warning("Please connect your wallet first");
            return;
        }

        if (!tipJarAddress) {
            toast.error("TipJar address not found");
            return;
        }

        try {
            const tipAmountEther = parseEther(amountToTip);

            // Assuming your TipJar contract has a "tip" function that's payable
            const tx = await sendTipAsync({
                address: tipJarAddress,
                abi: TipJarAbi,
                functionName: "tip", // Make sure this matches your contract's function name
                args: [], // No args needed for simple tip function
                value: tipAmountEther,
            });

            toast.success(
                `Sending ${amountToTip} ETH tip to ${metadata?.name}`,
            );
            toast.success(`Transaction submitted: ${tx.slice(0, 8)}...`);

            // Reset tip amount
            setAmountToTip("0.01");
        } catch (error: any) {
            console.error("Error sending tip:", error);
            toast.error(`Failed to send tip: ${error.message}`);
        }
    };

    // Handler for custom tip amount
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            // Allow only numeric and decimal input
            setAmountToTip(value);
        }
    };

    // Quick tip amount buttons
    const quickTipAmounts = ["0.001", "0.01", "0.05", "0.1"];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (!metadata || !tipJarAddress) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                    TipJar Not Found
                </h1>
                <p className="text-gray-600 mb-8">
                    The TipJar you're looking for doesn't exist or has been
                    removed.
                </p>
                <button
                    onClick={() => router.push("/")}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <ToastContainer position="top-center" />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => router.push("/")}
                        className="text-purple-600 hover:text-purple-800 font-medium"
                    >
                        ← Back to Home
                    </button>

                    {isOwner && (
                        <button
                            onClick={() =>
                                router.push(`/dashboard/tipjar/${slug}`)
                            }
                            className="text-purple-600 hover:text-purple-800 font-medium"
                        >
                            Manage TipJar
                        </button>
                    )}
                </div>

                {/* TipJar Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Banner and Profile */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-48 relative">
                        <div className="absolute -bottom-16 left-8">
                            <img
                                src={
                                    metadata.avatarUrl || "/default-avatar.png"
                                }
                                alt={metadata.name}
                                className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white"
                            />
                        </div>
                    </div>

                    <div className="pt-20 px-8 pb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {metadata.name}
                        </h1>

                        {metadata.description && (
                            <p className="text-gray-600 mt-3 mb-6">
                                {metadata.description}
                            </p>
                        )}

                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Left column - Tipping Section */}
                            <div className="flex-1 bg-gray-50 p-6 rounded-xl">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    Send a Tip
                                </h2>

                                {/* Quick tip amounts */}
                                <div className="grid grid-cols-4 gap-2 mb-4">
                                    {quickTipAmounts.map((amount) => (
                                        <button
                                            key={amount}
                                            onClick={() =>
                                                setAmountToTip(amount)
                                            }
                                            className={`py-2 rounded-md text-sm font-medium transition ${
                                                amountToTip === amount
                                                    ? "bg-purple-600 text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                        >
                                            {amount} ETH
                                        </button>
                                    ))}
                                </div>

                                {/* Custom amount input */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Custom Amount (ETH)
                                    </label>
                                    <input
                                        type="text"
                                        value={amountToTip}
                                        onChange={handleAmountChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter ETH amount"
                                    />
                                </div>

                                {/* Tip button */}
                                {isConnected ? (
                                    <button
                                        onClick={handleSendTip}
                                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md font-semibold hover:opacity-90 transition"
                                    >
                                        Send {amountToTip} ETH Tip
                                    </button>
                                ) : (
                                    <ConnectButton
                                        label="Connect Wallet to Tip"
                                        showBalance={false}
                                        chainStatus="icon"
                                    />
                                )}

                                {/* Network fee notice */}
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Plus network fee. Tips go directly to the
                                    creator.
                                </p>
                            </div>

                            {/* Right column - Tip History & Info */}
                            <div className="flex-1">
                                {/* Tip History */}
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                        Recent Tips
                                    </h2>

                                    {tipHistory.length > 0 ? (
                                        <div className="space-y-3">
                                            {tipHistory.map((tip, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                                                >
                                                    <div>
                                                        <div className="text-sm font-medium">
                                                            {tip.tipper}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {tip.timestamp}
                                                        </div>
                                                    </div>
                                                    <div className="font-semibold text-purple-600">
                                                        {tip.amount}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-sm">
                                            No tips yet. Be the first to
                                            support!
                                        </p>
                                    )}
                                </div>

                                {/* Creator Info */}
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                        About Creator
                                    </h2>
                                    <div className="text-sm text-gray-600">
                                        <p className="mb-1">
                                            <span className="font-medium">
                                                Wallet:
                                            </span>{" "}
                                            {metadata.owner.slice(0, 6)}...
                                            {metadata.owner.slice(-4)}
                                        </p>
                                        <p className="mb-1">
                                            <span className="font-medium">
                                                Created:
                                            </span>{" "}
                                            {new Date(
                                                metadata.createdAt,
                                            ).toLocaleDateString()}
                                        </p>
                                        <p className="mb-1">
                                            <span className="font-medium">
                                                TipJar Address:
                                            </span>{" "}
                                            {tipJarAddress.slice(0, 6)}...
                                            {tipJarAddress.slice(-4)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TipJarPage;
