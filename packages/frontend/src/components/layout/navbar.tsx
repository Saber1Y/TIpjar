import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

interface NavbarProps {
    isConnected: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isConnected }) => {
    return (
        <nav className="bg-white border-b border-gray-100 fixed w-full z-50 top-0">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                TipJar
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/explore"
                            className="text-gray-600 hover:text-purple-600 transition-colors"
                        >
                            Explore
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-600 hover:text-purple-600 transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/docs"
                            className="text-gray-600 hover:text-purple-600 transition-colors"
                        >
                            Docs
                        </Link>
                    </div>

                    {/* Connect Button */}
                    <div className="flex items-center">
                        <ConnectButton
                            label="Connect Wallet"
                            showBalance={false}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};
