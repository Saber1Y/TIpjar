"use client";

import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { nanoid } from "nanoid";

import { UploadToIPFS } from "../../utils/UploadToIPFS";

// wagmi hooks
import { useWriteContract } from "wagmi";

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
  const [previewData, setPreviewData] = useState<typeof formData | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [isCreatingTipJar, setIsCreatingTipJar] = useState<boolean>(false);

  const handleChangeFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    error: createError,
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
      // Upload to IPFS first
      const ipfsHash = await UploadToIPFS(tipJarData);
      setCid(ipfsHash);
      console.log("✅ Uploaded to IPFS with CID:", ipfsHash);
      toast.success("Uploaded to IPFS!");

      // Now show preview with the option to create on-chain
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
        }
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
    } catch (error) {
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
      <ToastContainer />
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Turn Your Passion
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Into Sustainable Creation
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Empower your craft with a modern TipJar that makes receiving support
            simple, secure, and rewarding for both you and your supporters.
          </p>

          <button
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl shadow-purple-200"
            onClick={() => setIsOpen(true)}
          >
            <span className="ml-3 opacity-70 group-hover:opacity-100 transition-opacity">
              Create TipJar
            </span>
          </button>
        </div>
      </section>

      {/* Form Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center mb-2">
              <Dialog.Title className="text-xl font-bold text-gray-800 mb-5">
                Customize Your TipJar
              </Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black hover:text-gray-600"
              >
                <X />
              </button>
            </div>
            <label className="block mb-2">
              <span className="text-sm font-medium text-purple-600">
                Name *
              </span>
              <input
                name="name"
                onChange={handleChangeFormData}
                value={formData.name}
                required
                className="w-full p-2 border rounded mt-1 text-black"
                placeholder="Your TipJar name"
              />
            </label>

            <label className="block mb-2">
              <span className="text-sm font-medium text-purple-600">
                Custom URL Slug (optional)
              </span>
              <input
                name="slug"
                onChange={handleChangeFormData}
                value={formData.slug}
                className="w-full p-2 border rounded mt-1 text-black"
                placeholder="custom-name (will generate from name if empty)"
              />
            </label>

            <label className="block mb-2">
              <span className="text-sm font-medium text-purple-600">
                Description
              </span>
              <textarea
                name="description"
                onChange={handleChangeFormData}
                value={formData.description}
                rows={3}
                className="w-full p-2 border rounded mt-1 text-black"
                placeholder="Tell supporters what you create..."
              />
            </label>

            <label className="block mb-2">
              <span className="text-sm font-medium text-purple-600">
                Image / Avatar URL
              </span>
              <input
                name="avatarUrl"
                onChange={handleChangeFormData}
                value={formData.avatarUrl}
                className="w-full p-2 border rounded mt-1 text-black"
                placeholder="https://example.com/your-image.jpg"
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm font-medium text-purple-600">
                Connected Wallet Address (Owner)
              </span>
              <input
                value={address || "Connect wallet to continue"}
                readOnly
                disabled
                className="w-full p-2 border rounded bg-gray-100 text-gray-600"
              />
            </label>

            <div className="mt-5">
              {!isConnected ? (
                <ConnectButton
                  label="Start Creating →"
                  showBalance={false}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
                />
              ) : (
                <button
                  disabled={creatingTipjarStatus === "pending"}
                  onClick={handleSubmit}
                  className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition"
                >
                  {creatingTipjarStatus === "pending"
                    ? "Loading..."
                    : "Design Your TipJar"}
                  <span className="ml-3 opacity-70 group-hover:opacity-100 transition-opacity">
                    ✨
                  </span>
                </button>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Preview Modal */}
      <Dialog
        open={previewData !== null}
        onClose={() => setPreviewData(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <Dialog.Title className="text-xl font-bold text-gray-800">
                TipJar Preview
              </Dialog.Title>
              <button
                onClick={() => setPreviewData(null)}
                className="text-black hover:text-gray-600"
              >
                <X />
              </button>
            </div>
            {previewData && (
              <div className="space-y-4">
                <img
                  src={previewData.avatarUrl || "/default-avatar.png"}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
                <h3 className="text-lg font-semibold text-center">
                  {previewData.name}
                </h3>
                <p className="text-black text-center">
                  {previewData.description}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Owner:</strong>{" "}
                  {address && `${address.slice(0, 6)}...${address.slice(-4)}`}
                </p>

                <p className="text-sm text-gray-500">
                  <strong>TipJar Link:</strong>{" "}
                  <span className="text-purple-600">
                    {`/tipjar/${previewData.slug}`}
                  </span>
                </p>

                {cid && (
                  <div className="text-xs text-gray-500 break-all">
                    <strong>IPFS CID:</strong> {cid}
                  </div>
                )}

                <div className="flex justify-center pt-4">
                  <button
                    onClick={handleCreateTipJar}
                    disabled={isCreatingTipJar || !cid}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-70"
                  >
                    {isCreatingTipJar
                      ? "Creating TipJar..."
                      : "Create TipJar On-Chain"}
                  </button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-1.5 bg-purple-600 rounded-full mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Zero Setup Fees
            </h3>
            <p className="text-black leading-relaxed">
              Launch your TipJar completely free. We only charge a small 2% fee
              when you receive tips.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-1.5 bg-indigo-600 rounded-full mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Instant Withdrawals
            </h3>
            <p className="text-black leading-relaxed">
              Access your funds immediately with direct blockchain transfers to
              your wallet.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-1.5 bg-pink-600 rounded-full mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Custom Branding
            </h3>
            <p className="text-black leading-relaxed">
              Personalize colors, messages, and layout to match your unique
              style.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              What Are You Creating Today?
            </h2>
            <p className="text-purple-100 text-xl mb-8">
              Join 25,000+ creators already growing with TipJar
            </p>
            <div className="flex justify-center space-x-4">
              {!isConnected ? (
                <ConnectButton
                  label="Get Started - It's Free"
                  showBalance={false}
                  className="!bg-white !text-purple-600 !px-8 !py-4 !rounded-xl !font-bold !text-lg hover:!scale-105 transition-transform"
                />
              ) : (
                <button
                  onClick={() => setIsOpen(true)}
                  className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-lg"
                >
                  Launch Your TipJar Now
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">2.1M+</div>
            <div className="text-black">Tips Received</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-indigo-600 mb-2">$15M+</div>
            <div className="text-black">Total Volume</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-pink-600 mb-2">98%</div>
            <div className="text-black">Happy Creators</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-black">Support</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
