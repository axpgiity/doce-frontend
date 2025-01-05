import { create } from "zustand";

interface CustomFile {
  documentation: string;
  file_path: string;
}

interface FileStore {
  files: CustomFile[];
  setFiles: (files: CustomFile[]) => void;
}

export const useFileStore = create<FileStore>((set) => ({
  files: typeof window !== "undefined" && localStorage.getItem("files")
    ? JSON.parse(localStorage.getItem("files") || "[]")
    : [],
  setFiles: (files) => {
    console.log("setFiles called with:", files); // remove
    if (typeof window !== "undefined") {
      localStorage.setItem("files", JSON.stringify(files)); // Save to localStorage
    }
    set({ files });
  },
}));
