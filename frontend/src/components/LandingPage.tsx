"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const LandingPage: React.FC = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  const handleCreateTipJar = () => {
    if (isConnected) {
      router.push("/create");
    }
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

          <div className="mt-16">
            {!isConnected ? (
              <ConnectButton
                label="Start Creating →"
                showBalance={false}
                className="!bg-gradient-to-r !from-purple-600 !to-indigo-600 !px-8 !py-4 !rounded-xl !font-bold !text-lg hover:!scale-105 transition-transform"
              />
            ) : (
              <button
                onClick={handleCreateTipJar}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl shadow-purple-200"
              >
                Design Your TipJar
                <span className="ml-3 opacity-70 group-hover:opacity-100 transition-opacity">
                  ✨
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

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
