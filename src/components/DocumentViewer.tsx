import React, { useState, useEffect } from "react";
import { marked } from "marked";

interface DocumentViewerProps {
  selectedFile: {
    documentation: string;
    file_path: string;
  } | null;
}

export default function DocumentViewer({ selectedFile }: DocumentViewerProps) {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    if (selectedFile?.documentation) {
      const convertToHtml = async () => {
        const html = await marked(selectedFile.documentation);
        setHtmlContent(html);
      };
      convertToHtml();
    }
  }, [selectedFile]);

  if (!selectedFile) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-4">📄</div>
          <p>Select a file to view documentation</p>
        </div>
      </div>
    );
  }

  const fileName = selectedFile.file_path.split("\\").pop() || "";

  return (
    <div className="h-full overflow-auto" data-component="document-viewer">
      <div className="border-b border-white/10 pb-4 mb-6">
        <h1 className="text-xl font-semibold text-white">{fileName}</h1>
        <p className="text-sm text-gray-400">{selectedFile.file_path}</p>
      </div>
      <div className="prose prose-invert prose-purple max-w-none">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
}
