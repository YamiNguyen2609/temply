"use client";

import { motion } from "framer-motion";
import { BookOpen, ShieldAlert, Video, FileText } from "lucide-react";
import Link from "next/link";

export default function Tutorials() {
  const guides = [
    { type: 'video', title: "Cách copy bảng tính về Google Drive cá nhân", time: "3 phút" },
    { type: 'video', title: "Tổng quan các tính năng trong Template CRM", time: "10 phút" },
    { type: 'article', title: "Khắc phục lỗi định dạng ngày tháng thường gặp", time: "Đọc 5 phút" },
    { type: 'article', title: "Cách cấp quyền chỉnh sửa cho thành viên nhóm", time: "Đọc 2 phút" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-gray-100 bg-primary/5 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Hướng Dẫn Sử Dụng</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Khám phá các video và bài viết hướng dẫn chi tiết cách sử dụng, tùy chỉnh và bảo mật template của Temply.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Video className="w-6 h-6 mr-2 text-primary" /> Video Mới Nhất
              </h2>
              <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-2xl overflow-hidden relative shadow-lg group cursor-pointer mb-6">
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                  <h3 className="text-white text-xl font-bold mb-2 group-hover:text-primary transition-colors">Hướng dẫn Tự động hóa Báo Cáo Tài Chính 2026</h3>
                  <div className="flex items-center text-gray-300 text-sm">
                    <span>15:20 phút</span>
                    <span className="mx-2">•</span>
                    <span>1.2k lượt xem</span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <Video className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guides.map((guide, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx} 
                    className="flex p-4 border border-gray-100 rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer"
                  >
                    <div className="mt-1 flex-shrink-0">
                      {guide.type === 'video' ? (
                        <Video className="w-5 h-5 text-gray-400" />
                      ) : (
                        <FileText className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="ml-3">
                      <h4 className="text-gray-900 font-semibold mb-1 line-clamp-2">{guide.title}</h4>
                      <p className="text-xs text-gray-500">{guide.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section id="security" className="bg-gray-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 blur-2xl rounded-full"></div>
              <ShieldAlert className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Bảo Mật Nội Dung</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Khi sử dụng các file tải về, để tránh việc bạn nhập nhầm dữ liệu làm hỏng công thức tự động, chúng tôi khuyến cáo bạn nên khóa các ô có chứa công thức.
              </p>
              <ul className="text-sm space-y-3 text-gray-300 mb-6">
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">1</span>
                  Bôi đen vùng muốn khóa
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">2</span>
                  Chuột phải chọn Data {"->"} Protect sheets and ranges
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">3</span>
                  Chỉ định quyền chỉnh sửa cho mình bạn
                </li>
              </ul>
              <button className="w-full py-3 bg-white/10 hover:bg-primary text-white text-sm font-bold rounded-xl transition-colors backdrop-blur-md">
                Đọc bài viết chi tiết
              </button>
            </section>

            <section className="bg-gray-50 border border-gray-100 p-8 rounded-2xl text-center">
              <h3 className="font-bold text-gray-900 mb-2">Bạn cần hỗ trợ thêm?</h3>
              <p className="text-sm text-gray-500 mb-6">Đội ngũ của Temply luôn sẵn sàng giải đáp thắc mắc của bạn.</p>
              <button className="text-primary font-bold hover:underline">
                Liên hệ hỗ trợ
              </button>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
