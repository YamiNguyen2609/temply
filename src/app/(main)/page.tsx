"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { useData } from '@/context/DataContext';
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { data, loading } = useData();
  const bestSellers = data?.project?.filter(p => p.project_best_seller);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden bg-gradient-to-b from-primary/5 to-white">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary/10 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-8">
              Mở khóa tiềm năng của bạn bằng <span className="text-primary">Google Sheets</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-gray-600 mb-10 leading-relaxed">
              Trợ thủ đơn giản và hữu ích giúp bạn quản lý, học tập và làm việc hiệu quả hơn mỗi ngày. Tối ưu hóa cuộc sống của bạn chỉ với vài cú click.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/shop" className="bg-primary text-white hover:bg-primary-hover px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-primary/30 flex items-center justify-center transform hover:-translate-y-1">
                Khám phá ngay <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/tutorials" className="bg-white text-gray-900 border border-gray-200 hover:border-primary hover:text-primary px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center">
                Xem hướng dẫn
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Lợi ích khi dùng template của Temply</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Thiết kế tối giản, công năng tối đa. Chúng tôi lo phần kỹ thuật để bạn tập trung vào kết quả.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Zap, title: "Tiết Kiệm Thời Gian", desc: "Không cần tự mày mò học cách viết công thức phức tạp hay thiết kế giao diện." },
              { icon: TrendingUp, title: "Tăng Năng Suất", desc: "Theo dõi số liệu tự động và trực quan, giúp bạn ra quyết định nhanh hơn." },
              { icon: ShieldCheck, title: "An Toàn Dữ Liệu", desc: "Toàn quyền sở hữu file Excel/Sheets của bạn. Hướng dẫn chi tiết cách khóa các ô quan trọng." }
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <benefit.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Bán chạy nhất</h2>
              <p className="text-gray-500">Các mẫu template được yêu thích và đánh giá cao nhất.</p>
            </div>
            <Link href="/shop" className="hidden sm:flex items-center text-primary font-semibold hover:text-primary-hover">
              Xem tất cả <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers?.map((product, idx) => (
              <motion.div
                key={product.project_id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col"
              >
                <div className="aspect-w-16 aspect-h-10 bg-gray-200 relative overflow-hidden h-72">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-gray-200 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={product.project_thumb || '/images/No_Image_Available.svg'}
                      alt={product.project_name}
                      fill
                      loading="eager"
                      className="object-cover"
                    />
                  </div>
                  {product.project_Complexity === 'Complexity_Premium' && (
                    <div className="absolute top-4 right-4 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                      PREMIUM
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">
                    {product.project_category}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.project_name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                    {product.project_description}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      {product.project_pricing > 0 ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-gray-900">{product.project_pricing.toLocaleString('vi-VN')}đ</span>
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-green-500">Miễn phí</span>
                      )}
                    </div>
                    <Link href={`/product/${product.project_id}`} className="bg-gray-100 hover:bg-primary hover:text-white text-gray-900 p-2 rounded-full transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/shop" className="inline-flex items-center text-primary font-semibold hover:text-primary-hover">
              Xem tất cả <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Bạn đã sẵn sàng để nâng cao năng suất?</h2>
          <p className="text-primary-100 text-xl font-medium mb-10 text-white/80">
            Hàng nghìn người đang sử dụng Temply để quản lý công việc và cuộc sống của họ.
          </p>
          <Link href="/shop" className="bg-white text-primary hover:bg-gray-50 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl inline-block transform hover:scale-105">
            Bắt đầu khám phá
          </Link>
        </div>
      </section>
    </div>
  );
}
