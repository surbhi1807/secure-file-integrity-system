import { Upload, Hash, ShieldCheck, ArrowRight, Lock, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Footer } from "./Footer";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Neon gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-cyan-950/20"></div>
        
        {/* Cyber grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #2B6CB0 1px, transparent 1px),
                            linear-gradient(to bottom, #2B6CB0 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#2B6CB0]/20 dark:bg-[#0BC5EA]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#0BC5EA]/20 dark:bg-[#2B6CB0]/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full">
              <div className="w-2 h-2 bg-[#2B6CB0] dark:bg-[#0BC5EA] rounded-full animate-pulse"></div>
              <span className="font-['Inter'] text-[#2B6CB0] dark:text-[#0BC5EA]">
                Powered by Blockchain Technology
              </span>
            </div>

            {/* Title */}
            <h1 className="font-['Inter'] text-gray-900 dark:text-white max-w-4xl mx-auto">
              Verify Your File's Authenticity with{" "}
              <span className="bg-gradient-to-r from-[#2B6CB0] to-[#0BC5EA] bg-clip-text text-transparent">
                Blockchain Security
              </span>
            </h1>

            {/* Description */}
            <p className="font-['Inter'] text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ensure the integrity of your files with our blockchain-based verification system. 
              Register file hashes immutably and verify authenticity instantly with cryptographic proof.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                onClick={() => onNavigate("register")}
                className="group bg-gradient-to-r from-[#2B6CB0] to-[#0BC5EA] hover:from-[#1e4d7e] hover:to-[#0891b2] text-white px-8 py-6 rounded-xl shadow-lg shadow-[#2B6CB0]/30 dark:shadow-[#0BC5EA]/30 font-['Inter'] transition-all hover:scale-105"
              >
                <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Register File
              </Button>
              <Button
                onClick={() => onNavigate("verify")}
                variant="outline"
                className="group border-2 border-[#2B6CB0] dark:border-[#0BC5EA] text-[#2B6CB0] dark:text-[#0BC5EA] hover:bg-[#2B6CB0] dark:hover:bg-[#0BC5EA] hover:text-white px-8 py-6 rounded-xl font-['Inter'] transition-all hover:scale-105"
              >
                <ShieldCheck className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Verify File
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Three-Step Process Section */}
      <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Inter'] text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
              Three simple steps to secure your files
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="relative group">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all hover:scale-105 hover:border-[#2B6CB0] dark:hover:border-[#0BC5EA]">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-[#2B6CB0] to-[#0BC5EA] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-[#2B6CB0]/30">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                
                {/* Step number */}
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="font-['Inter'] text-[#2B6CB0] dark:text-[#0BC5EA]">Step 1</span>
                </div>
                
                {/* Title */}
                <h3 className="font-['Inter'] text-gray-900 dark:text-white mb-3">
                  Upload
                </h3>
                
                {/* Description */}
                <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
                  Select and upload your file to begin the verification process
                </p>
              </div>

              {/* Arrow connector */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ArrowRight className="w-8 h-8 text-[#2B6CB0] dark:text-[#0BC5EA]" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all hover:scale-105 hover:border-[#2B6CB0] dark:hover:border-[#0BC5EA]">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0BC5EA] to-[#2B6CB0] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-[#0BC5EA]/30">
                  <Hash className="w-8 h-8 text-white" />
                </div>
                
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="font-['Inter'] text-[#0BC5EA] dark:text-[#0BC5EA]">Step 2</span>
                </div>
                
                <h3 className="font-['Inter'] text-gray-900 dark:text-white mb-3">
                  Hash
                </h3>
                
                <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
                  System creates a unique SHA-256 hash of your file
                </p>
              </div>

              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ArrowRight className="w-8 h-8 text-[#0BC5EA] dark:text-[#0BC5EA]" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all hover:scale-105 hover:border-[#2B6CB0] dark:hover:border-[#0BC5EA]">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2B6CB0] to-[#0BC5EA] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-[#2B6CB0]/30">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="font-['Inter'] text-[#2B6CB0] dark:text-[#0BC5EA]">Step 3</span>
                </div>
                
                <h3 className="font-['Inter'] text-gray-900 dark:text-white mb-3">
                  Verify
                </h3>
                
                <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
                  Validate file authenticity against blockchain records
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2B6CB0] to-[#0BC5EA] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-['Inter'] text-gray-900 dark:text-white mb-2">
                Tamper-Proof Verification
              </h3>
              <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
                Blockchain ensures immutable and tamper-proof file records
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0BC5EA] to-[#2B6CB0] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-['Inter'] text-gray-900 dark:text-white mb-2">
                Blockchain-Backed Storage
              </h3>
              <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
                Your file hashes are stored securely on the blockchain
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2B6CB0] to-[#0BC5EA] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-['Inter'] text-gray-900 dark:text-white mb-2">
                Fast, Reliable Results
              </h3>
              <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
                Get instant verification results with high accuracy
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
