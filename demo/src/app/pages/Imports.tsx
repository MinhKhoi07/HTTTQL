import React, { useState } from "react";
import { IMPORT_HISTORY } from "../data/mockData";
import { Plus, Search, FileText, ArrowRight } from "lucide-react";

export function Imports() {
  const [showNewImport, setShowNewImport] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 p-6 space-y-6 overflow-y-auto relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Nhập hàng hóa</h1>
          <p className="text-slate-500 mt-1 text-sm">Quản lý phiếu nhập hàng từ nhà cung cấp</p>
        </div>
        <button 
          onClick={() => setShowNewImport(true)}
          className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tạo phiếu nhập
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <h2 className="font-semibold text-slate-800">Lịch sử nhập hàng</h2>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm mã phiếu hoặc nhà cung cấp..."
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="px-6 py-4 font-medium">Mã phiếu</th>
                <th className="px-6 py-4 font-medium">Ngày nhập</th>
                <th className="px-6 py-4 font-medium">Nhà cung cấp</th>
                <th className="px-6 py-4 font-medium text-right">Tổng tiền</th>
                <th className="px-6 py-4 font-medium text-center">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {IMPORT_HISTORY.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-emerald-600">
                    {record.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {formatDate(record.date)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    {record.supplier}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-bold text-right">
                    {formatPrice(record.total)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-emerald-600 transition-colors inline-flex items-center justify-center p-1">
                      <FileText className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - Tạo phiếu nhập (Mock) */}
      {showNewImport && (
        <div className="absolute inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col max-h-full overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Tạo phiếu nhập mới</h2>
              <button 
                onClick={() => setShowNewImport(false)}
                className="text-slate-400 hover:text-slate-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
              >
                &times;
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6 bg-slate-50/50">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Nhà cung cấp</label>
                  <select className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                    <option>Chọn nhà cung cấp...</option>
                    <option>NPP Đại Phát</option>
                    <option>Công ty Vinamilk</option>
                    <option>NPP Tuấn Tú</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Ngày nhập</label>
                  <input type="date" className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="font-medium text-slate-800 mb-4 text-sm">Danh sách sản phẩm nhập</h3>
                <div className="flex items-center justify-center py-10 border-2 border-dashed border-slate-200 rounded-lg">
                  <div className="text-center">
                    <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-500 mb-4">Tìm kiếm và thêm sản phẩm vào phiếu nhập</p>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                      Tìm sản phẩm
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-white flex items-center justify-between">
              <div className="text-slate-500 text-sm">
                Tổng cộng: <span className="text-xl font-bold text-emerald-600 ml-2">0 ₫</span>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowNewImport(false)}
                  className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-medium flex items-center hover:bg-emerald-700 transition-colors shadow-sm">
                  Hoàn tất nhập hàng
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
