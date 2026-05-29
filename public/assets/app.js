const PAGE = document.body.dataset.page || "dashboard";

const NAV_ITEMS = [
  { id: "dashboard", label: "Thống kê", href: "index.html", icon: "dashboard" },
  { id: "sales", label: "Bán hàng", href: "sales.html", icon: "cart" },
  { id: "products", label: "Sản phẩm", href: "products.html", icon: "cube" },
  { id: "categories", label: "Danh mục", href: "categories.html", icon: "tags" },
  { id: "inventory", label: "Tồn kho", href: "inventory.html", icon: "boxes" },
  { id: "imports", label: "Nhập hàng", href: "imports.html", icon: "download" },
  { id: "accounts", label: "Tài khoản", href: "accounts.html", icon: "users" }
];

let PRODUCTS = [];
let CATEGORIES = ["Tất cả"];
const IMPORT_HISTORY = [
  { id: "IMP1001", date: "2026-05-27", supplier: "NPP Đại Phát", total: 4500000, status: "Hoàn thành" },
  { id: "IMP1002", date: "2026-05-25", supplier: "Công ty Vinamilk", total: 2100000, status: "Hoàn thành" },
  { id: "IMP1003", date: "2026-05-20", supplier: "NPP Tuấn Tú", total: 8500000, status: "Hoàn thành" }
];

const CATEGORY_LIST = [
  { id: "C01", name: "Đồ uống", description: "Nước ngọt, nước suối, bia", status: "Hoạt động", productCount: 15 },
  { id: "C02", name: "Thực phẩm", description: "Đồ ăn nhanh, mì tôm, bánh kẹo", status: "Hoạt động", productCount: 42 },
  { id: "C03", name: "Sữa", description: "Sữa tươi, sữa chua, váng sữa", status: "Hoạt động", productCount: 12 },
  { id: "C04", name: "Ăn vặt", description: "Snack, hạt, rong biển", status: "Hoạt động", productCount: 28 },
  { id: "C05", name: "Gia vị", description: "Nước mắm, bột ngọt, tương ớt", status: "Ngừng kinh doanh", productCount: 0 }
];

let ACCOUNTS = [];

const REVENUE_DATA = [
  { name: "Thứ 2", revenue: 4500000 },
  { name: "Thứ 3", revenue: 5200000 },
  { name: "Thứ 4", revenue: 3800000 },
  { name: "Thứ 5", revenue: 6100000 },
  { name: "Thứ 6", revenue: 5900000 },
  { name: "Thứ 7", revenue: 8500000 },
  { name: "CN", revenue: 9200000 }
];

const TOP_PRODUCTS = [
  { name: "Mì tôm Hảo Hảo chua cay", sold: 1250, category: "Thực phẩm" },
  { name: "Nước khoáng Lavie 500ml", sold: 850, category: "Đồ uống" },
  { name: "Nước ngọt Coca Cola 330ml", sold: 620, category: "Đồ uống" },
  { name: "Sữa chua Vinamilk", sold: 430, category: "Sữa" },
  { name: "Xúc xích Vissan", sold: 310, category: "Thực phẩm" }
];

