interface CustomFile {
  documentation: string;
  file_path: string;
}

export function getPathParts(filePath: string, rootPath: string): string[] {
  const relativePath = filePath.replace(rootPath, '').replace(/^\\/, '');
  return relativePath.split('\\');
}

export function buildFileTree(files: CustomFile[], rootPath: string) {
  const tree: { [key: string]: any } = {};

  files.forEach(file => {
    const parts = getPathParts(file.file_path, rootPath);
    let current = tree;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        // If it's the last part, store the entire file object
        current[part] = file;
      } else {
        // If it's not the last part, create a new object if it doesn't exist
        current[part] = current[part] || {};
        current = current[part];
      }
    });
  });

  console.log("Built file tree:", tree); // Add this
  return tree;
}