import React, { useState } from "react";
import { PRODUCTS, CATEGORIES } from "../data/mockData";
import { Search, Plus, Minus, Trash2, CreditCard, ShoppingBag, ReceiptText, ShoppingCart, ScanLine, X } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";

export function Sales() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [cart, setCart] = useState<{ product: any; quantity: number }[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanInput, setScanInput] = useState("");

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.barcode.includes(searchTerm);
    const matchesCategory = activeCategory === "Tất cả" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInput.trim()) return;

    const product = PRODUCTS.find(p => p.barcode === scanInput.trim() || p.id === scanInput.trim());
    if (product) {
      addToCart(product);
      toast.success(`Đã thêm ${product.name} vào đơn hàng`);
      setScanInput("");
    } else {
      toast.error("Không tìm thấy sản phẩm với mã này!");
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQ = item.quantity + delta;
          return { ...item, quantity: newQ > 0 ? newQ : 1 };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="flex h-full w-full bg-slate-50/50">
      {/* Products Section */}
      <div className="flex-1 flex flex-col h-full overflow-hidden border-r border-slate-200 bg-white">
        {/* Top actions */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm hoặc mã vạch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
              />
            </div>
            <button
              onClick={() => setIsScanning(true)}
              className="p-2.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-xl transition-colors shrink-0 shadow-sm"
              title="Quét mã vạch"
            >
              <ScanLine className="w-5 h-5" />
            </button>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-emerald-300 transition-all cursor-pointer group flex flex-col h-full"
              >
                <div className="aspect-square bg-slate-50 relative p-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {product.stock <= 10 && (
                    <span className="absolute top-2 right-2 bg-rose-100 text-rose-600 text-xs font-bold px-2 py-1 rounded-md">
                      Sắp hết
                    </span>
                  )}
                </div>
                <div className="p-3 border-t border-slate-100 flex flex-col flex-1">
                  <h3 className="text-sm font-medium text-slate-800 line-clamp-2 leading-tight flex-1 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-emerald-600 font-bold">{formatPrice(product.price)}</span>
                    <span className="text-xs text-slate-400">Kho: {product.stock}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <ShoppingBag className="w-16 h-16 mb-4 text-slate-200" />
              <p>Không tìm thấy sản phẩm nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96 bg-white flex flex-col h-full shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)] z-10">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800 flex items-center">
            <ReceiptText className="w-5 h-5 mr-2 text-emerald-600" />
            Đơn hàng hiện tại
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <ShoppingCart className="w-12 h-12 mb-3 text-slate-200" />
              <p className="text-sm">Chưa có sản phẩm nào</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex flex-col gap-2 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-sm font-medium text-slate-800 leading-tight">{item.product.name}</h4>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="p-1 hover:bg-slate-200 transition-colors text-slate-600"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium bg-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="p-1 hover:bg-slate-200 transition-colors text-slate-600"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-semibold text-emerald-600">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 bg-white space-y-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Tạm tính ({cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Chiết khấu</span>
              <span>0 ₫</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Thuế VAT (8%)</span>
              <span>{formatPrice(total * 0.08)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-100 mt-2">
              <span className="font-medium text-slate-700">Tổng cộng</span>
              <span className="text-2xl font-bold text-emerald-600">{formatPrice(total * 1.08)}</span>
            </div>
          </div>

          <button
            disabled={cart.length === 0}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold flex items-center justify-center transition-colors shadow-sm"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            THANH TOÁN
          </button>
        </div>
      </div>

      {/* Scanning Modal */}
      {isScanning && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800 flex items-center">
                <ScanLine className="w-5 h-5 mr-2 text-emerald-600" />
                Quét mã vạch sản phẩm
              </h2>
              <button 
                onClick={() => setIsScanning(false)}
                className="text-slate-400 hover:text-slate-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 border-2 border-emerald-500/30 m-8 rounded-lg"></div>
                <motion.div 
                  animate={{ y: [-60, 60, -60] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }} 
                  className="w-[80%] h-0.5 bg-emerald-500 absolute top-1/2 shadow-[0_0_10px_2px_rgba(16,185,129,0.5)]"
                />
                <p className="text-slate-400 text-sm z-10 bg-slate-900/50 px-3 py-1 rounded-full">Đưa mã vạch vào khu vực này</p>
              </div>
              
              <form onSubmit={handleBarcodeSubmit} className="flex gap-2">
                <input
                  type="text"
                  autoFocus
                  value={scanInput}
                  onChange={(e) => setScanInput(e.target.value)}
                  placeholder="Hoặc nhập thủ công mã vạch..."
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors">
                  Xác nhận
                </button>
              </form>
              
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500 mb-2 font-medium">Gợi ý mã test để thử nghiệm:</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setScanInput("8934567890123")} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded hover:border-emerald-300">Nước khoáng: 8934567890123</button>
                  <button onClick={() => setScanInput("8934567890125")} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded hover:border-emerald-300">Mì Hảo Hảo: 8934567890125</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
