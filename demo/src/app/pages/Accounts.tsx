import React, { useState } from "react";
import { ACCOUNTS } from "../data/mockData";
import { Search, Plus, Edit, Trash2, Shield, UserCog, UserX } from "lucide-react";

export function Accounts() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAccounts = ACCOUNTS.filter(acc => 
    acc.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    acc.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý tài khoản</h1>
          <p className="text-slate-500 mt-1 text-sm">Quản lý nhân viên và phân quyền hệ thống</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-sm">
          <Plus className="w-5 h-5 mr-2" />
          Thêm tài khoản
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Tổng tài khoản</p>
            <p className="text-2xl font-bold text-slate-800">{ACCOUNTS.length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-4">
            <UserCog className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Đang hoạt động</p>
            <p className="text-2xl font-bold text-slate-800">{ACCOUNTS.filter(a => a.status === 'Hoạt động').length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mr-4">
            <UserX className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Bị khóa</p>
            <p className="text-2xl font-bold text-slate-800">{ACCOUNTS.filter(a => a.status === 'Khóa').length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, username hoặc vai trò..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="px-6 py-4 font-medium">Mã NV</th>
                <th className="px-6 py-4 font-medium">Họ và tên</th>
                <th className="px-6 py-4 font-medium">Tên đăng nhập</th>
                <th className="px-6 py-4 font-medium">Vai trò</th>
                <th className="px-6 py-4 font-medium">Đăng nhập lân cuối</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAccounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{acc.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs mr-3">
                        {acc.fullName.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-slate-800">{acc.fullName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-mono">{acc.username}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      acc.role === "Quản trị viên" 
                        ? "bg-purple-50 text-purple-700" 
                        : acc.role === "Nhân viên kho"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-blue-50 text-blue-700"
                    }`}>
                      {acc.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{acc.lastLogin}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      acc.status === "Hoạt động" 
                        ? "bg-emerald-50 text-emerald-700" 
                        : "bg-rose-50 text-rose-700"
                    }`}>
                      {acc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredAccounts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    Không tìm thấy tài khoản nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
