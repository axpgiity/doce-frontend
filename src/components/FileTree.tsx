import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, FileText, Folder } from "lucide-react";
import { buildFileTree } from "../utils/path";

interface CustomFile {
  documentation: string;
  file_path: string;
}

interface FileTreeProps {
  files: CustomFile[];
  searchTerm: string;
  onFileSelect: (file: CustomFile) => void;
  rootPath: string;
}

interface TreeNode {
  [key: string]: TreeNode | CustomFile;
}

export default function FileTree({
  files,
  searchTerm,
  onFileSelect,
  rootPath,
}: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["/"])
  );
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileTree, setFileTree] = useState<TreeNode>({});

  useEffect(() => {
    if (files.length > 0 && rootPath) {
      const tree = buildFileTree(files, rootPath);
      setFileTree(tree);
    }
  }, [files, rootPath]);

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders); //remove
    console.log("Current expanded folders:", expandedFolders);
    if (newExpanded.has(path)) {
      console.log(`Collapsing folder: ${path}`); //remove
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileClick = (file: CustomFile) => {
    setSelectedFile(file.file_path);
    onFileSelect(file);
  };

  const isCustomFile = (value: any): value is CustomFile => {
    return (
      value &&
      typeof value === "object" &&
      "documentation" in value &&
      "file_path" in value
    );
  };

  const renderTree = (
    treeNode: TreeNode,
    path: string = "",
    level: number = 0
  ) => {
    if (!treeNode || typeof treeNode !== "object") return null;

    const entries = Object.entries(treeNode);
    const filteredEntries = searchTerm
      ? entries.filter(([name]) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : entries;

    return (
      <ul className={`pl-${level > 0 ? "4" : "0"}`}>
        {filteredEntries.map(([name, value]) => {
          const currentPath = `${path}${name}`;
          const isFile = isCustomFile(value);
          const isExpanded = expandedFolders.has(currentPath);
          const isSelected = isFile && value.file_path === selectedFile;

          if (isFile) {
            return (
              <li
                key={currentPath}
                className={`flex items-center py-1.5 px-2 rounded-lg cursor-pointer transition-all duration-200
                          ${
                            isSelected
                              ? "bg-purple-500/30 text-white"
                              : "text-gray-300 hover:bg-white/5 hover:text-white"
                          }`}
                onClick={() => handleFileClick(value)}
              >
                <FileText size={16} className="mr-2 flex-shrink-0" />
                <span className="text-sm truncate">{name}</span>
              </li>
            );
          }

          return (
            <li key={currentPath}>
              <div
                className="flex items-center py-1.5 px-2 rounded-lg cursor-pointer text-gray-300 
                         hover:bg-white/5 hover:text-white transition-all duration-200"
                onClick={() => toggleFolder(currentPath)}
              >
                {isExpanded ? (
                  <ChevronDown size={16} className="mr-1 flex-shrink-0" />
                ) : (
                  <ChevronRight size={16} className="mr-1 flex-shrink-0" />
                )}
                <Folder size={16} className="mr-2 flex-shrink-0" />
                <span className="text-sm truncate">{name}</span>
              </div>
              {isExpanded &&
                renderTree(value as TreeNode, `${currentPath}/`, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="p-2" data-component="file-tree">
      {renderTree(fileTree)}
    </div>
  );
}
