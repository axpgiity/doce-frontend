import React, { useState } from "react";
import FileTree from "./FileTree";
import SearchBar from "./SearchBar";
import DocumentViewer from "./DocumentViewer";
import { AlertCircle, FileIcon } from "lucide-react";

interface CustomFile {
  documentation: string;
  file_path: string;
}

interface AppContainerProps {
  files: CustomFile[];
  error: string | null;
  showContent: boolean | false;
  rootPath: string;
}

export default function AppContainer({
  files,
  error,
  showContent,
  rootPath,
}: AppContainerProps) {
  const [selectedFile, setSelectedFile] = useState<CustomFile | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  console.log("AppContainer files prop:", files);

  const handleFileSelect = (file: CustomFile) => {
    setSelectedFile(file);
    console.log("Selected file:", file); // Add this
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // Don't render anything initially
  if (!showContent) {
    return null;
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px] backdrop-blur-lg bg-black/30 rounded-lg border border-white/10">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 mx-auto text-red-400" />
          <h3 className="text-xl font-medium text-red-200">
            Documentation Generation Failed
          </h3>
          <p className="text-red-300/80 max-w-md mx-auto">{error}</p>
        </div>
      </div>
    );
  }

  // If Files Not Found
  if (!files || files.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] backdrop-blur-lg bg-black/30 rounded-lg border border-white/10">
        <div className="text-center space-y-4">
          <FileIcon className="w-16 h-16 mx-auto text-gray-400" />
          <h3 className="text-xl font-medium text-gray-200">
            No Documentation Available
          </h3>
          <p className="text-gray-400">
            Check your directory if Java Files are Available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <div className="w-80 backdrop-blur-lg bg-black/30 rounded-lg border border-white/10">
        <div className="p-4 border-b border-white/10">
          <SearchBar value={searchTerm} onChange={handleSearch} />
        </div>
        <div className="p-2">
          <FileTree
            files={files}
            searchTerm={searchTerm}
            onFileSelect={handleFileSelect}
            rootPath={rootPath}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 backdrop-blur-lg bg-black/30 rounded-lg border border-white/10 p-6">
        <DocumentViewer selectedFile={selectedFile} />
      </div>
    </div>
  );
}
