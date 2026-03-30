export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  complexity: 'basic' | 'premium';
  image: string;
  features: string[];
  isBestSeller?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'finance-budget',
    title: 'Lập Kế Hoạch Ngân Sách Hàng Tháng',
    description: 'Quản lý thu chi rõ ràng, theo dõi nợ và đặt mục tiêu tiết kiệm một cách dễ dàng. Giao diện trực quan.',
    price: 99000,
    originalPrice: 150000,
    categoryId: 'finance',
    complexity: 'basic',
    image: '/images/products/finance-budget.jpg',
    features: ['Tự động tính toán số dư', 'Biểu đồ trực quan thu/chi', 'Dễ dàng tùy chỉnh danh mục'],
    isBestSeller: true,
  },
  {
    id: 'biz-inventory',
    title: 'Quản Lý Kho Hàng & Đơn Hàng SME',
    description: 'Theo dõi tồn kho theo thời gian thực, quản lý đơn hàng và tự động báo cáo doanh thu.',
    price: 299000,
    originalPrice: 400000,
    categoryId: 'business',
    complexity: 'premium',
    image: '/images/products/biz-inventory.jpg',
    features: ['Cảnh báo tồn kho thấp', 'Tích hợp mini CRM', 'Báo cáo doanh thu đa chiều', 'Bảo mật các ô công thức'],
    isBestSeller: true,
  },
  {
    id: 'pm-gantt',
    title: 'Biểu Đồ Gantt & Theo Dõi Task Kanban',
    description: 'Sắp xếp công việc theo tiến độ thời gian (Gantt) và quản lý trạng thái công việc qua bảng Kanban.',
    price: 199000,
    categoryId: 'project',
    complexity: 'premium',
    image: '/images/products/pm-gantt.jpg',
    features: ['Tự động vẽ Gantt Chart', 'Kéo thả không cần code', 'Chia sẻ tiến độ nhóm'],
    isBestSeller: false,
  },
  {
    id: 'life-habit',
    title: 'Theo Dõi Thói Quen (Habit Tracker) & Lịch Tập Gym',
    description: 'Ghi lại hành trình phát triển cá nhân, theo dõi thói quen hàng ngày và lịch trình tập luyện.',
    price: 0,
    categoryId: 'lifestyle',
    complexity: 'basic',
    image: '/images/products/life-habit.jpg',
    features: ['Tracker 365 ngày', 'Biểu đồ hoàn thành mục tiêu', 'Thiết kế tối giản'],
    isBestSeller: true,
  },
  {
    id: 'mkt-content',
    title: 'Content Calendar & Theo Dõi Chỉ Số Chạy Ads',
    description: 'Lên lịch đăng bài mạng xã hội và phân tích hiệu quả chiến dịch quảng cáo tập trung một nơi.',
    price: 149000,
    categoryId: 'marketing',
    complexity: 'premium',
    image: '/images/products/mkt-content.jpg',
    features: ['Lịch đăng bài trực quan', 'Tính toán ROI, ROAS tự động', 'Mẫu báo cáo khách hàng'],
    isBestSeller: false,
  },
  {
    id: 'finance-retire',
    title: 'Lập Kế Hoạch Nghỉ Hưu Sớm (FIRE)',
    description: 'Công cụ tính toán số tiền cần thiết để tự do tài chính, dự báo dòng tiền 50 năm.',
    price: 199000,
    categoryId: 'finance',
    complexity: 'premium',
    image: '/images/products/finance-retire.jpg',
    features: ['Tính lãi kép tự động', 'Biểu đồ dự báo', 'Chống nhập sai dữ liệu'],
    isBestSeller: false,
  }
];
