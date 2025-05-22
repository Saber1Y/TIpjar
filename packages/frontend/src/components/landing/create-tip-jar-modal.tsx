import React from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Input } from "../shared/input";
import { Textarea } from "../shared/textarea";
import { Button } from "../shared/button";

interface CreateTipJarModalProps {
    isOpen: boolean;
    onClose: () => void;
    isConnected: boolean;
    address: string | undefined;
    formData: {
        name: string;
        description: string;
        slug: string;
        avatarUrl: string;
    };
    onFormChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    onSubmit: () => void;
    isSubmitting: boolean;
}

export const CreateTipJarModal: React.FC<CreateTipJarModalProps> = ({
    isOpen,
    onClose,
    isConnected,
    address,
    formData,
    onFormChange,
    onSubmit,
    isSubmitting,
}) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <Dialog.Title className="text-xl font-bold text-gray-800 mb-5">
                            Customize Your TipJar
                        </Dialog.Title>
                        <button
                            onClick={onClose}
                            className="text-black hover:text-gray-600"
                        >
                            <X />
                        </button>
                    </div>

                    <Input
                        label="Name *"
                        name="name"
                        onChange={onFormChange}
                        value={formData.name}
                        required
                        placeholder="Your TipJar name"
                    />

                    <Input
                        label="Custom URL Slug (optional)"
                        name="slug"
                        onChange={onFormChange}
                        value={formData.slug}
                        placeholder="custom-name (will generate from name if empty)"
                    />

                    <Textarea
                        label="Description"
                        name="description"
                        onChange={onFormChange}
                        value={formData.description}
                        rows={3}
                        placeholder="Tell supporters what you create..."
                    />

                    <Input
                        label="Image / Avatar URL"
                        name="avatarUrl"
                        onChange={onFormChange}
                        value={formData.avatarUrl}
                        placeholder="https://example.com/your-image.jpg"
                    />

                    <Input
                        label="Connected Wallet Address (Owner)"
                        value={address || "Connect wallet to continue"}
                        readOnly
                        disabled
                    />

                    <div className="mt-5">
                        {!isConnected ? (
                            <ConnectButton
                                label="Start Creating →"
                                showBalance={false}
                            />
                        ) : (
                            <Button
                                onClick={onSubmit}
                                isLoading={isSubmitting}
                                fullWidth
                                rightIcon="✨"
                            >
                                {isSubmitting
                                    ? "Loading..."
                                    : "Design Your TipJar"}
                            </Button>
                        )}
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};
