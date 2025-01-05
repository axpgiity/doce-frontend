import React from "react";

export default function LandingHero() {
  return (
    <div className="content-wrapper text-center space-y-4 max-w-4xl mx-auto py-16">
      <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-tight">
        <span className="text-white whitespace-nowrap">
          Generate AI-Powered Code
        </span>
        <br />
        <span className="text-white">Documentation</span>
      </h1>
      <p className="text-xl md:text-1.5xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-small">
        Transform your codebase into a comprehensive, intelligent documentation!
      </p>
    </div>
  );
}
