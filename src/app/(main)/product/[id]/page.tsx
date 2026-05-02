"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, ChevronLeft, Lock, PlayCircle, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useData } from "@/context/DataContext";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { data, loading } = useData();
  const { id } = use(params);
  const [email, setEmail] = useState("");
  const [showSocialPopup, setShowSocialPopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://images8.alphacoders.com/135/1354199.jpeg",
    "https://cdn.wallpapersafari.com/68/11/t9vZSU.jpg",
    "https://img.magnific.com/free-photo/anime-moon-landscape_23-2151645871.jpg?semt=ais_hybrid&w=740&q=80",
    "https://cdn.wallpapersafari.com/74/13/dHXnDl.jpg"
  ];

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Đang tải...</div>;
  }

  const project = data?.project?.find(p => p.slug === id);

  if (!project) {
    return notFound();
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
          <span className="text-gray-900 font-medium">{project.name}</span>
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
              <Image
                src={images[currentImageIndex]}
                alt={project.name}
                fill
                className="object-cover transition-opacity duration-500"
              />

              {/* Navigation arrows */}
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-gray-700 transition-transform hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-gray-700 transition-transform hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Screenshots grid */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`bg-gray-100 rounded-xl aspect-[4/3] border-2 transition-colors cursor-pointer relative overflow-hidden ${i === currentImageIndex ? 'border-primary' : 'border-transparent hover:border-primary/30'}`}
                >
                  <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" />
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
                  {project.complexity}
                </span>
                {project.bestSeller && (
                  <span className="bg-orange-100 text-orange-600 uppercase tracking-wider text-xs font-bold px-3 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {project.name}
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex items-end space-x-4 mb-4">
                {project.pricing > 0 ? (
                  <>
                    <span className="text-4xl font-black text-gray-900">{project.pricing.toLocaleString('vi-VN')}đ</span>
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
                {/* {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))} */}
                <li className="flex items-start pt-2 border-t border-gray-200/60 mt-2">
                  <Lock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0 mr-3" />
                  <span className="text-gray-500 text-sm">Hướng dẫn khóa ô công thức, bảo vệ cấu trúc đi kèm.</span>
                </li>
              </ul>
            </div>

            <div className="mt-auto space-y-4">
              <a href={project.url} target="_blank" className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold text-lg py-4 rounded-xl shadow-sm transition-all flex items-center justify-center transform hover:-translate-y-1 border border-gray-200">
                <PlayCircle className="w-5 h-5 mr-2" />
                Xem Demo
              </a>

              {project.pricing > 0 ? (
                <>
                  <button
                    onClick={() => setShowSocialPopup(true)}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg py-4 rounded-xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center transform hover:-translate-y-1"
                  >
                    Liên Hệ
                  </button>

                  <div className="text-center text-sm text-gray-500 mt-4">
                    Thanh toán an toàn • Nhận file ngay lập tức qua Email
                  </div>

                  <AnimatePresence>
                    {showSocialPopup && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                          onClick={() => setShowSocialPopup(false)}
                        ></motion.div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 20 }}
                          className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative z-10"
                        >
                          <button
                            onClick={() => setShowSocialPopup(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                          >
                            ✕
                          </button>
                          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Liên hệ mua qua</h3>
                          <div className="flex flex-col space-y-3">
                            {data?.social?.map((socialItem) => (
                              <a
                                key={socialItem.id}
                                href={socialItem.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-gray-50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 text-gray-700 font-bold text-lg py-3 rounded-xl border border-gray-200 transition-all flex items-center justify-center"
                              >
                                {socialItem.displayName}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-2">
                  <input
                    type="email"
                    placeholder="Nhập email của bạn..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700"
                  />
                  <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg py-4 rounded-xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center transform hover:-translate-y-1">
                    Nhận miễn phí
                  </button>
                  <div className="text-center text-sm text-gray-500 mt-2">
                    Link tải sẽ được gửi trực tiếp vào email của bạn
                  </div>
                </div>
              )}
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
