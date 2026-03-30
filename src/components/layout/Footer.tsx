import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Link href="/" className="text-3xl font-extrabold text-primary tracking-tight" style={{ color: "var(--color-primary)" }}>
              Temply.
            </Link>
            <p className="mt-6 text-gray-500 text-sm leading-relaxed max-w-sm">
              Trợ thủ đơn giản và hữu ích giúp bạn quản lý, học tập và làm việc hiệu quả hơn mỗi ngày thông qua các mẫu Google Sheets được thiết kế chuyên nghiệp.
            </p>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-6">Các sản phẩm</h3>
            <ul className="space-y-4">
              <li><Link href="/shop?category=finance" className="text-sm text-gray-500 hover:text-primary transition-colors">Tài chính cá nhân</Link></li>
              <li><Link href="/shop?category=business" className="text-sm text-gray-500 hover:text-primary transition-colors">Quản lý SME</Link></li>
              <li><Link href="/shop?category=project" className="text-sm text-gray-500 hover:text-primary transition-colors">Quản lý dự án</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-6">Hỗ trợ & Hướng dẫn</h3>
            <ul className="space-y-4">
              <li><Link href="/tutorials" className="text-sm text-gray-500 hover:text-primary transition-colors">Hướng dẫn sử dụng chung</Link></li>
              <li><Link href="/tutorials#security" className="text-sm text-gray-500 hover:text-primary transition-colors">Làm sao để bảo vệ ô công thức?</Link></li>
              <li><Link href="/account" className="text-sm text-gray-500 hover:text-primary transition-colors">Tài khoản của tôi</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Temply. Minimalist templates.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
