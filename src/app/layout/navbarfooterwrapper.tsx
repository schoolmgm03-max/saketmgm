'use client';

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";

export default function NavbarFooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar/>}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}