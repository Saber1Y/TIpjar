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
  const { isConnected } = useAccount();
  //   const [txHash, setTxhash] = useState<string | null>(null);

  //   const [tips, setTips] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    slug: "",
    avatarUrl: "",
    tags: "",
  });

  const handleChangeFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const autoGenerateName = () => {
    return `tipjar.eth-fan-${nanoid(4)}`;
  };

  const handleSubmit = () => {
    const savedName = formData.name || autoGenerateName();

    const newSavedData = {
      ...formData,
      name: savedName,
    };

    console.log("Creating TipJar with:", newSavedData);
    // Here you would call the deploy function with `newTipJarData`

    setIsOpen(false);
  };

  const {
    writeContractAsync: createTipJarWrite,
    status: creatingTipjarStatus,
    error: createError,
  } = useWriteContract();

  const handleCreateTipJar = async (e): Promise<any> => {
    e.preventDefault();

    await createTipJarWrite({
      address: ContractAddress,
      abi: abi,
      functionName: "createTipJar",
      args: [],
    });

    if (createError) {
      toast.error(`Failed to create TipJar: ${createError.message}`, {
        position: "top-center",
      });
      return;
    }
    toast.success(`Created TIpJar Succesfully`, {
      position: "top-center",
    });
    console.log(createTipJarWrite, "TipJar created");
  };

  return (
    <div className="min-h-screen  bg-white">
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

          {/* <div className="mt-16">
            {!isConnected ? (
              <ConnectButton
                label="Start Creating →"
                showBalance={false}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
              />
            ) : (
              <button
                disabled={creatingTipjarStatus === "pending"}
                onClick={handleCreateTipJar}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl shadow-purple-200"
              >
                {creatingTipjarStatus === "pending"
                  ? "Loading..."
                  : "Design Your TipJar"}
                <span className="ml-3 opacity-70 group-hover:opacity-100 transition-opacity">
                  ✨
                </span>
              </button>
            )}
          </div> */}
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


    //modals 

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center mb-2">
              <Dialog.Title className="text-xl font-bold text-gray-800">
                Customize Your TipJar
              </Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X />
              </button>
            </div>

            <input
              name="name"
              placeholder="@creator_name"
              value={formData.name}
              onChange={handleChangeFormData}
              className="w-full border p-2 rounded-md"
            />

            <textarea
              name="description"
              placeholder="Optional message (e.g. 'Buy me a coffee!')"
              value={formData.description}
              onChange={handleChangeFormData}
              className="w-full border p-2 rounded-md resize-none"
            />

            <input
              name="slug"
              placeholder="Custom Slug (e.g. blocky)"
              value={formData.slug}
              onChange={handleChangeFormData}
              className="w-full border p-2 rounded-md"
            />

            <input
              name="avatarUrl"
              placeholder="Profile Image URL"
              value={formData.avatarUrl}
              onChange={handleChangeFormData}
              className="w-full border p-2 rounded-md"
            />

            <input
              name="tags"
              placeholder="Tags (e.g. dev, design, music)"
              value={formData.tags}
              onChange={handleChangeFormData}
              className="w-full border p-2 rounded-md"
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-purple-600 text-white py-2 rounded-md font-semibold hover:bg-purple-700 transition"
            >
              Deploy TipJar
            </button>
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
            <p className="text-gray-600 leading-relaxed">
              Launch your TipJar completely free. We only charge a small 2% fee
              when you receive tips.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-1.5 bg-indigo-600 rounded-full mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Instant Withdrawals
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Access your funds immediately with direct blockchain transfers to
              your wallet.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-1.5 bg-pink-600 rounded-full mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Custom Branding
            </h3>
            <p className="text-gray-600 leading-relaxed">
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
                  onClick={handleCreateTipJar}
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
            <div className="text-gray-600">Tips Received</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-indigo-600 mb-2">$15M+</div>
            <div className="text-gray-600">Total Volume</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-pink-600 mb-2">98%</div>
            <div className="text-gray-600">Happy Creators</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
