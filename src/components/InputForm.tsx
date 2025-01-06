import React from "react";
import { Github, Folder } from "lucide-react";

interface ApiResponse {
  data: Array<{
    documentation: string;
    file_path: string;
  }>;
  repoPath: string;
  message: string;
}

interface InputFormProps {
  inputType: "githubLink" | "localPath";
  input: string;
  loading: boolean;
  response: ApiResponse | null;
  onInputTypeChange: (type: "githubLink" | "localPath") => void;
  onInputChange: (input: string) => void;
  setLoading: (loading: boolean) => void;
  setGenDocPressed: (genDocPressed: boolean) => void; // to check if App Container should be rendered or not
  setResponse: (response: ApiResponse | null) => void;
  setError: (error: string | null) => void;
  setFiles: (
    files: Array<{ documentation: string; file_path: string }>
  ) => void;
}

export default function InputForm({
  inputType,
  input,
  loading,
  response,
  onInputTypeChange,
  onInputChange,
  setLoading,
  setResponse,
  setError,
  setFiles,
  setGenDocPressed,
}: InputFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFiles([]);
    setError(null);
    setResponse(null); // Reset the response state
    setLoading(true); // Set loading state to true
    setGenDocPressed(true); // Setting Button Pressed as true, hence display app container

    const url = "http://localhost:8080/api/upload";
    const formData = {
      [inputType]: input, // Dynamically send either githubLink or localPath based on inputType
    };

    console.log("Form data:", formData);

    // Validation check
    if (
      inputType === "githubLink" &&
      !input.startsWith("https://github.com/")
    ) {
      setResponse({
        data: [],
        repoPath: "",
        message: "Please enter a valid GitHub repository URL.",
      });
      setLoading(false);
      return;
    } else if (
      inputType === "localPath" &&
      !input.match(/^[a-zA-Z]:\\[\\\S|*\S]?.*$/)
    ) {
      setResponse({
        data: [],
        repoPath: "",
        message: "Please enter a valid local path.",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      });

      const responseData: ApiResponse = await res.json();

      if (res.ok) {
        // If the response is successful, update the state with the response
        console.log("Response data:", responseData); //remove
        setFiles(responseData.data || []); // Update Zustand store with files
        setResponse({
          data: responseData.data || [],
          repoPath: responseData.repoPath || "",
          message:
            responseData.message || "Documentation generated successfully",
        });
      } else {
        // If the response fails, update the state with the error message
        setResponse({
          data: [],
          repoPath: "",
          message: responseData.message || "An error occurred",
        });
        setFiles([]);
      }
    } catch (error) {
      setResponse({
        data: [],
        repoPath: "",
        message: "Cannot connect to the server. Please try again later.",
      });
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex justify-center gap-4">
        <button
          onClick={() => onInputTypeChange("githubLink")}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 ${
            inputType === "githubLink"
              ? "bg-purple-600 text-white"
              : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
          }`}
        >
          <Github className="w-5 h-5" />
          GitHub Repository
        </button>
        <button
          onClick={() => onInputTypeChange("localPath")}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 ${
            inputType === "localPath"
              ? "bg-purple-600 text-white"
              : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
          }`}
        >
          <Folder className="w-5 h-5" />
          Local Path
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder={
            inputType === "githubLink"
              ? "Enter GitHub repository URL"
              : "Enter local path"
          }
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          className="w-full px-6 py-4 bg-gray-800/50 rounded-xl text-lg text-gray-200 
                   placeholder-gray-400 border-2 border-gray-700 focus:border-purple-500
                   focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
        />
        <button
          type="submit"
          disabled={loading || !input}
          className={`w-full px-6 py-4 rounded-xl text-lg font-medium
                     bg-gradient-to-r from-purple-600 to-pink-600 text-white
                     transition-all duration-300 ${
                       loading || !input
                         ? "opacity-50 cursor-not-allowed"
                         : "hover:from-purple-700 hover:to-pink-700 transform hover:-translate-y-0.5"
                     }`}
        >
          {loading ? "Processing..." : "Generate Documentation"}
        </button>
      </form>

      {response && (
        <div
          className={`p-6 rounded-xl ${
            response.data.length > 0
              ? "bg-green-500/20 text-green-200"
              : "bg-red-500/20 text-red-200"
          }`}
        >
          {response.message}
        </div>
      )}
    </div>
  );
}
