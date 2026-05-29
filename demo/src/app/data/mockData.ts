import { LayoutDashboard, ShoppingCart, Package, ArrowDownToLine, BarChart3, Tags, Boxes, Users } from "lucide-react";

export const PRODUCTS = [
  { id: "P001", name: "Nước khoáng Lavie 500ml", price: 6000, stock: 150, category: "Đồ uống", barcode: "8934567890123", image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?w=200&h=200&fit=crop" },
  { id: "P002", name: "Bánh mì sandwich", price: 15000, stock: 25, category: "Thực phẩm", barcode: "8934567890124", image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=200&h=200&fit=crop" },
  { id: "P003", name: "Mì tôm Hảo Hảo chua cay", price: 4000, stock: 300, category: "Thực phẩm", barcode: "8934567890125", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200&h=200&fit=crop" },
  { id: "P004", name: "Sữa chua Vinamilk", price: 7000, stock: 80, category: "Sữa", barcode: "8934567890126", image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=200&h=200&fit=crop" },
  { id: "P005", name: "Snack khoai tây O'Star", price: 12000, stock: 45, category: "Ăn vặt", barcode: "8934567890127", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop" },
  { id: "P006", name: "Nước ngọt Coca Cola 330ml", price: 10000, stock: 120, category: "Đồ uống", barcode: "8934567890128", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&h=200&fit=crop" },
  { id: "P007", name: "Xúc xích Vissan", price: 18000, stock: 60, category: "Thực phẩm", barcode: "8934567890129", image: "https://images.unsplash.com/photo-1595231712325-9fdefceec599?w=200&h=200&fit=crop" },
  { id: "P008", name: "Kẹo cao su Doublemint", price: 5000, stock: 90, category: "Ăn vặt", barcode: "8934567890130", image: "https://images.unsplash.com/photo-1550867428-138aec9fecfc?w=200&h=200&fit=crop" },
];

export const CATEGORIES = ["Tất cả", "Đồ uống", "Thực phẩm", "Sữa", "Ăn vặt"];

export const IMPORT_HISTORY = [
  { id: "IMP1001", date: "2026-05-27", supplier: "NPP Đại Phát", total: 4500000, status: "Hoàn thành" },
  { id: "IMP1002", date: "2026-05-25", supplier: "Công ty Vinamilk", total: 2100000, status: "Hoàn thành" },
  { id: "IMP1003", date: "2026-05-20", supplier: "NPP Tuấn Tú", total: 8500000, status: "Hoàn thành" },
];

export const NAVIGATION = [
  { name: "Thống kê", path: "/dashboard", icon: BarChart3 },
  { name: "Bán hàng", path: "/", icon: ShoppingCart },
  { name: "Sản phẩm", path: "/products", icon: Boxes },
  { name: "Danh mục", path: "/categories", icon: Tags },
  { name: "Tồn kho", path: "/inventory", icon: Package },
  { name: "Nhập hàng", path: "/imports", icon: ArrowDownToLine },
  { name: "Tài khoản", path: "/accounts", icon: Users },
];

export const CATEGORY_LIST = [
  { id: "C01", name: "Đồ uống", description: "Nước ngọt, nước suối, bia", status: "Hoạt động", productCount: 15 },
  { id: "C02", name: "Thực phẩm", description: "Đồ ăn nhanh, mì tôm, bánh kẹo", status: "Hoạt động", productCount: 42 },
  { id: "C03", name: "Sữa", description: "Sữa tươi, sữa chua, váng sữa", status: "Hoạt động", productCount: 12 },
  { id: "C04", name: "Ăn vặt", description: "Snack, hạt, rong biển", status: "Hoạt động", productCount: 28 },
  { id: "C05", name: "Gia vị", description: "Nước mắm, bột ngọt, tương ớt", status: "Ngừng kinh doanh", productCount: 0 },
];

export const ACCOUNTS = [
  { id: "A01", username: "admin", fullName: "Nguyễn Thanh Hậu", role: "Quản trị viên", status: "Hoạt động", lastLogin: "2026-05-28 08:30" },
  { id: "A02", username: "nhanvien1", fullName: "Trần Thị B", role: "Nhân viên bán hàng", status: "Hoạt động", lastLogin: "2026-05-28 07:15" },
  { id: "A03", username: "nhanvien2", fullName: "Lê Văn C", role: "Nhân viên bán hàng", status: "Khóa", lastLogin: "2026-05-25 14:20" },
  { id: "A04", username: "kho1", fullName: "Phạm Đại D", role: "Nhân viên kho", status: "Hoạt động", lastLogin: "2026-05-28 07:45" },
];

export const REVENUE_DATA = [
  { name: "Thứ 2", revenue: 4500000 },
  { name: "Thứ 3", revenue: 5200000 },
  { name: "Thứ 4", revenue: 3800000 },
  { name: "Thứ 5", revenue: 6100000 },
  { name: "Thứ 6", revenue: 5900000 },
  { name: "Thứ 7", revenue: 8500000 },
  { name: "CN", revenue: 9200000 },
];

export const TOP_PRODUCTS = [
  { name: "Mì tôm Hảo Hảo chua cay", sold: 1250, revenue: 5000000, category: "Thực phẩm" },
  { name: "Nước khoáng Lavie 500ml", sold: 850, revenue: 5100000, category: "Đồ uống" },
  { name: "Nước ngọt Coca Cola 330ml", sold: 620, revenue: 6200000, category: "Đồ uống" },
  { name: "Sữa chua Vinamilk", sold: 430, revenue: 3010000, category: "Sữa" },
  { name: "Xúc xích Vissan", sold: 310, revenue: 5580000, category: "Thực phẩm" },
];
