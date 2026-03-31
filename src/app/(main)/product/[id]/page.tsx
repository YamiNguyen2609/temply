"use client";

import { use } from "react";
import { PRODUCTS } from "@/data/products";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Lock, PlayCircle, Download } from "lucide-react";
import Link from "next/link";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors">Trang Chủ</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/shop" className="hover:text-primary transition-colors">Cửa Hàng</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images/Video Area */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="w-full bg-gray-100 rounded-3xl aspect-[4/3] relative overflow-hidden flex items-center justify-center border border-gray-100 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-gray-200"></div>
              {/* Play Button Mock */}
              <button className="relative z-10 w-20 h-20 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl text-primary transition-transform group-hover:scale-110">
                <PlayCircle className="w-10 h-10" />
              </button>
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                Video Demo
              </div>
            </div>
            
            {/* Screenshots grid */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-xl aspect-[4/3] border border-gray-100 hover:border-primary/30 transition-colors cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200/50 flex items-center justify-center">
                    <span className="text-xs text-gray-400 font-medium">Dashboard {i}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Details Area */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-primary/10 text-primary uppercase tracking-wider text-xs font-bold px-3 py-1 rounded-full">
                  {product.complexity === 'premium' ? 'Premium (Chuyên Sâu)' : 'Basic (Cơ Bản)'}
                </span>
                {product.isBestSeller && (
                  <span className="bg-orange-100 text-orange-600 uppercase tracking-wider text-xs font-bold px-3 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="flex items-end space-x-4 mb-4">
                {product.price > 0 ? (
                  <>
                    <span className="text-4xl font-black text-gray-900">{product.price.toLocaleString('vi-VN')}đ</span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-400 line-through mb-1">{product.originalPrice.toLocaleString('vi-VN')}đ</span>
                    )}
                  </>
                ) : (
                  <span className="text-4xl font-black text-green-500">Miễn phí</span>
                )}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Zap className="w-5 h-5 text-primary mr-2" /> Tính năng chính
              </h3>
              <ul className="space-y-4">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
                <li className="flex items-start pt-2 border-t border-gray-200/60 mt-2">
                  <Lock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0 mr-3" />
                  <span className="text-gray-500 text-sm">Hướng dẫn khóa ô công thức, bảo vệ cấu trúc đi kèm.</span>
                </li>
              </ul>
            </div>

            <div className="mt-auto space-y-4">
              <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg py-5 rounded-xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center transform hover:-translate-y-1">
                {product.price > 0 ? 'Thêm vào giỏ hàng' : 'Tải xuống ngay'}
              </button>
              
              <div className="text-center text-sm text-gray-500">
                Thanh toán an toàn • Nhận file ngay lập tức qua Email
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Icon component that wasn't imported in ProductDetail manually
const Zap = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);
