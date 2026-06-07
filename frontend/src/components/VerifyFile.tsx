import { useState } from "react";
import { FileUploadBox } from "./FileUploadBox";
import { Button } from "./ui/button";
import { CheckCircle2, XCircle, Download } from "lucide-react";
import { Footer } from "./Footer";

interface VerifyFileProps {
  onNavigate: (page: string) => void;
  onShowToast: (type: "success" | "error" | "warning", message: string) => void;
}

type VerificationStatus = "none" | "original" | "tampered";

export function VerifyFile({ onNavigate, onShowToast }: VerifyFileProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState<string>("");
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("none");
  const [timestamp, setTimestamp] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");

  const generateRealHash = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  };

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setVerificationStatus("none");

    const realHash = await generateRealHash(file);
    setFileHash(realHash);
  };

  const handleVerify = async () => {
   if (!selectedFile || !fileHash) {
    onShowToast("error", "No file selected");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:5000/verify", {
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

    setTimestamp(data.timestamp || new Date().toLocaleString());
    setTransactionId("TX-" + Date.now());

    if (data.status === "verified") {
      setVerificationStatus("original");
      onShowToast("success", "File is authentic");
    } else if (data.status === "tampered") {
      setVerificationStatus("tampered");
      onShowToast("error", "File has been modified");
    } else {
      setVerificationStatus("tampered");
      onShowToast("warning", "File not registered");
    }
  } catch (error) {
    console.error(error);
    onShowToast("error", "Backend not reachable");
  }
};



  const handleDownloadCertificate = () => {
    onNavigate("certificate");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors flex flex-col">
      <div className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-['Inter'] text-gray-900 dark:text-white mb-4">
              Verify File Integrity
            </h1>
            <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
              Upload a file to verify its authenticity
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900 border rounded-xl p-8">
              <FileUploadBox
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
              />
            </div>

            {fileHash && (
              <div className="bg-white dark:bg-gray-900 border rounded-xl p-8 space-y-4">
                <h3 className="text-white">Computed SHA-256 Hash</h3>
                <div className="bg-gray-900 p-4 rounded-xl font-mono">
                  <code className="text-[#0BC5EA] break-all">{fileHash}</code>
                </div>
              </div>
            )}

            {fileHash && verificationStatus === "none" && (
              <div className="text-center">
                <Button onClick={handleVerify}>
                  Check Authenticity
                </Button>
              </div>
            )}

            {verificationStatus === "original" && (
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 space-y-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-green-500 rounded-full">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3>File Authentic</h3>
                    <p>No tampering detected.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p>Timestamp</p>
                    <p>{timestamp}</p>
                  </div>
                  <div>
                    <p>Transaction ID</p>
                    <p>{transactionId}</p>
                  </div>
                </div>

                <Button onClick={handleDownloadCertificate}>
                  <Download className="w-5 h-5 mr-2" />
                  Download Certificate
                </Button>
              </div>
            )}

            {verificationStatus === "tampered" && (
              <div className="bg-red-50 border-2 border-red-500 rounded-xl p-8 space-y-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-red-500 rounded-full">
                    <XCircle className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3>File Tampered</h3>
                    <p>Hash mismatch detected.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p>Timestamp</p>
                    <p>{timestamp}</p>
                  </div>
                  <div>
                    <p>Transaction ID</p>
                    <p>{transactionId}</p>
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
