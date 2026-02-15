// app/components/Footer.tsx
'use client';

import Link from "next/link";
import { Facebook, Youtube } from "lucide-react";
import { navItems } from "./navbar";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <img src="/logo.png" alt="logo" className="w-12 h-12" />
            <div className="text-2xl font-bold text-[#f82f53] capitalize mt-2">
              saket MGM 
            </div>
            <p className="text-sm text-gray-600 mt-4">
              © {new Date().getFullYear()} Saket MGM School. All rights reserved.
            </p>
          </div>

          {/* Footer Links (Dynamic from navItems) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {navItems.slice(0, 4).map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className="hover:text-[#f82f53] transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Resources
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {navItems.slice(4, 7).map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className="hover:text-[#f82f53] transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Connect
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {navItems.slice(7).map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className="hover:text-[#f82f53] transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/SaketMGMschool" className="text-gray-600 hover:text-[#f82f53] transition">
              <Facebook size={20} />
            </a>
            <a href="https://youtube.com/@saketmgm887" className="text-gray-600 hover:text-[#f82f53] transition">
              <Youtube size={20} />
            </a>
          
          </div>
        </div>
      </div>
    </footer>
  );
}