const ICONS = {
  dashboard: svg(`<path d="M4 13.5V20h6v-6.5H4Zm8 0V4h6v9.5h-6Zm8 0V10h6v3.5h-6ZM4 4h6v6H4V4Z"/>`),
  cart: svg(`<path d="M6 6h15l-1.5 7.5H8.2L7.5 8H5"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/>`),
  cube: svg(`<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5"/><path d="M12 12v9"/>`),
  tags: svg(`<path d="M4 12V4h8l8 8-8 8-8-8Z"/><circle cx="8" cy="8" r="1.25"/>`),
  boxes: svg(`<path d="m4 8 8-4 8 4-8 4-8-4Z"/><path d="m4 8 8 4 8-4"/><path d="M12 12v8"/>`),
  download: svg(`<path d="M12 3v10"/><path d="m8 9 4 4 4-4"/><path d="M4 17v3h16v-3"/>`),
  users: svg(`<path d="M16 18a4 4 0 0 0-8 0"/><circle cx="12" cy="9" r="4"/><path d="M19 18c0-2.2-1.2-4.1-3-5.1"/><path d="M5 18c0-2.2 1.2-4.1 3-5.1"/>`),
  bell: svg(`<path d="M15 17H9l1-2h4l1 2Z"/><path d="M18 14H6l1.2-1.8c.5-.7.8-1.6.8-2.4V9a4 4 0 0 1 8 0v.8c0 .8.3 1.7.8 2.4L18 14Z"/>`),
  user: svg(`<circle cx="12" cy="8" r="4"/><path d="M5 19a7 7 0 0 1 14 0"/>`),
  search: svg(`<circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/>`),
  filter: svg(`<path d="M4 6h16L14 12v5l-4 2v-7L4 6Z"/>`),
  plus: svg(`<path d="M12 5v14M5 12h14"/>`),
  edit: svg(`<path d="M4 20h16"/><path d="M14.5 3.5l6 6L9 21H3v-6L14.5 3.5Z"/>`),
  trash: svg(`<path d="M4 7h16"/><path d="M7 7V5h10v2"/><path d="M8 7v10m4-10v10m4-10v10"/><path d="M6 7l1 13h10l1-13"/>`),
  receipt: svg(`<path d="M7 3h10v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5V3Z"/><path d="M9 7h6M9 11h6M9 15h4"/>`),
  credit: svg(`<rect x="3" y="6" width="18" height="12" rx="3"/><path d="M3 10h18"/><path d="M7 15h4"/>`),
  scan: svg(`<path d="M4 7V5a1 1 0 0 1 1-1h2M20 7V5a1 1 0 0 0-1-1h-2M4 17v2a1 1 0 0 0 1 1h2M20 17v2a1 1 0 0 1-1 1h-2"/>`),
  close: svg(`<path d="M6 6l12 12M18 6 6 18"/>`),
  arrowUpRight: svg(`<path d="M7 17 17 7"/><path d="M9 7h8v8"/>`),
  alert: svg(`<path d="m12 3 9 16H3L12 3Z"/><path d="M12 9v4"/><circle cx="12" cy="16" r="1"/>`),
  check: svg(`<path d="m5 13 4 4L19 7"/>`),
  shield: svg(`<path d="M12 3 5 6v5c0 5 3.5 8.5 7 10 3.5-1.5 7-5 7-10V6l-7-3Z"/>`),
  badge: svg(`<path d="M12 8v8"/><path d="M8 12h8"/><path d="M12 3l2.2 4.5L19 8l-3.5 3.4.8 4.8L12 14l-4.3 2.2.8-4.8L5 8l4.8-.5L12 3Z"/>`)
};

document.body.innerHTML = `
  <div class="app-shell">
    <aside class="sidebar">
      <a class="brand" href="index.html">
        ${ICONS.badge}
        <span>Thanh Hậu</span>
      </a>
      <nav class="sidebar-nav" data-sidebar-nav>
        ${NAV_ITEMS.map((item) => `
          <a class="nav-link${item.id === PAGE ? " is-active" : ""}" href="${item.href}" data-nav="${item.id}">
            ${ICONS[item.icon]}
            <span>${item.label}</span>
          </a>
        `).join("")}
      </nav>
      <div class="sidebar-footer">
        <a id="auth-action" class="logout-button" href="/login">
          ${svg(`<path d="M10 17H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"/><path d="m14 8 4 4-4 4"/><path d="M18 12H8"/>`)}
          <span>Đăng xuất</span>
        </a>
      </div>
    </aside>
    <section class="content-shell">
      <header class="topbar">
        <div class="topbar-date" data-topbar-date></div>
        <div class="topbar-actions">
          <button class="topbar-button" type="button" aria-label="Thông báo">
            ${ICONS.bell}
            <span class="dot"></span>
          </button>
          <div class="profile-chip">
            <div class="profile-avatar">${ICONS.user}</div>
            <span class="profile-name">Admin</span>
          </div>
        </div>
      </header>
      <main class="page-area" data-page-root></main>
    </section>
  </div>
`;

const pageRoot = document.querySelector("[data-page-root]");
const topbarDate = document.querySelector("[data-topbar-date]");

if (topbarDate) {
  topbarDate.textContent = formatLongDate(new Date());
}

const state = {
  salesSearch: "",
  salesCategory: "Tất cả",
  salesCart: [],
  productSearch: "",
  productCategory: "Tất cả",
  categorySearch: "",
  inventorySearch: "",
  inventoryCategory: "Tất cả",
  importSearch: "",
  accountSearch: "",
  importModalOpen: false,
  scanModalOpen: false,
  period: "Tuần này"
};

// Load initial data from backend and then render
async function loadInitialData() {
  try {
    const pRes = await fetch('/api/products');
    const pJson = await pRes.json();
    PRODUCTS = Array.isArray(pJson.data) ? pJson.data.map((p) => ({
      id: String(p.id),
      name: p.name,
      price: Number(p.price),
      stock: Number(p.stock),
      category: p.category || 'Khác',
      barcode: p.barcode,
      image: ''
    })) : [];

    const cRes = await fetch('/api/categories');
    const cJson = await cRes.json();
    if (Array.isArray(cJson.data)) {
      CATEGORIES = ['Tất cả', ...cJson.data.map((c) => c.name)];
    }

    const aRes = await fetch('/api/accounts');
    const aJson = await aRes.json();
    ACCOUNTS = Array.isArray(aJson.data) ? aJson.data.map((a) => ({
      id: String(a.id),
      username: a.username,
      fullName: a.fullName,
      role: a.role,
      status: a.status === 1 ? 'Hoạt động' : 'Khóa',
      lastLogin: ''
    })) : [];
  } catch (err) {
    // keep defaults if backend unavailable
    console.warn('Failed to load initial data', err);
  }

  renderPage();
}

