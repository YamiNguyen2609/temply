"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-3xl font-extrabold text-primary tracking-tight" style={{ color: "var(--color-primary)" }}>
              Temply.
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center bg-gray-50/50 px-6 py-2 rounded-full border border-gray-100/50">
            <Link href="/" className="text-sm text-gray-700 hover:text-primary transition-colors font-medium">Trang Chủ</Link>
            <Link href="/shop" className="text-sm text-gray-700 hover:text-primary transition-colors font-medium">Cửa Hàng</Link>
            <Link href="/tutorials" className="text-sm text-gray-700 hover:text-primary transition-colors font-medium">Hướng Dẫn</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-primary transition-all duration-300 bg-gray-50 hover:bg-primary/10 rounded-full focus:outline-none">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <Link href="/account" className="p-2 text-gray-600 hover:text-primary transition-all duration-300 bg-gray-50 hover:bg-primary/10 rounded-full">
              <User className="w-5 h-5" />
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-primary focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-2">
            <Link href="/" className="block px-4 py-3 text-base font-medium text-gray-800 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors">Trang Chủ</Link>
            <Link href="/shop" className="block px-4 py-3 text-base font-medium text-gray-800 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors">Cửa Hàng</Link>
            <Link href="/tutorials" className="block px-4 py-3 text-base font-medium text-gray-800 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors">Hướng Dẫn</Link>
            <Link href="/account" className="block px-4 py-3 text-base font-medium text-gray-800 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors">Tài Khoản</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
