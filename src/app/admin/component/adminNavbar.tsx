'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: "Dashboard", path: "/admin" },
  { name: "Contacts", path: "/admin/contacts" },
  { name: "Gallery", path: "/admin/gallery" },
  { name: "News", path: "/admin/news" },
  // { name: "Newsletter", path: "/admin/newsletter" },
  { name: "Testimonials", path: "/admin/testimonials" },
  { name: "Transfer Certificate", path: "/admin/transferCertificate" },
  { name: "Academics", path: "/admin/academics" },
];


export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={30} height={30} />
          <span className="text-xl font-bold text-[#f82f53] capitalize">Admin Panel</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex flex-wrap items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`${pathname === item.path
                    ? 'text-[#f82f53] font-semibold'
                    : 'text-gray-800'
                  } hover:text-[#f82f53] transition-colors`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="bg-[#f82f53] text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </li>
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
                <Link
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block ${pathname === item.path
                      ? 'text-[#f82f53] font-semibold'
                      : 'text-gray-800'
                    } hover:text-[#f82f53] transition-colors`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="bg-[#f82f53] w-full text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