loadInitialData();

// Attach auth action handler: call logout API then redirect to /login
function setupAuthAction() {
  const el = document.getElementById('auth-action');
  if (!el) return;
  el.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.warn('Logout failed', err);
    }
    window.location.href = '/login';
  });
}

setupAuthAction();

function renderPage() {
  if (!pageRoot) {
    return;
  }

  if (PAGE === "dashboard") {
    pageRoot.innerHTML = renderDashboard();
    bindDashboard();
    return;
  }

  if (PAGE === "sales") {
    pageRoot.innerHTML = renderSales();
    bindSales();
    return;
  }

  if (PAGE === "products") {
    pageRoot.innerHTML = renderProducts();
    bindProducts();
    return;
  }

  if (PAGE === "categories") {
    pageRoot.innerHTML = renderCategories();
    bindCategories();
    return;
  }

  if (PAGE === "inventory") {
    pageRoot.innerHTML = renderInventory();
    bindInventory();
    return;
  }

  if (PAGE === "imports") {
    pageRoot.innerHTML = renderImports();
    bindImports();
    return;
  }

  if (PAGE === "accounts") {
    pageRoot.innerHTML = renderAccounts();
    bindAccounts();
    return;
  }

  pageRoot.innerHTML = renderDashboard();
  bindDashboard();
}

function renderDashboard() {
  const totalRevenue = REVENUE_DATA.reduce((sum, item) => sum + item.revenue, 0);
  const avgRevenue = Math.round(totalRevenue / REVENUE_DATA.length);
  const topProductMarkup = TOP_PRODUCTS.map((product, index) => `
    <div class="top-product">
      <div class="row-actions" style="gap:14px; justify-content:flex-start;">
        <div class="rank-pill ${index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : ""}">#${index + 1}</div>
        <div>
          <div style="font-weight:700; color:#243247;">${escapeHtml(product.name)}</div>
          <div class="muted" style="font-size:0.84rem; margin-top:3px;">${escapeHtml(product.category)}</div>
        </div>
      </div>
      <div style="text-align:right;">
        <div style="font-weight:800; color:#1f2b3f;">${formatNumber(product.sold)}</div>
        <div class="positive" style="font-size:0.82rem; margin-top:3px;">đã bán</div>
      </div>
    </div>
  `).join("");

  return `
    <div class="dashboard-page">
      <div class="content-hero">
        <div>
          <h1 class="page-title">Thống kê kinh doanh</h1>
          <p class="page-subtitle">Tổng quan về doanh thu và hoạt động bán hàng</p>
        </div>
        <div class="segmented" data-period-group>
          ${["Tuần này", "Tháng này", "Năm nay"].map((label) => `<button type="button" class="${label === state.period ? "is-active" : ""}" data-period="${label}">${label}</button>`).join("")}
        </div>
      </div>

      <section class="stats-grid">
        ${renderStatCard("Tổng doanh thu", formatCurrency(totalRevenue), "+12.5%", "positive", "green", ICONS.dashboard)}
        ${renderStatCard("Tổng đơn hàng", "1,245", "+5.2%", "positive", "blue", ICONS.cart)}
        ${renderStatCard("Doanh thu trung bình/ngày", formatCurrency(avgRevenue), "-2.1%", "negative", "purple", ICONS.download)}
      </section>

      <section class="two-column">
        <article class="surface chart-card">
          <div class="chart-head">
            <h2>Biểu đồ doanh thu</h2>
            <a class="chart-link" href="products.html">Xem chi tiết ${ICONS.arrowUpRight}</a>
          </div>
          <div class="chart-frame">
            ${buildAreaChart(REVENUE_DATA)}
          </div>
        </article>

        <article class="surface top-products-card">
          <div class="top-products-head"><h2>Sản phẩm bán chạy</h2></div>
          <div>${topProductMarkup}</div>
          <a class="btn btn-ghost" href="products.html" style="width:100%; margin-top:10px;">Xem tất cả</a>
        </article>
      </section>
    </div>
  `;
}

