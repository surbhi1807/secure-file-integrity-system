import { Shield, Github, Mail, MapPin } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-[#2B6CB0] to-[#0BC5EA] rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-['Inter'] text-gray-900 dark:text-white">
                SecureFile
              </span>
            </div>
            <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
              Blockchain-powered file integrity verification system.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-['Inter'] text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate("landing")}
                  className="font-['Inter'] text-gray-600 dark:text-gray-400 hover:text-[#2B6CB0] dark:hover:text-[#0BC5EA] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("register")}
                  className="font-['Inter'] text-gray-600 dark:text-gray-400 hover:text-[#2B6CB0] dark:hover:text-[#0BC5EA] transition-colors"
                >
                  Register File
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("verify")}
                  className="font-['Inter'] text-gray-600 dark:text-gray-400 hover:text-[#2B6CB0] dark:hover:text-[#0BC5EA] transition-colors"
                >
                  Verify File
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="font-['Inter'] text-gray-600 dark:text-gray-400 hover:text-[#2B6CB0] dark:hover:text-[#0BC5EA] transition-colors"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-['Inter'] text-gray-900 dark:text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 font-['Inter'] text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                contact@securefile.com
              </li>
              <li className="flex items-center gap-2 font-['Inter'] text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                Mumbai, India
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-['Inter'] text-gray-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-['Inter'] text-gray-600 dark:text-gray-400 hover:text-[#2B6CB0] dark:hover:text-[#0BC5EA] transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
            © 2025 SecureFile. All rights reserved. | Developed by Surbhi Chetan Ghatalia
          </p>
        </div>
      </div>
    </footer>
  );
}
