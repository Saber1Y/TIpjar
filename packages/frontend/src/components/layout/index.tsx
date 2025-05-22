import React from "react";
import { useAccount } from "wagmi";
import { Navbar } from "./navbar";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { isConnected } = useAccount();

    return (
        <div className="min-h-screen bg-white">
            <Navbar isConnected={isConnected} />
            <main>{children}</main>
            <footer className="bg-gray-50 border-t border-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                TipJar
                            </h3>
                            <p className="text-gray-600">
                                Empowering creators with sustainable support
                                through blockchain technology.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">
                                Product
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="/features"
                                        className="text-gray-600 hover:text-purple-600"
                                    >
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/pricing"
                                        className="text-gray-600 hover:text-purple-600"
                                    >
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/security"
                                        className="text-gray-600 hover:text-purple-600"
                                    >
                                        Security
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">
                                Resources
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="/docs"
                                        className="text-gray-600 hover:text-purple-600"
                                    >
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/api"
                                        className="text-gray-600 hover:text-purple-600"
                                    >
                                        API
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/status"
                                        className="text-gray-600 hover:text-purple-600"
                                    >
                                        Status
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">
                                Company
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="/about"
                                        className="text-gray-600 hover:text-purple-600"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/blog"
                                        className="text-gray-600 hover:text-purple-600"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/contact"
                                        className="text-gray-600 hover:text-purple-600"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <p className="text-center text-gray-600">
                            © {new Date().getFullYear()} TipJar. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