function renderSales() {
  const filteredProducts = filterProducts(state.salesSearch, state.salesCategory);
  const categoryButtons = CATEGORIES.map((label) => `<button type="button" class="chip ${label === state.salesCategory ? "is-active" : ""}" data-sales-category="${label}">${label}</button>`).join("");
  const productCards = filteredProducts.map((product) => `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-media">
        <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" />
        ${product.stock <= 10 ? '<span class="low-stock">Sắp hết</span>' : ""}
      </div>
      <div class="product-body">
        <div class="product-name">${escapeHtml(product.name)}</div>
        <div class="product-footer">
          <div class="price">${formatCurrency(product.price)}</div>
          <div class="stock">Kho: ${product.stock}</div>
        </div>
      </div>
    </article>
  `).join("");

  const cartTotal = state.salesCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = state.salesCart.reduce((sum, item) => sum + item.quantity, 0);
  const cartMarkup = state.salesCart.length === 0 ? `
    <div class="empty-cart">
      ${svg(`<path d="M6 6h15l-1.5 7.5H8.2L7.5 8H5"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/>`, 56, 56)}
      <div>Chưa có sản phẩm nào</div>
    </div>
  ` : state.salesCart.map((item) => `
    <div class="cart-item">
      <div class="cart-item-head">
        <div class="cart-item-name">${escapeHtml(item.product.name)}</div>
        <button type="button" class="delete-button" data-remove-item="${item.product.id}">${ICONS.trash}</button>
      </div>
      <div class="row-actions" style="justify-content:space-between;">
        <div class="qty-controls">
          <button type="button" data-qty-minus="${item.product.id}">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-qty-plus="${item.product.id}">+</button>
        </div>
        <div class="price">${formatCurrency(item.product.price * item.quantity)}</div>
      </div>
    </div>
  `).join("");

  return `
    <div class="sales-page">
      <div class="content-hero">
        <div>
          <h1 class="page-title">Bán hàng</h1>
          <p class="page-subtitle">Chọn sản phẩm, quét mã và tính tiền ngay trên một màn hình</p>
        </div>
      </div>

      <section class="two-column" style="align-items:start;">
        <article class="surface">
          <div class="table-toolbar">
            <div class="search">
              ${ICONS.search}
              <input type="text" placeholder="Tìm kiếm sản phẩm hoặc mã vạch..." value="${escapeAttr(state.salesSearch)}" data-sales-search />
            </div>
            <div class="button-row">
              <button type="button" class="btn btn-soft" data-open-scan>${ICONS.scan}<span>Quét mã</span></button>
            </div>
          </div>
          <div class="surface-body">
            <div class="category-chips">${categoryButtons}</div>
            <div class="cards-grid" style="margin-top:18px;">${productCards || renderEmptyState("Không tìm thấy sản phẩm nào")}</div>
          </div>
        </article>

        <aside class="cart-shell surface">
          <div class="cart-head">${ICONS.receipt}<span>Đơn hàng hiện tại</span></div>
          <div class="cart-list">${cartMarkup}</div>
          <div class="cart-summary">
            <div class="summary-row"><span>Tạm tính (${cartCount} sản phẩm)</span><span>${formatCurrency(cartTotal)}</span></div>
            <div class="summary-row"><span>Chiết khấu</span><span>0 ₫</span></div>
            <div class="summary-row"><span>Thuế VAT (8%)</span><span>${formatCurrency(cartTotal * 0.08)}</span></div>
            <div class="summary-row total"><span>Tổng cộng</span><span class="sum">${formatCurrency(cartTotal * 1.08)}</span></div>
            <button class="checkout-button${state.salesCart.length > 0 ? " is-ready" : ""}" type="button" data-checkout-button ${state.salesCart.length === 0 ? "disabled" : ""}>${ICONS.credit}<span>THANH TOÁN</span></button>
          </div>
        </aside>
      </section>
    </div>
    ${state.scanModalOpen ? renderScanModal() : ""}
  `;
}

