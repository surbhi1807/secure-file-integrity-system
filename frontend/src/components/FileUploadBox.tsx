import { Upload, File } from "lucide-react";
import { useState } from "react";

interface FileUploadBoxProps {
  onFileSelect: (file: File) => void;
  selectedFile?: File | null;
}

export function FileUploadBox({ onFileSelect, selectedFile }: FileUploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
        isDragging
          ? "border-[#2B6CB0] dark:border-[#0BC5EA] bg-blue-50 dark:bg-cyan-950/20"
          : "border-gray-300 dark:border-gray-700 bg-transparent hover:border-[#2B6CB0] dark:hover:border-[#0BC5EA]"
      }`}
    >
      {selectedFile ? (
        <div className="space-y-4">
          <File className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto" />
          <div>
            <p className="font-['Inter'] text-gray-900 dark:text-white">{selectedFile.name}</p>
            <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
          <button
            onClick={() => document.getElementById("file-input")?.click()}
            className="font-['Inter'] text-[#2B6CB0] dark:text-[#0BC5EA] hover:text-[#1e4d7e] dark:hover:text-[#0891b2] transition-colors"
          >
            Choose different file
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <Upload className="w-16 h-16 text-[#2B6CB0] dark:text-[#0BC5EA] mx-auto" />
          <div>
            <p className="font-['Inter'] text-gray-900 dark:text-white mb-2">
              Drag and drop your file here
            </p>
            <p className="font-['Inter'] text-gray-600 dark:text-gray-400 mb-4">or</p>
            <button
              onClick={() => document.getElementById("file-input")?.click()}
              className="px-6 py-2 bg-gradient-to-r from-[#2B6CB0] to-[#0BC5EA] hover:from-[#1e4d7e] hover:to-[#0891b2] text-white rounded-lg font-['Inter'] transition-all"
            >
              Browse Files
            </button>
          </div>
        </div>
      )}
      <input
        id="file-input"
        type="file"
        onChange={handleFileInput}
        className="hidden"
        aria-label="Upload file"
      />
    </div>
  );
}
