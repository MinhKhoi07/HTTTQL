import React from "react";
import { REVENUE_DATA, TOP_PRODUCTS } from "../data/mockData";
import { DollarSign, ShoppingBag, TrendingUp, TrendingDown, Calendar, ArrowUpRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

export function Dashboard() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const totalRevenue = REVENUE_DATA.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="flex flex-col h-full bg-slate-50 p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Thống kê kinh doanh</h1>
          <p className="text-slate-500 mt-1 text-sm">Tổng quan về doanh thu và hoạt động bán hàng</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
          <button className="px-4 py-1.5 text-sm font-medium bg-emerald-50 text-emerald-700 rounded-md">Tuần này</button>
          <button className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md transition-colors">Tháng này</button>
          <button className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md transition-colors">Năm nay</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.5%
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Tổng doanh thu</p>
          <p className="text-3xl font-bold text-slate-800">{formatPrice(totalRevenue)}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <span className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-4 h-4 mr-1" />
              +5.2%
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Tổng đơn hàng</p>
          <p className="text-3xl font-bold text-slate-800">1,245</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="flex items-center text-sm font-medium text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
              <TrendingDown className="w-4 h-4 mr-1" />
              -2.1%
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Doanh thu trung bình/ngày</p>
          <p className="text-3xl font-bold text-slate-800">{formatPrice(totalRevenue / 7)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Biểu đồ doanh thu</h2>
            <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center">
              Xem chi tiết <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs key="defs">
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  key="xaxis"
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  key="yaxis"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000000}M`}
                  dx={-10}
                />
                <Tooltip 
                  key="tooltip"
                  formatter={(value: number) => [formatPrice(value), "Doanh thu"]}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  key="area"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Sản phẩm bán chạy</h2>
          </div>
          <div className="space-y-6">
            {TOP_PRODUCTS.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-amber-100 text-amber-600' : 
                    index === 1 ? 'bg-slate-100 text-slate-600' : 
                    index === 2 ? 'bg-orange-100 text-orange-600' : 'bg-slate-50 text-slate-400'
                  }`}>
                    #{index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 line-clamp-1">{product.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{product.category}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-slate-800">{product.sold}</p>
                  <p className="text-xs text-emerald-600 mt-0.5">đã bán</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            Xem tất cả
          </button>
        </div>
      </div>
    </div>
  );
}
