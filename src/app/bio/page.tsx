"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Camera, 
  MessageSquare, 
  MonitorPlay, 
  ShoppingBag, 
  MessageCircle, 
  Mail, 
  Globe, 
  Video, 
  Users,
  ChevronRight
} from "lucide-react";

const socialLinks = [
  { icon: Video, name: "TikTok", href: "#" },
  { icon: MessageCircle, name: "Zalo", href: "#" },
  { icon: MessageSquare, name: "Facebook", href: "#" },
  { icon: MonitorPlay, name: "YouTube", href: "#" },
  { icon: Camera, name: "Instagram", href: "#" },
  { icon: ShoppingBag, name: "Shopee", href: "#" },
  { icon: Globe, name: "Threads", href: "#" },
  { icon: Users, name: "Group", href: "#" },
];

export default function BioPage() {
  const featuredProducts = [].slice(0, 4); // Only show top 4 on bio

  return (
    <div className="min-h-screen md:h-screen bg-gray-50 flex flex-col md:flex-row overflow-x-hidden md:overflow-hidden">
      
      {/* LEFT PANE (Desktop: Fixed Height, Mobile: Top) */}
      <div className="w-full md:w-[400px] lg:w-[480px] bg-white md:h-screen flex flex-col shadow-sm border-r border-gray-100 z-10">
        
        {/* Banner */}
        <div className="h-48 md:h-64 lg:h-72 relative bg-gradient-to-br from-primary/80 to-[#005f73] shrink-0 overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-8 flex flex-col items-center text-center -mt-16 md:-mt-20 relative z-10 flex-1 justify-center md:pb-12">
          
          {/* Floating Avatar */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border-4 border-white shadow-xl bg-white overflow-hidden shrink-0"
          >
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 font-bold text-lg md:text-xl lg:text-2xl">AVATAR</span>
            </div>
          </motion.div>

          {/* Name & Bio */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-4"
          >
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900">Temply Mocks</h1>
            <p className="text-gray-500 font-medium mt-1">@temply</p>
            <p className="mt-3 text-sm lg:text-base text-gray-600 max-w-sm leading-relaxed hidden sm:block">
              Cung cấp các mẫu Google Sheets tối giản, hữu ích giúp bạn tối ưu hóa công việc, học tập và tài chính cá nhân.
            </p>
          </motion.div>

          {/* Social Grid */}
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-4 gap-3 lg:gap-4 mt-6 lg:mt-8 w-full max-w-[280px]"
          >
            {socialLinks.map((social, idx) => (
              <a 
                key={idx} 
                href={social.href}
                className="flex flex-col items-center justify-center group"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-50 hover:bg-primary/10 rounded-full flex items-center justify-center text-gray-600 hover:text-primary transition-all duration-300 shadow-sm border border-gray-100 group-hover:scale-110">
                  <social.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <span className="text-[10px] text-gray-400 font-medium mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden lg:block">
                  {social.name}
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* RIGHT PANE (Desktop: Centered Content, Mobile: Normal Scroll) */}
      <div className="w-full md:flex-1 p-4 sm:p-6 md:p-8 lg:p-12 pb-24 md:pb-12 max-w-4xl max-w-full md:h-screen md:flex md:flex-col md:justify-center">
        
        {/* Smart Buttons */}
        <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-10 w-full shrink-0">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >
            <Link
              href="/"
              className="relative overflow-hidden w-full flex items-center justify-between bg-gray-900 rounded-2xl p-3 lg:p-5 text-white shadow-xl shadow-gray-900/10 group hover:scale-[1.01] transition-transform bio-shine"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/10 rounded-full flex items-center justify-center mr-3 lg:mr-4">
                  <Globe className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-base lg:text-lg">Truy cập Website Temply</h3>
                  <p className="text-xs lg:text-sm text-gray-300 line-clamp-1">Xem tất cả thư viện mẫu Google Sheets</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 group-hover:text-white transition-colors group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full"
          >
            <a
              href="mailto:contact@temply.com"
              className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-3 lg:p-5 text-gray-900 shadow-sm hover:border-primary/50 group hover:scale-[1.01] transition-all"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center mr-3 lg:mr-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-base lg:text-lg">Hợp tác & Liên hệ</h3>
                  <p className="text-xs lg:text-sm text-gray-500">Gửi email cho chúng tôi</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-300 group-hover:text-primary transition-colors group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-2 lg:mb-4 px-1 md:px-0">
            <h2 className="text-lg lg:text-xl font-bold text-gray-900">Mẫu nổi bật</h2>
            <Link href="/shop" className="text-xs lg:text-sm font-semibold text-primary hover:underline">
              Xem tất cả
            </Link>
          </div>
          
          {/* Horizontal Scroll on Mobile, Grid on Desktop */}
          <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-3 lg:gap-4 pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory hide-scroll">
            {/* {featuredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (idx * 0.1) }}
                className="min-w-[280px] w-[80vw] md:w-auto md:min-w-0 snap-center shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
              >
                <div className="h-40 md:h-24 lg:h-32 bg-gray-100 w-full relative group shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                    Image Placeholder
                  </div>
                  {product.price === 0 && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      MIỄN PHÍ
                    </div>
                  )}
                </div>
                <div className="p-3 lg:p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-sm lg:text-base line-clamp-1 mb-1">{product.title}</h3>
                  <p className="text-xs lg:text-sm text-gray-500 line-clamp-2 md:line-clamp-1 lg:line-clamp-2 flex-1 mb-2 lg:mb-3">{product.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="font-bold text-primary text-sm lg:text-base">
                      {product.price > 0 ? `${product.price.toLocaleString('vi-VN')}đ` : 'Miễn phí'}
                    </div>
                    <Link 
                      href={`/product/${product.id}`}
                      className="px-3 py-1 lg:px-4 lg:py-1.5 bg-gray-900 text-white rounded-full text-xs lg:text-sm font-medium hover:bg-primary transition-colors"
                    >
                      Mua ngay
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))} */}
          </div>
        </div>
        
        {/* Footer Text */}
        <div className="mt-12 text-center text-sm text-gray-400 md:hidden">
          Temply © 2026. Made with simplicity.
        </div>

      </div>
    </div>
  );
}
