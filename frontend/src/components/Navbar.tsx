"use client";
import Link from "next/link";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white border-b  shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-xl font-bold text-blue-600">TipJar</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/">
              <span className="text-gray-700 hover:text-blue-600">Home</span>
            </Link>
            <Link href="/dashboard">
              <span className="text-gray-700 hover:text-blue-600">
                Dashboard
              </span>
            </Link>
            <ConnectButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link href="/">
            <a className="block text-gray-700 hover:text-blue-600">Home</a>
          </Link>
          <Link href="/dashboard">
            <a className="block text-gray-700 hover:text-blue-600">Dashboard</a>
          </Link>
          <div>
            <ConnectButton />
          </div>
        </div>
      )}
    </nav>
  );
}