function renderProducts() {
  const filteredProducts = filterProducts(state.productSearch, state.productCategory);
  return `
    <div class="table-page">
      <div class="content-hero">
        <div>
          <h1 class="page-title">Quản lý sản phẩm</h1>
          <p class="page-subtitle">Quản lý thông tin, giá cả và mã vạch sản phẩm</p>
        </div>
        <button class="btn btn-primary" type="button">${ICONS.plus}<span>Thêm sản phẩm mới</span></button>
      </div>
      <article class="surface">
        <div class="table-toolbar">
          <div class="search" style="max-width: 420px;">
            ${ICONS.search}
            <input type="text" placeholder="Tìm kiếm theo tên hoặc mã vạch..." value="${escapeAttr(state.productSearch)}" data-product-search />
          </div>
          <div class="filter-actions">
            <select data-product-category>
              ${CATEGORIES.map((category) => `<option value="${category}" ${category === state.productCategory ? "selected" : ""}>${category}</option>`).join("")}
            </select>
            <button class="btn btn-ghost" type="button">${ICONS.filter}<span>Lọc thêm</span></button>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Mã / Mã vạch</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá bán</th>
                <th>Tồn kho</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${filteredProducts.map((product) => `
                <tr>
                  <td><img class="thumb" src="${product.image}" alt="${escapeHtml(product.name)}" /></td>
                  <td><div class="id-stack"><strong>${product.id}</strong><span class="muted" style="font-size:0.86rem;">${product.barcode}</span></div></td>
                  <td><strong>${escapeHtml(product.name)}</strong></td>
                  <td><span class="category-pill">${product.category}</span></td>
                  <td><span class="price">${formatCurrency(product.price)}</span></td>
                  <td><span class="status-pill ${product.stock > 20 ? "blue" : product.stock > 0 ? "warning" : "danger"}">${product.stock}</span></td>
                  <td>
                    <div class="row-actions">
                      <button type="button" class="icon-button">${ICONS.edit}</button>
                      <button type="button" class="icon-button">${ICONS.trash}</button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  `;
}

function renderCategories() {
  const filteredCategories = CATEGORY_LIST.filter((item) => {
    const query = state.categorySearch.trim().toLowerCase();
    return !query || item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
  });

  return `
    <div class="table-page">
      <div class="content-hero">
        <div>
          <h1 class="page-title">Quản lý danh mục</h1>
          <p class="page-subtitle">Quản lý và phân loại các nhóm sản phẩm</p>
        </div>
        <button class="btn btn-primary" type="button">${ICONS.plus}<span>Thêm danh mục mới</span></button>
      </div>
      <article class="surface">
        <div class="table-toolbar">
          <div class="search" style="max-width: 420px;">
            ${ICONS.search}
            <input type="text" placeholder="Tìm kiếm danh mục..." value="${escapeAttr(state.categorySearch)}" data-category-search />
          </div>
          <button class="btn btn-ghost" type="button">${ICONS.filter}<span>Lọc</span></button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Mã DM</th>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Số lượng SP</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${filteredCategories.map((category) => `
                <tr>
                  <td><strong>${category.id}</strong></td>
                  <td><strong>${escapeHtml(category.name)}</strong></td>
                  <td class="muted">${escapeHtml(category.description)}</td>
                  <td>${category.productCount}</td>
                  <td><span class="status-pill ${category.status === "Hoạt động" ? "success" : "neutral"}">${category.status}</span></td>
                  <td>
                    <div class="row-actions">
                      <button type="button" class="icon-button">${ICONS.edit}</button>
                      <button type="button" class="icon-button">${ICONS.trash}</button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  `;
}

function renderInventory() {
  const filteredProducts = filterProducts(state.inventorySearch, state.inventoryCategory);
  const lowStockCount = PRODUCTS.filter((product) => product.stock <= 20).length;

  return `
    <div class="table-page">
      <div class="content-hero">
        <div>
          <h1 class="page-title">Kiểm tra tồn kho</h1>
          <p class="page-subtitle">Quản lý và theo dõi số lượng hàng hóa trong kho</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" type="button">${ICONS.download}<span>Xuất báo cáo</span></button>
          <button class="btn btn-primary" type="button">${ICONS.plus}<span>Thêm sản phẩm mới</span></button>
        </div>
      </div>

      <section class="stats-grid">
        ${renderStatCard("Tổng sản phẩm", String(PRODUCTS.length), "", "", "blue", ICONS.filter)}
        ${renderStatCard("Sắp hết hàng", String(lowStockCount), "", "", "rose", ICONS.alert)}
        ${renderStatCard("Tình trạng kho", "Tốt", "", "", "green", ICONS.check)}
      </section>

      <article class="surface">
        <div class="table-toolbar">
          <div class="search" style="max-width: 420px;">
            ${ICONS.search}
            <input type="text" placeholder="Tìm theo tên hoặc mã vạch..." value="${escapeAttr(state.inventorySearch)}" data-inventory-search />
          </div>
          <select data-inventory-category>
            ${CATEGORIES.map((category) => `<option value="${category}" ${category === state.inventoryCategory ? "selected" : ""}>${category}</option>`).join("")}
          </select>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Mã SP / Barcode</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá bán</th>
                <th>Tồn kho</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              ${filteredProducts.map((product) => `
                <tr>
                  <td><div class="id-stack"><strong>${product.id}</strong><span class="muted" style="font-size:0.86rem;">${product.barcode}</span></div></td>
                  <td>
                    <div class="product-row">
                      <img class="thumb" src="${product.image}" alt="${escapeHtml(product.name)}" />
                      <strong>${escapeHtml(product.name)}</strong>
                    </div>
                  </td>
                  <td><span class="category-pill">${product.category}</span></td>
                  <td>${formatCurrency(product.price)}</td>
                  <td><strong>${product.stock}</strong></td>
                  <td><span class="status-pill ${product.stock > 50 ? "success" : product.stock > 20 ? "warning" : "danger"}">${product.stock > 50 ? "Bình thường" : product.stock > 20 ? "Cảnh báo" : "Sắp hết"}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  `;
}

function renderImports() {
  const filtered = IMPORT_HISTORY.filter((item) => {
    const query = state.importSearch.trim().toLowerCase();
    return !query || item.id.toLowerCase().includes(query) || item.supplier.toLowerCase().includes(query);
  });

  return `
    <div class="table-page">
      <div class="content-hero">
        <div>
          <h1 class="page-title">Nhập hàng hóa</h1>
          <p class="page-subtitle">Quản lý phiếu nhập hàng từ nhà cung cấp</p>
        </div>
        <button class="btn btn-primary" type="button" data-open-import>${ICONS.plus}<span>Tạo phiếu nhập</span></button>
      </div>
      <article class="surface">
        <div class="list-head">
          <h2 class="section-title">Lịch sử nhập hàng</h2>
          <div class="search" style="max-width: 380px;">
            ${ICONS.search}
            <input type="text" placeholder="Tìm mã phiếu hoặc nhà cung cấp..." value="${escapeAttr(state.importSearch)}" data-import-search />
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Mã phiếu</th>
                <th>Ngày nhập</th>
                <th>Nhà cung cấp</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map((record) => `
                <tr>
                  <td><strong style="color:#0f9d63;">${record.id}</strong></td>
                  <td>${formatDate(record.date)}</td>
                  <td><strong>${escapeHtml(record.supplier)}</strong></td>
                  <td><strong>${formatCurrency(record.total)}</strong></td>
                  <td><span class="status-pill success">${record.status}</span></td>
                  <td><button type="button" class="icon-button">${ICONS.receipt}</button></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </article>
      ${state.importModalOpen ? renderImportModal() : ""}
    </div>
  `;
}

function renderAccounts() {
  const filtered = ACCOUNTS.filter((account) => {
    const query = state.accountSearch.trim().toLowerCase();
    return !query || account.fullName.toLowerCase().includes(query) || account.username.toLowerCase().includes(query) || account.role.toLowerCase().includes(query);
  });

  return `
    <div class="table-page">
      <div class="content-hero">
        <div>
          <h1 class="page-title">Quản lý tài khoản</h1>
          <p class="page-subtitle">Quản lý nhân viên và phân quyền hệ thống</p>
        </div>
        <button class="btn btn-primary" type="button">${ICONS.plus}<span>Thêm tài khoản</span></button>
      </div>

      <section class="stats-grid">
        ${renderStatCard("Tổng tài khoản", String(ACCOUNTS.length), "", "", "blue", ICONS.shield)}
        ${renderStatCard("Đang hoạt động", String(ACCOUNTS.filter((item) => item.status === "Hoạt động").length), "", "", "green", ICONS.users)}
        ${renderStatCard("Bị khóa", String(ACCOUNTS.filter((item) => item.status === "Khóa").length), "", "", "rose", ICONS.user)}
      </section>

      <article class="surface">
        <div class="table-toolbar">
          <div class="search" style="max-width: 520px;">
            ${ICONS.search}
            <input type="text" placeholder="Tìm kiếm theo tên, username hoặc vai trò..." value="${escapeAttr(state.accountSearch)}" data-account-search />
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Mã NV</th>
                <th>Họ và tên</th>
                <th>Tên đăng nhập</th>
                <th>Vai trò</th>
                <th>Đăng nhập lần cuối</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map((account) => `
                <tr>
                  <td><strong>${account.id}</strong></td>
                  <td>
                    <div class="row-actions" style="justify-content:flex-start; gap:12px;">
                      <div class="avatar">${account.fullName.charAt(0)}</div>
                      <strong>${escapeHtml(account.fullName)}</strong>
                    </div>
                  </td>
                  <td class="muted">${account.username}</td>
                  <td><span class="status-pill ${account.role === "Quản trị viên" ? "purple" : account.role === "Nhân viên kho" ? "orange" : "blue"}">${account.role}</span></td>
                  <td class="muted">${account.lastLogin}</td>
                  <td><span class="status-pill ${account.status === "Hoạt động" ? "success" : "danger"}">${account.status}</span></td>
                  <td><div class="row-actions"><button type="button" class="icon-button">${ICONS.edit}</button><button type="button" class="icon-button">${ICONS.trash}</button></div></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  `;
}

function bindDashboard() {
  document.querySelectorAll("[data-period]").forEach((button) => {
    button.addEventListener("click", () => {
      state.period = button.dataset.period || "Tuần này";
      renderPage();
    });
  });
}

function bindSales() {
  document.querySelector("[data-sales-search]")?.addEventListener("input", (event) => {
    state.salesSearch = event.target.value;
    renderPage();
  });

  document.querySelectorAll("[data-sales-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.salesCategory = button.dataset.salesCategory || "Tất cả";
      renderPage();
    });
  });

  document.querySelectorAll("[data-product-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const product = PRODUCTS.find((item) => item.id === card.dataset.productId);
      if (product) {
        addToCart(product);
      }
    });
  });

  document.querySelectorAll("[data-qty-plus]").forEach((button) => {
    button.addEventListener("click", () => updateCartQuantity(button.dataset.qtyPlus || "", 1));
  });

  document.querySelectorAll("[data-qty-minus]").forEach((button) => {
    button.addEventListener("click", () => updateCartQuantity(button.dataset.qtyMinus || "", -1));
  });

  document.querySelectorAll("[data-remove-item]").forEach((button) => {
    button.addEventListener("click", () => removeFromCart(button.dataset.removeItem || ""));
  });

  document.querySelector("[data-open-scan]")?.addEventListener("click", () => {
    state.scanModalOpen = true;
    renderPage();
  });

  document.querySelector("[data-checkout-button]")?.addEventListener("click", async () => {
    if (state.salesCart.length === 0) return;
    const payload = { items: state.salesCart.map((it) => ({ productId: Number(it.product.id), quantity: it.quantity, unitPrice: it.product.price })) };
    try {
      const res = await fetch('/api/sales/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        state.salesCart = [];
        alert('Thanh toán thành công');
      } else {
        alert('Lỗi thanh toán: ' + (json?.message || res.statusText));
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối đến máy chủ');
    }

    renderPage();
  });

  document.querySelector("[data-close-scan]")?.addEventListener("click", () => {
    state.scanModalOpen = false;
    renderPage();
  });

  document.querySelectorAll("[data-scan-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.querySelector("[data-scan-input]");
      if (input) {
        input.value = button.dataset.scanPreset || "";
        input.focus();
      }
    });
  });

  document.querySelector("[data-scan-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("[data-scan-input]");
    const product = PRODUCTS.find((item) => item.barcode === input?.value.trim() || item.id === input?.value.trim());

    if (product) {
      addToCart(product);
      state.scanModalOpen = false;
      renderPage();
    }
  });
}

function bindProducts() {
  document.querySelector("[data-product-search]")?.addEventListener("input", (event) => {
    state.productSearch = event.target.value;
    renderPage();
  });

  document.querySelector("[data-product-category]")?.addEventListener("change", (event) => {
    state.productCategory = event.target.value;
    renderPage();
  });
}

function bindCategories() {
  document.querySelector("[data-category-search]")?.addEventListener("input", (event) => {
    state.categorySearch = event.target.value;
    renderPage();
  });
}

function bindInventory() {
  document.querySelector("[data-inventory-search]")?.addEventListener("input", (event) => {
    state.inventorySearch = event.target.value;
    renderPage();
  });

  document.querySelector("[data-inventory-category]")?.addEventListener("change", (event) => {
    state.inventoryCategory = event.target.value;
    renderPage();
  });
}

function bindImports() {
  document.querySelector("[data-import-search]")?.addEventListener("input", (event) => {
    state.importSearch = event.target.value;
    renderPage();
  });

  document.querySelector("[data-open-import]")?.addEventListener("click", () => {
    state.importModalOpen = true;
    renderPage();
  });

  document.querySelector("[data-close-import]")?.addEventListener("click", () => {
    state.importModalOpen = false;
    renderPage();
  });
}

function bindAccounts() {
  document.querySelector("[data-account-search]")?.addEventListener("input", (event) => {
    state.accountSearch = event.target.value;
    renderPage();
  });
}

function addToCart(product) {
  const existing = state.salesCart.find((item) => item.product.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.salesCart.push({ product, quantity: 1 });
  }

  renderPage();
}

function updateCartQuantity(productId, delta) {
  const item = state.salesCart.find((entry) => entry.product.id === productId);

  if (!item) {
    return;
  }

  item.quantity = Math.max(1, item.quantity + delta);
  renderPage();
}

function removeFromCart(productId) {
  state.salesCart = state.salesCart.filter((item) => item.product.id !== productId);
  renderPage();
}

function filterProducts(searchTerm, category) {
  const query = searchTerm.trim().toLowerCase();
  return PRODUCTS.filter((product) => {
    const matchesSearch = !query || product.name.toLowerCase().includes(query) || product.barcode.includes(query);
    const matchesCategory = category === "Tất cả" || product.category === category;
    return matchesSearch && matchesCategory;
  });
}

function renderScanModal() {
  return `
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-panel">
        <div class="modal-head">
          <div class="modal-title">${ICONS.scan}<span>Quét mã vạch sản phẩm</span></div>
          <button type="button" class="icon-button" data-close-scan>${ICONS.close}</button>
        </div>
        <div class="modal-body">
          <div class="scan-stage">
            <div class="scan-line"></div>
            <div style="position:relative; z-index:1; background:rgba(15,23,42,0.6); padding:8px 14px; border-radius:999px;">Đưa mã vạch vào khu vực này</div>
          </div>
          <form class="row-actions" data-scan-form style="margin-top:18px;">
            <input type="text" placeholder="Hoặc nhập thủ công mã vạch..." data-scan-input autofocus />
            <button class="btn btn-primary" type="submit">Xác nhận</button>
          </form>
          <div class="surface-body" style="padding:16px 0 0;">
            <div class="mini-label" style="margin-bottom:10px;">Gợi ý mã test để thử nghiệm:</div>
            <div class="row-actions" style="flex-wrap:wrap;">
              <button type="button" class="btn btn-ghost" data-scan-preset="8934567890123">Nước khoáng: 8934567890123</button>
              <button type="button" class="btn btn-ghost" data-scan-preset="8934567890125">Mì Hảo Hảo: 8934567890125</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderImportModal() {
  return `
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-panel" style="width:min(1000px,100%);">
        <div class="modal-head">
          <div class="modal-title">${ICONS.plus}<span>Tạo phiếu nhập mới</span></div>
          <button type="button" class="icon-button" data-close-import>${ICONS.close}</button>
        </div>
        <div class="modal-body">
          <div class="form-group-grid">
            <label class="input-label">Nhà cung cấp
              <select>
                <option>Chọn nhà cung cấp...</option>
                <option>NPP Đại Phát</option>
                <option>Công ty Vinamilk</option>
                <option>NPP Tuấn Tú</option>
              </select>
            </label>
            <label class="input-label">Ngày nhập
              <input type="date" value="2026-05-28" />
            </label>
          </div>
          <div class="surface" style="margin-top:18px; box-shadow:none;">
            <div class="surface-body" style="padding:18px;">
              <div class="section-title" style="margin-bottom:12px;">Danh sách sản phẩm nhập</div>
              <div style="padding:28px; border:2px dashed #dbe5f0; border-radius:18px; text-align:center; color:#7b8da4;">
                <div style="display:grid; place-items:center; gap:10px;">
                  ${ICONS.search}
                  <div>Tìm kiếm và thêm sản phẩm vào phiếu nhập</div>
                  <button type="button" class="btn btn-ghost">Tìm sản phẩm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <div class="mini-label">Tổng cộng: <strong class="sum" style="font-size:1.4rem; color:#0f9d63; margin-left:8px;">0 ₫</strong></div>
          <div class="button-row">
            <button type="button" class="btn btn-ghost" data-close-import>Hủy bỏ</button>
            <button type="button" class="btn btn-primary">Hoàn tất nhập hàng</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderStatCard(label, value, delta, deltaClass, iconColor, iconMarkup) {
  return `
    <article class="stat-card">
      <div class="stat-copy">
        <p>${escapeHtml(label)}</p>
        <div class="stat-value">${escapeHtml(value)}</div>
        ${delta ? `<div class="${deltaClass}">${escapeHtml(delta)}</div>` : ""}
      </div>
      <div class="icon-badge ${iconColor}">${iconMarkup}</div>
    </article>
  `;
}

function buildAreaChart(data) {
  const width = 720;
  const height = 280;
  const padding = { top: 18, right: 18, bottom: 30, left: 54 };
  const max = Math.max(...data.map((item) => item.revenue));
  const min = 2500000;
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const points = data.map((item, index) => {
    const x = padding.left + (plotWidth / Math.max(data.length - 1, 1)) * index;
    const y = padding.top + plotHeight - ((item.revenue - min) / (max - min)) * plotHeight;
    return { x, y };
  });
  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${height - padding.bottom} L ${points[0].x.toFixed(1)} ${height - padding.bottom} Z`;

  const gridLines = [2.5, 5, 7.5, 10].map((tick) => {
    const y = padding.top + plotHeight - ((tick * 1000000 - min) / (max - min)) * plotHeight;
    return `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#dbe5f0" stroke-dasharray="4 6" />
      <text x="${padding.left - 12}" y="${y + 4}" text-anchor="end" fill="#7b8da4" font-size="12">${tick}M</text>
    `;
  }).join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="100%" preserveAspectRatio="none" aria-label="Biểu đồ doanh thu">
      <defs>
        <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stop-color="#00b47d" stop-opacity="0.28" />
          <stop offset="95%" stop-color="#00b47d" stop-opacity="0.02" />
        </linearGradient>
      </defs>
      ${gridLines}
      <path d="${areaPath}" fill="url(#revenue-fill)" />
      <path d="${linePath}" fill="none" stroke="#00b47d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      ${points.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="4" fill="#fff" stroke="#00b47d" stroke-width="3" />`).join("")}
      ${data.map((item, index) => `<text x="${points[index].x}" y="${height - 8}" text-anchor="middle" fill="#7b8da4" font-size="12">${item.name}</text>`).join("")}
    </svg>
  `;
}

function formatNumber(value) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

function formatDate(value) {
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${value}T00:00:00`));
}

function formatLongDate(value) {
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("\n", " ");
}

function svg(inner, width = 22, height = 22) {
  return `<svg viewBox="0 0 24 24" width="${width}" height="${height}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}

function renderEmptyState(message) {
  return `<div class="empty-cart" style="grid-column:1/-1; padding:40px 0;">${svg(`<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>`, 52, 52)}<div>${escapeHtml(message)}</div></div>`;
}
