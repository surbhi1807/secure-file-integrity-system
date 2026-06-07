import { useState } from "react";
import { Shield, Target, Lightbulb, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Footer } from "./Footer";

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onShowToast: (type: "success" | "error" | "warning", message: string) => void;
}

export function AboutPage({ onNavigate, onShowToast }: AboutPageProps) {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast("success", "Message sent successfully! We'll get back to you soon.");
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors flex flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-cyan-950/20 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-[#2B6CB0] to-[#0BC5EA] rounded-2xl shadow-lg">
                <Shield className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="font-['Inter'] text-gray-900 dark:text-white mb-4">
              About SecureFile
            </h1>
            <p className="font-['Inter'] text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A blockchain-powered platform ensuring file integrity and authenticity through cryptographic verification
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-[#2B6CB0] to-[#0BC5EA] rounded-xl">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="font-['Inter'] text-gray-900 dark:text-white">
                    Our Mission
                  </h2>
                </div>
                <p className="font-['Inter'] text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Our mission is to provide a secure, transparent, and efficient way to verify file integrity
                  using blockchain technology. We believe that every digital file should have a verifiable
                  proof of authenticity.
                </p>
                <p className="font-['Inter'] text-gray-600 dark:text-gray-400 leading-relaxed">
                  By leveraging the immutability of blockchain, we ensure that once a file hash is registered,
                  it cannot be altered, providing absolute confidence in file verification.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white">✓</span>
                    </div>
                    <span className="font-['Inter'] text-gray-700 dark:text-gray-300">Tamper-proof records</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white">✓</span>
                    </div>
                    <span className="font-['Inter'] text-gray-700 dark:text-gray-300">Instant verification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white">✓</span>
                    </div>
                    <span className="font-['Inter'] text-gray-700 dark:text-gray-300">Blockchain security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-[#2B6CB0] to-[#0BC5EA] rounded-xl">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-['Inter'] text-gray-900 dark:text-white">
                  How It Works
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-950 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 bg-[#2B6CB0] text-white rounded-full flex items-center justify-center mb-4 font-['Inter']">
                  1
                </div>
                <h3 className="font-['Inter'] text-gray-900 dark:text-white mb-3">
                  Upload Your File
                </h3>
                <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
                  Select any file you want to register or verify. Our system supports all file types and sizes.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-950 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 bg-[#0BC5EA] text-white rounded-full flex items-center justify-center mb-4 font-['Inter']">
                  2
                </div>
                <h3 className="font-['Inter'] text-gray-900 dark:text-white mb-3">
                  Generate Unique Hash
                </h3>
                <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
                  We create a SHA-256 hash - a unique fingerprint of your file that changes if even a single bit is altered.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-950 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 bg-[#2B6CB0] text-white rounded-full flex items-center justify-center mb-4 font-['Inter']">
                  3
                </div>
                <h3 className="font-['Inter'] text-gray-900 dark:text-white mb-3">
                  Verify on Blockchain
                </h3>
                <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
                  The hash is stored on the blockchain, creating an immutable record that proves your file's authenticity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Blockchain Matters */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-gray-800">
                <Lock className="w-20 h-20 text-[#2B6CB0] dark:text-[#0BC5EA] mx-auto" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-[#2B6CB0] to-[#0BC5EA] rounded-xl">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="font-['Inter'] text-gray-900 dark:text-white">
                    Why Blockchain Matters
                  </h2>
                </div>
                <div className="space-y-4">
                  <p className="font-['Inter'] text-gray-600 dark:text-gray-400 leading-relaxed">
                    <strong className="text-gray-900 dark:text-white">Immutability:</strong> Once recorded on the blockchain,
                    file hashes cannot be altered or deleted, ensuring permanent proof of authenticity.
                  </p>
                  <p className="font-['Inter'] text-gray-600 dark:text-gray-400 leading-relaxed">
                    <strong className="text-gray-900 dark:text-white">Transparency:</strong> Anyone can verify the authenticity
                    of a file by comparing its hash with the blockchain record.
                  </p>
                  <p className="font-['Inter'] text-gray-600 dark:text-gray-400 leading-relaxed">
                    <strong className="text-gray-900 dark:text-white">Security:</strong> Cryptographic algorithms ensure
                    that the verification process is secure and tamper-proof.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-['Inter'] text-gray-900 dark:text-white mb-4">
                Get in Touch
              </h2>
              <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
                Have questions? We'd love to hear from you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-950 rounded-xl p-8 border border-gray-200 dark:border-gray-800 space-y-6">
              <div>
                <Label htmlFor="name" className="font-['Inter'] text-gray-700 dark:text-gray-300">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="mt-2 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                  required
                />
              </div>

              <div>
                <Label htmlFor="contact-email" className="font-['Inter'] text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="mt-2 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message" className="font-['Inter'] text-gray-700 dark:text-gray-300">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="mt-2 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 min-h-[150px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2B6CB0] to-[#0BC5EA] hover:from-[#1e4d7e] hover:to-[#0891b2] text-white py-6 rounded-xl shadow-lg font-['Inter'] transition-all"
              >
                Send Message
              </Button>
            </form>
          </div>
        </section>

        {/* Developer Credit */}
        <section className="py-12 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
              Developed by <span className="font-['Inter'] text-gray-900 dark:text-white">Surbhi Chetan Ghatalia</span>
            </p>
          </div>
        </section>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
