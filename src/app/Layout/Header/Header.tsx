"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold">
          To-Do App
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <nav className={`z-50 md:flex space-x-6 ${isOpen ? "block" : "hidden"} absolute top-16 left-0 w-full bg-blue-700 md:bg-transparent md:static md:w-auto md:block`}>
          <Link href="/todos" className="block p-2 md:inline-block">Tasks</Link>
          <Link href="/admin" className="block p-2 md:inline-block">Admin</Link>
          <Link href="/profile" className="block p-2 md:inline-block">Profile</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
