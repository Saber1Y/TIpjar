"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { useWriteContract } from "wagmi";
import { uploadMetadataToIPFS } from "@/utils/ipfs";

// Components
import { Hero } from "./hero";
import { Features } from "./features";
import { Stats } from "./stats";
import { CTA } from "./cta";
import { CreateTipJarModal } from "./create-tip-jar-modal";
import { PreviewModal } from "./preview-modal";
import { Navbar } from "../layout/navbar";

interface LandingPageProps {
    ContractAddress: `0x${string}`;
    abi: any;
}

const LandingPage: React.FC<LandingPageProps> = ({ ContractAddress, abi }) => {
    const { address, isConnected } = useAccount();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        slug: "",
        avatarUrl: "",
    });
    const [previewData, setPreviewData] = useState<typeof formData | null>(
        null,
    );
    const [cid, setCid] = useState<string | null>(null);
    const [isCreatingTipJar, setIsCreatingTipJar] = useState<boolean>(false);

    const handleChangeFormData = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const autoGenerateName = () => {
        return `tipjar.eth-fan-${nanoid(4)}`;
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9\-]/g, "");
    };

    const {
        writeContractAsync: createTipJarWrite,
        status: creatingTipjarStatus,
    } = useWriteContract();

    const handleSubmit = async () => {
        if (!isConnected) {
            toast.error("Please connect your wallet first");
            return;
        }

        const savedName = formData.name || autoGenerateName();
        const slug = formData.slug || generateSlug(savedName);

        if (!savedName) {
            toast.error("Please fill in a name for your TipJar.");
            return;
        }

        const tipJarData = {
            ...formData,
            name: savedName,
            slug,
            owner: address,
            createdAt: new Date().toISOString(),
        };

        setPreviewData({
            ...formData,
            name: savedName,
            slug,
        });

        try {
            const ipfsHash = await uploadMetadataToIPFS(tipJarData);
            setCid(ipfsHash);
            console.log("✅ Uploaded to IPFS with CID:", ipfsHash);
            toast.success("Uploaded to IPFS!");
        } catch (error) {
            console.error("❌ Failed to upload to IPFS:", error);
            toast.error("Upload to IPFS failed.");
            setPreviewData(null);
        }

        setIsOpen(false);
    };

    const handleCreateTipJar = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!cid || !previewData) {
            toast.error("Missing data for creating TipJar");
            return;
        }

        setIsCreatingTipJar(true);

        try {
            const tx = await createTipJarWrite({
                address: ContractAddress,
                abi: abi,
                functionName: "createTipJar",
                args: [previewData.slug, cid],
            });

            toast.success(
                `TipJar created successfully! Transaction: ${tx.slice(0, 10)}...`,
                {
                    position: "top-center",
                },
            );

            // Reset form after successful creation
            setFormData({
                name: "",
                description: "",
                avatarUrl: "",
                slug: "",
            });
            setPreviewData(null);
            setCid(null);
        } catch (error: any) {
            console.error("Error creating TipJar:", error);
            toast.error(`Failed to create TipJar: ${error.message}`, {
                position: "top-center",
            });
        } finally {
            setIsCreatingTipJar(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar isConnected={isConnected} />
            {/* Hero Section */}
            <Hero onCreateClick={() => setIsOpen(true)} />
            {/* Features Section */}
            <Features />
            {/* CTA Section */}
            <CTA
                isConnected={isConnected}
                onCreateClick={() => setIsOpen(true)}
            />
            {/* Stats Section */}
            <Stats />
            {/* Create TipJar Modal */}
            <CreateTipJarModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                isConnected={isConnected}
                address={address}
                formData={formData}
                onFormChange={handleChangeFormData}
                onSubmit={handleSubmit}
                isSubmitting={creatingTipjarStatus === "pending"}
            />
            {/* Preview Modal */}
            <PreviewModal
                isOpen={previewData !== null}
                onClose={() => setPreviewData(null)}
                previewData={previewData}
                address={address}
                cid={cid}
                onCreateClick={handleCreateTipJar}
                isCreating={isCreatingTipJar}
            />
        </div>
    );
};

export default LandingPage;
