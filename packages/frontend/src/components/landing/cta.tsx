import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface CTAProps {
    isConnected: boolean;
    onCreateClick: () => void;
}

export const CTA: React.FC<CTAProps> = ({ isConnected, onCreateClick }) => {
    return (
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
                            />
                        ) : (
                            <button
                                onClick={onCreateClick}
                                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-lg"
                            >
                                Launch Your TipJar Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
