"use client";

import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify";

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { nanoid } from "nanoid";

//wagmi hooks
import { useWriteContract } from "wagmi";
// import { writeContract } from "viem/actions";

interface LandingPageProps {
  ContractAddress: `0x${string}`;
  abi: any;
}

const LandingPage: React.FC<LandingPageProps> = ({ ContractAddress, abi }) => {
  const { address, isConnected } = useAccount();
  //   const [txHash, setTxhash] = useState<string | null>(null);

  //   const [tips, setTips] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    slug: "",
    avatarUrl: "",
    // tags: "",
  });
  const [previewData, setPreviewData] = useState<typeof formData | null>(null);

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

  const handleSubmit = () => {
    const savedName = formData.name || autoGenerateName();
    const slug = generateSlug(savedName);

    if (!formData.name && !formData.avatarUrl) {
      toast.error("Please fill in a name or avatar URL.");
      return;
    }

    const newSavedData = {
      ...formData,
      name: savedName,
      slug,
    };

    setPreviewData({
      ...formData,
      name: formData.name || autoGenerateName(),
      slug,
    });

    console.log("Creating TipJar with:", newSavedData);
    setIsOpen(false);
  };

  const {
    writeContractAsync: createTipJarWrite,
    status: creatingTipjarStatus,
    error: createError,
  } = useWriteContract();

  const handleCreateTipJar = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormData({
      name: "",
      description: "",
      avatarUrl: "",
      slug: "",
    //   tags: "",
    });
    setPreviewData(null);

    try {
      await createTipJarWrite({
        address: ContractAddress,
        abi: abi,
        functionName: "createTipJar",
        args: [],
      });
      toast.success(`Created TIpJar Succesfully`, {
        position: "top-center",
      });
    } catch (error) {
      toast.error(`Failed to create TipJar: ${error.message}`, {
        position: "top-center",
      });
    }

    console.log(createTipJarWrite, "TipJar created");
  };

  return (
    <div className="min-h-screen  bg-white">
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

      {/* modals */}

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
                  //   disabled={creatingTipjarStatus === "pending"}
                  onClick={handleSubmit}
                  className="w-full bg-purple-600 text-white py-2 rounded-md font-semibold hover:bg-purple-700 transition"
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
                  className="w-full rounded-md object-cover"
                />
                <h3 className="text-lg font-semibold">{previewData.name}</h3>
                <p className="text-black">{previewData.description}</p>
                {/* <p className="text-sm text-gray-500">
                  <strong>Tags:</strong> {previewData.tags}
                </p> */}
                <p className="text-sm text-gray-500">
                  <strong>Owner:</strong> {address}
                </p>

                <p className="text-sm text-gray-500">
                  <strong>TipJar Link:</strong>{" "}
                  <a
                    href={`/tipjar/${previewData.slug}`}
                    className="text-purple-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`/tipjar/${previewData.slug}`}
                  </a>
                </p>
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
                  //   onClick={handleCreateTipJar}
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
