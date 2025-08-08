import Link from "next/link"
import { Facebook, Send, Youtube, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#283E61] text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">SR Publishing House</h3>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Advancing scientific knowledge through high-quality open access publishing.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Send size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* About us */}
          <div>
            <h4 className="text-lg font-medium mb-4">About us</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Editorial Board
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-medium mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#home" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Language Editing
                </Link>
              </li>
              <li>
                <Link href="#home" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Copyediting
                </Link>
              </li>
              <li>
                <Link href="#home" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Proofreading
                </Link>
              </li>
              <li>
                <Link href="#home" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Submission Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-medium mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#home" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Author Guidelines
                </Link>
              </li>
              <li>
                <Link href="#home" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Peer Review Policy
                </Link>
              </li>
              <li>
                <Link href="#home" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Publishing Ethics
                </Link>
              </li>
              <li>
                <Link href="#home" className="text-gray-300 hover:text-white transition-colors text-sm">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex  justify-between items-center  space-y-2">
            <p className="text-gray-400 text-sm text-center">©2025 SR Publishing House. All rights reserved.</p>
            <p className="text-gray-400 text-xs text-center">
              Website designed and developed by{" "}
              <a
                href="https://apexbart.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                ApexBart Solutions
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
