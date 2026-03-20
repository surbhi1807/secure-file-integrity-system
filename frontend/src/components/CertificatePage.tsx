import { Shield, Download, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Footer } from "./Footer";

interface CertificatePageProps {
  onNavigate: (page: string) => void;
  onShowToast: (type: "success" | "error" | "warning", message: string) => void;
}

export function CertificatePage({ onNavigate, onShowToast }: CertificatePageProps) {
  const certificateData = {
    fileName: "contract_2024.pdf",
    hash: "a7f8d9e2c1b4a5f6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0",
    status: "Verified",
    transactionId: "0x7f2a8b9c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
    verificationDate: new Date().toLocaleString(),
    digitalSignature: "SHA-256 with RSA Encryption"
  };

  const handleDownloadPDF = () => {
    onShowToast("success", "Certificate downloaded successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors flex flex-col">
      <div className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-['Inter'] text-gray-900 dark:text-white mb-4">
              Verification Certificate
            </h1>
            <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
              Official blockchain verification certificate
            </p>
          </div>

          {/* Certificate Card */}
          <div className="relative bg-white dark:bg-gray-900 border-4 border-[#2B6CB0] dark:border-[#0BC5EA] rounded-2xl shadow-2xl overflow-hidden">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Shield className="w-96 h-96 text-[#2B6CB0]" />
            </div>

            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#2B6CB0] to-[#0BC5EA] p-8 text-white">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <Shield className="w-12 h-12" />
                </div>
                <div>
                  <h2 className="font-['Inter']">
                    File Integrity Certificate
                  </h2>
                  <p className="font-['Inter'] text-white/80">
                    Blockchain Verification System
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative p-8 space-y-6">
              {/* Status Badge */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 dark:bg-green-950/30 border-2 border-green-500 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <span className="font-['Inter'] text-green-700 dark:text-green-400">
                    {certificateData.status}
                  </span>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="space-y-6 bg-gray-50 dark:bg-gray-950 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-['Inter'] text-gray-600 dark:text-gray-400 mb-2">
                      File Name
                    </p>
                    <p className="font-['Inter'] text-gray-900 dark:text-white">
                      {certificateData.fileName}
                    </p>
                  </div>

                  <div>
                    <p className="font-['Inter'] text-gray-600 dark:text-gray-400 mb-2">
                      Verification Date
                    </p>
                    <p className="font-['Inter'] text-gray-900 dark:text-white">
                      {certificateData.verificationDate}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-['Inter'] text-gray-600 dark:text-gray-400 mb-2">
                    SHA-256 Hash
                  </p>
                  <div className="bg-gray-900 dark:bg-black rounded-lg p-4">
                    <code className="font-['Inter'] text-[#0BC5EA] break-all text-sm">
                      {certificateData.hash}
                    </code>
                  </div>
                </div>

                <div>
                  <p className="font-['Inter'] text-gray-600 dark:text-gray-400 mb-2">
                    Blockchain Transaction ID
                  </p>
                  <div className="bg-gray-900 dark:bg-black rounded-lg p-4">
                    <code className="font-['Inter'] text-[#0BC5EA] break-all text-sm">
                      {certificateData.transactionId}
                    </code>
                  </div>
                </div>

                <div>
                  <p className="font-['Inter'] text-gray-600 dark:text-gray-400 mb-2">
                    Digital Signature
                  </p>
                  <p className="font-['Inter'] text-gray-900 dark:text-white">
                    {certificateData.digitalSignature}
                  </p>
                </div>
              </div>

              {/* Verification Statement */}
              <div className="text-center p-6 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <p className="font-['Inter'] text-gray-700 dark:text-gray-300 italic">
                  This certificate confirms that the file has been verified against blockchain records
                  and has not been tampered with. The verification was performed on {certificateData.verificationDate}.
                </p>
              </div>

              {/* Signature */}
              <div className="flex justify-between items-end pt-8 border-t border-gray-200 dark:border-gray-800">
                <div>
                  <p className="font-['Inter'] text-gray-900 dark:text-white mb-2">
                    SecureFile Verification System
                  </p>
                  <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
                    Blockchain-Powered File Integrity
                  </p>
                </div>
                <div className="text-right">
                  <div className="w-32 h-16 border-b-2 border-gray-400 mb-2"></div>
                  <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
                    Digital Signature
                  </p>
                </div>
              </div>

              {/* Download Button */}
              <div className="text-center pt-6">
                <Button
                  onClick={handleDownloadPDF}
                  className="bg-gradient-to-r from-[#2B6CB0] to-[#0BC5EA] hover:from-[#1e4d7e] hover:to-[#0891b2] text-white px-8 py-6 rounded-xl shadow-lg font-['Inter'] transition-all"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Certificate as PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
