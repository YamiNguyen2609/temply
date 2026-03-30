"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Filter, Search } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES, COMPLEXITIES } from "@/data/categories";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeComplexity, setActiveComplexity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchCategory = activeCategory === 'all' || product.categoryId === activeCategory;
    const matchComplexity = activeComplexity === 'all' || product.complexity === activeComplexity;
    const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchCategory && matchComplexity && matchSearch;
  });

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-28">
            <div className="flex items-center space-x-2 text-gray-900 font-bold mb-6 text-lg">
              <Filter className="w-5 h-5 text-primary" />
              <span>Bộ Lọc</span>
            </div>

            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">Danh Mục</h3>
              <ul className="space-y-2">
                {CATEGORIES.map(category => (
                  <li key={category.id}>
                    <button
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        activeCategory === category.id 
                          ? 'bg-primary/10 text-primary font-bold' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Complexity */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">Độ Phức Tạp</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveComplexity('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      activeComplexity === 'all' 
                        ? 'bg-primary/10 text-primary font-bold' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    Tất cả mức độ
                  </button>
                </li>
                {COMPLEXITIES.map(comp => (
                  <li key={comp.id}>
                    <button
                      onClick={() => setActiveComplexity(comp.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        activeComplexity === comp.id 
                          ? 'bg-primary/10 text-primary font-bold' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {comp.name}
                    </button>
                  </li>
                ))}
              </ul>
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
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={product.id}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col"
                  >
                    <div className="aspect-w-4 aspect-h-3 bg-gray-100 relative overflow-hidden h-48">
                      {/* Image placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-gray-200 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                        <span className="font-semibold text-lg text-gray-500/40">Product Image</span>
                      </div>
                      
                      {product.complexity === 'premium' && (
                        <div className="absolute top-3 right-3 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                          PREMIUM
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1">
                      <div className="text-[10px] font-bold text-primary mb-2 uppercase tracking-wide">
                        {CATEGORIES.find(c => c.id === product.categoryId)?.name || product.categoryId}
                      </div>
                      <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                        <div>
                          {product.price > 0 ? (
                            <div className="flex flex-col">
                              <span className="text-lg font-bold text-gray-900">{product.price.toLocaleString('vi-VN')}đ</span>
                              {product.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString('vi-VN')}đ</span>
                              )}
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-green-500">Miễn phí</span>
                          )}
                        </div>
                        <Link href={`/product/${product.id}`} className="bg-primary text-white p-2 rounded-full transition-transform transform group-hover:-rotate-45 hover:scale-110 shadow-md shadow-primary/30">
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
