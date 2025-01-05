import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Navbar becomes visible after 50px of scroll
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-all duration-100 ${
        scrolled ? "bg-black/40" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-14 py-0 flex justify-between items-center">
        <div className="text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500">
            doce.ai
          </span>
        </div>
        <div className="flex items-center gap-8">
          <div className="space-x-8">
            <a
              href="#about"
              className="text-gray-300 hover:text-purple-400 transition-colors text-lg"
            >
              About
            </a>
            <a
              href="#documentation"
              className="text-gray-300 hover:text-purple-400 transition-colors text-lg"
            >
              Documentation
            </a>
          </div>
          <img
            src="/src/assets/nobglogo.png"
            alt="Logo"
            className="h-8 sm:h-12 md:h-16 lg:h-20"
          />
        </div>
      </div>
    </nav>
  );
}
