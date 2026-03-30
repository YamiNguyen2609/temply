"use client";

import { motion } from "framer-motion";
import { Copy, Download, LogOut, Settings, CreditCard, ExternalLink } from "lucide-react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";

export default function Account() {
  // Mock data of purchased products
  const purchasedProducts = PRODUCTS.slice(0, 2);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Tài Khoản Của Tôi</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-28">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                  NN
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Nguyễn Nam</h3>
                  <p className="text-xs text-gray-500">nam.nguyen@example.com</p>
                </div>
              </div>

              <nav className="space-y-1">
                <Link href="#" className="flex items-center px-4 py-3 bg-primary/5 text-primary rounded-xl font-medium transition-colors">
                  <Download className="w-5 h-5 mr-3" />
                  Sản phẩm đã mua
                </Link>
                <Link href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors">
                  <Settings className="w-5 h-5 mr-3" />
                  Cài đặt tài khoản
                </Link>
                <Link href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors">
                  <CreditCard className="w-5 h-5 mr-3" />
                  Lịch sử thanh toán
                </Link>
              </nav>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <button className="flex items-center px-4 py-2 text-red-500 hover:bg-red-50 w-full rounded-xl font-medium transition-colors">
                  <LogOut className="w-5 h-5 mr-3" />
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Mẫu Google Sheets Đã Mua</h2>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">2 Sản phẩm</span>
              </div>
              
              <div className="divide-y divide-gray-100">
                {purchasedProducts.map((product, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={product.id} 
                    className="p-8 flex flex-col md:flex-row gap-6 items-start md:items-center hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center text-gray-400">
                      IMG
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">{product.categoryId}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{product.title}</h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-1">Mua ngày: 15/05/2026</p>
                      
                      <div className="flex flex-wrap gap-3">
                        <button className="flex items-center space-x-2 bg-primary text-white hover:bg-primary-hover px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md shadow-primary/20">
                          <ExternalLink className="w-4 h-4" />
                          <span>Mở Bản Gốc</span>
                        </button>
                        <button className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                          <Copy className="w-4 h-4" />
                          <span>Hướng dẫn Copy</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="p-6 bg-gray-50 text-center border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-4">Bạn muốn tìm thêm các template hữu ích khác?</p>
                <Link href="/shop" className="text-primary font-bold hover:underline">
                  Mua sắm ngay
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
