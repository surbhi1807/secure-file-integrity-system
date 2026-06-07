import { useState } from "react";
import { FileUploadBox } from "./FileUploadBox";
import { Button } from "./ui/button";
import { CheckCircle2, Copy } from "lucide-react";
import { Footer } from "./Footer";

interface RegisterFileProps {
  onNavigate: (page: string) => void;
  onShowToast: (type: "success" | "error" | "warning", message: string) => void;
}

export function RegisterFile({ onNavigate, onShowToast }: RegisterFileProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [transactionId, setTransactionId] = useState<string>("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const generateRealHash = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
};


  const handleFileSelect = async (file: File) => {
  setSelectedFile(file);
  setIsRegistered(false);
  setTransactionId("");
  setShowSuccessPopup(false);

  const realHash = await generateRealHash(file);
  setFileHash(realHash);
};


const handleRegister = async () => {
  if (!selectedFile || !fileHash) {
    onShowToast("error", "No file or hash found");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        filename: selectedFile.name,
        filehash: fileHash,
      }),
    });

    const data = await response.json();

    if (data.status === "duplicate") {
      onShowToast("warning", data.message);
      return;
    }

    if (data.status === "tampered") {
      onShowToast("error", data.message);
      return;
    }

    if (data.status === "registered") {
      setTransactionId("TX-" + Date.now());
      setIsRegistered(true);
      setShowSuccessPopup(true);
      onShowToast("success", "File registered successfully");
      return;
    }

    onShowToast("error", "Unexpected response from server");

  } catch (error) {
    console.error(error);
    onShowToast("error", "Backend not reachable");
  }
};
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    onShowToast("success", "Copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors flex flex-col">
      <div className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-['Inter'] text-gray-900 dark:text-white mb-4">
              Register a File on Blockchain
            </h1>
            <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
              Upload a file to generate and store its hash on the blockchain
            </p>
          </div>

          <div className="space-y-8">
            {/* Upload Box */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-8 transition-colors">
              <FileUploadBox
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
              />
            </div>

            {/* Progress Bar */}
            

            {/* Hash Display */}
            {fileHash && (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-8 space-y-4 transition-colors">
                <h3 className="font-['Inter'] text-gray-900 dark:text-white">Generated SHA-256 Hash</h3>
                <div className="bg-gray-900 dark:bg-gray-950 border border-gray-700 dark:border-gray-800 rounded-xl p-4 flex items-center justify-between font-mono">
                  <code className="text-[#0BC5EA] break-all">
                    {fileHash}
                  </code>
                  <button
                    onClick={() => copyToClipboard(fileHash)}
                    aria-label="Copy file hash"
                    className="ml-4 p-2 hover:bg-gray-800 dark:hover:bg-gray-900 rounded transition-colors flex-shrink-0"
                  >
                    <Copy className="w-5 h-5 text-[#0BC5EA]" />
                  </button>
                </div>
                <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
                  SHA-256 Hash of your file
                </p>
              </div>
            )}

            {/* Register Button */}
            {fileHash && !isRegistered &&  (
              <div className="text-center">
                <Button
                  onClick={handleRegister}
                  className="bg-gradient-to-r from-[#2B6CB0] to-[#0BC5EA] hover:from-[#1e4d7e] hover:to-[#0891b2] text-white px-8 py-6 rounded-xl shadow-lg shadow-[#2B6CB0]/30 dark:shadow-[#0BC5EA]/30 font-['Inter'] transition-all"
                >
                  Register File on Blockchain
                </Button>
              </div>
            )}

            {/* Success Popup */}
            {showSuccessPopup && (
              <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-500 dark:border-green-600 rounded-xl p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-500 rounded-full">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="font-['Inter'] text-gray-900 dark:text-white">
                      File Registered Successfully on Blockchain
                    </h3>
                    <p className="font-['Inter'] text-gray-700 dark:text-gray-300">
                      Your file hash has been securely stored on the blockchain.
                    </p>
                    <div className="space-y-2">
                      <p className="font-['Inter'] text-gray-900 dark:text-white">
                        Transaction ID:
                      </p>
                      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-3 flex items-center justify-between">
                        <code className="font-['Inter'] text-gray-700 dark:text-gray-300 break-all">
                          {transactionId.substring(0, 10)}...{transactionId.substring(transactionId.length - 6)}
                        </code>
                        <button
                          onClick={() => copyToClipboard(transactionId)}
                          aria-label="Copy transaction ID"
                          className="ml-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded transition-colors flex-shrink-0"
                        >
                          <Copy className="w-4 h-4 text-[#2B6CB0] dark:text-[#0BC5EA]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
