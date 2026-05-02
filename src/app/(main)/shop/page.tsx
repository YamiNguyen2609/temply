"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Filter, Search } from "lucide-react";
import { useData } from "@/context/DataContext";
import Image from "next/image";

export default function Shop() {
  const { data, loading } = useData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeComplexity, setActiveComplexity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = data?.project?.filter(product => {
    const matchCategory = activeCategory === 'all' || product.categories?.includes(activeCategory);
    const matchComplexity = activeComplexity === 'all' || product.complexity?.includes(activeComplexity);
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchComplexity && matchSearch;
  }) || [];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Cửa Hàng Template</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Khám phá các mẫu bảng tính giúp bạn tối ưu hóa thời gian và năng suất làm việc. Tiết kiệm hàng giờ đồng hồ với các template được thiết kế sẵn.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-28">
            <div className="flex items-center space-x-2 text-gray-900 font-bold mb-6 text-lg">
              <Filter className="w-5 h-5 text-primary" />
              <span>Bộ Lọc</span>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <select
                name="category-filter"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700 cursor-pointer appearance-none"
              >
                <option value="all">Tất cả danh mục</option>
                {data?.category?.map(category => (
                  <option key={category.key} value={category.key}>
                    {category.value}
                  </option>
                ))}
              </select>
              <select
                name="complexity-filter"
                value={activeComplexity}
                onChange={(e) => setActiveComplexity(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700 cursor-pointer appearance-none"
              >
                <option value="all">Tất cả mức độ</option>
                {data?.complexity?.map(comp => (
                  <option key={comp.id} value={comp.value}>
                    {comp.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
              <button
                onClick={() => { setActiveCategory('all'); setActiveComplexity('all'); setSearchQuery(''); }}
                className="mt-6 text-primary font-medium hover:underline"
              >
                Xóa bộ lọc
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    key={product.id}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col"
                  >
                    <div className="aspect-w-4 aspect-h-3 bg-gray-100 relative overflow-hidden h-image">
                      {/* Image placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-gray-200 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                        <Image
                          src={product.thumbnail || '/images/No_Image_Available.svg'}
                          alt={product.name}
                          fill
                          loading="eager"
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {product.complexity === 'Complexity_Premium' && (
                        <div className="absolute top-3 right-3 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                          PREMIUM
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center space-x-2" style={{ flexWrap: "wrap" }}>
                        {product.categories.map(cat => <span key={cat} className="bg-primary font-bold px-2 py-1 rounded-full text-[10px] text-white tracking-wide uppercase mb-2">
                          {cat}
                        </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>

                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                        <div>
                          {product.pricing > 0 ? (
                            <div className="flex flex-col">
                              <span className="text-lg font-bold text-gray-900">{product.pricing.toLocaleString('vi-VN')}đ</span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-green-500">Miễn phí</span>
                          )}
                        </div>
                        <Link href={`/product/${product.slug}`} className="bg-primary text-white p-2 rounded-full transition-transform transform group-hover:-rotate-45 hover:scale-110 shadow-md shadow-primary/30">
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
