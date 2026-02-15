"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Management Desk", path: "/principal" },
  {
    name: "Academics",
    path: "/academics",
    children: [
      { name: "affiliation", path: "/academics/affiliation" },
      { name: "fees structure", path: "/academics/feestructure" },
      { name: "book list", path: "/academics/booklist" },
    ],
  },
  {
    name: "Admissions",
    path: "/admissions",
    children: [{ name: "Transfer Certificate (T.C)", path: "/transferCertificate" }],
  },
  { name: "Facilities", path: "/facilities" },
  {
    name: "Gallery",
    path: "/gallery",
    children: [{ name: "Video Gallery", path: "/gallery/videos" }, { name: "Image Gallery", path: "/gallery" }],
  },
  { name: "Contact Us", path: "/contact" },
  { name: "News & Notices", path: "/news" },
  { name: "Mandatory Enclosures", path: "/mandatoryEnclosures" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Mobile dropdown control

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={30} height={30} />
          <span className="text-xl font-bold text-[#f82f53] capitalize">
            saket MGM
          </span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex flex-wrap items-center gap-6 text-sm font-medium relative">
          {navItems.map((item) => (
            <li key={item.name} className="relative group">
              <Link
                href={item.path}
                className={`flex items-center gap-1 ${pathname === item.path
                    ? "text-[#f82f53] font-semibold"
                    : "text-gray-800"
                  } hover:text-[#f82f53] transition-colors`}
              >
                {item.name}
                {item.children && (
                  <ChevronDown size={16} className="mt-[2px]" />
                )}
              </Link>

              {/* Dropdown Menu (Desktop) */}
              {item.children && (
                <ul className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {item.children.map((child) => (
                    <li key={child.name}>
                      <Link
                        href={child.path}
                        className={`block px-4 py-2 text-sm ${pathname === child.path
                            ? "text-[#f82f53] font-semibold"
                            : "text-gray-800"
                          } hover:bg-gray-100 hover:text-[#f82f53]`}
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <div>
                  <div
                    className="flex items-center justify-between"
                    onClick={() =>
                      item.children
                        ? setOpenDropdown(
                          openDropdown === item.name ? null : item.name
                        )
                        : setIsOpen(false)
                    }
                  >
                    <Link
                      href={item.path}
                      className={`block ${pathname === item.path
                          ? "text-[#f82f53] font-semibold"
                          : "text-gray-800"
                        } hover:text-[#f82f53] transition-colors`}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${openDropdown === item.name ? "rotate-180" : ""
                          }`}
                      />
                    )}
                  </div>

                  {/* Mobile Dropdown */}
                  {item.children && openDropdown === item.name && (
                    <ul className="ml-4 mt-1 border-l border-gray-200 pl-3 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <Link
                            href={child.path}
                            onClick={() => setIsOpen(false)}
                            className={`block ${pathname === child.path
                                ? "text-[#f82f53] font-semibold"
                                : "text-gray-800"
                              } hover:text-[#f82f53]`}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
