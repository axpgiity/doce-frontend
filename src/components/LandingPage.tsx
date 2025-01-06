import React, { useState } from "react";
import Navbar from "./Navbar";
import LandingHero from "./LandingHero";
import InputForm from "./InputForm";
import AppContainer from "./AppContainer";
import { useFileStore } from "../store/fileStore";

interface ApiResponse {
  data: Array<{
    documentation: string;
    file_path: string;
  }>;
  repoPath: string;
  message: string;
}

export default function LandingPage() {
  console.log("LandingPage component rendered");

  const [inputType, setInputType] = useState<"githubLink" | "localPath">(
    "githubLink"
  );
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [genDocPressed, setGenDocPressed] = useState<boolean>(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { files, setFiles } = useFileStore(); // Use Zustand store for files

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #0b0421, #1f2661, #1a0e3b)",
      }}
    >
      <Navbar />

      <main className="container mx-auto px-4 pt-20">
        <LandingHero />

        <div className="max-w-3xl mx-auto mb-16">
          <InputForm
            inputType={inputType}
            input={input}
            loading={loading}
            response={response}
            onInputTypeChange={setInputType}
            onInputChange={setInput}
            setLoading={setLoading}
            setGenDocPressed={setGenDocPressed} // Pass the handler to InputForm
            setResponse={setResponse}
            setError={setError}
            setFiles={setFiles}
          />
        </div>

        {genDocPressed &&
          !loading &&
          (loading || error || files.length > 0) && (
            <div className="backdrop-blur-xl bg-white/5 rounded-xl shadow-2xl border border-white/20 p-6 mb-16">
              <AppContainer
                files={files}
                error={error}
                showContent={true}
                rootPath={response?.repoPath || ""}
              />
            </div>
          )}
      </main>

      <footer className="footer text-center py-6 text-gray-400 border-t border-white/10">
        © 2024 doce.ai by Akshansh & Arkopaul
      </footer>
    </div>
  );
}
