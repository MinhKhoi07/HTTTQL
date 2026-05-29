import React, { useState } from "react";
import { PRODUCTS, CATEGORIES } from "../data/mockData";
import { Search, Filter, Download, Plus, AlertTriangle, CheckCircle2 } from "lucide-react";

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.barcode.includes(searchTerm);
    const matchesCategory = activeCategory === "Tất cả" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const lowStockCount = PRODUCTS.filter(p => p.stock <= 20).length;

  return (
    <div className="flex flex-col h-full bg-slate-50 p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Kiểm tra tồn kho</h1>
          <p className="text-slate-500 mt-1 text-sm">Quản lý và theo dõi số lượng hàng hóa trong kho</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </button>
          <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Thêm sản phẩm mới
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Tổng sản phẩm</p>
            <p className="text-2xl font-bold text-slate-800">{PRODUCTS.length}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <Filter className="w-6 h-6" />
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Sắp hết hàng</p>
            <p className="text-2xl font-bold text-rose-600">{lowStockCount}</p>
          </div>
          <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Tình trạng kho</p>
            <p className="text-2xl font-bold text-emerald-600">Tốt</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc mã vạch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="px-6 py-4 font-medium">Mã SP / Barcode</th>
                <th className="px-6 py-4 font-medium">Tên sản phẩm</th>
                <th className="px-6 py-4 font-medium">Danh mục</th>
                <th className="px-6 py-4 font-medium text-right">Giá bán</th>
                <th className="px-6 py-4 font-medium text-right">Tồn kho</th>
                <th className="px-6 py-4 font-medium text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 text-sm">
                    <div className="font-medium text-slate-700">{product.id}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{product.barcode}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    <div className="flex items-center">
                      <img src={product.image} alt="" className="w-8 h-8 rounded bg-slate-100 object-contain mr-3 mix-blend-multiply" />
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 text-right font-medium">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <span className={`font-bold ${product.stock <= 20 ? 'text-rose-600' : 'text-slate-700'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {product.stock > 50 ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        Bình thường
                      </span>
                    ) : product.stock > 20 ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        Cảnh báo
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700">
                        Sắp hết
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProducts.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              Không tìm thấy sản phẩm nào phù hợp với bộ lọc hiện tại.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
