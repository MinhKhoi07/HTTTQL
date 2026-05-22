const api = {
  health: "/api/health",
  sales: {
    create: "/api/sales/orders",
    list: "/api/sales/orders"
  },
  inventory: {
    create: "/api/inventory/stock-movements",
    list: "/api/inventory/stock-movements"
  },
  warehouse: {
    create: "/api/warehouse/goods-receipts",
    list: "/api/warehouse/goods-receipts"
  }
};

const navLinks = document.querySelectorAll("[data-nav-link]");
const page = document.body.dataset.page;
const output = document.querySelector("[data-output]");

function setOutput(message, payload, status = "ok") {
  if (!output) {
    return;
  }

  const payloadText = payload ? JSON.stringify(payload, null, 2) : "";
  output.innerHTML = `
    <div class="status ${status}">${message}</div>
    ${payloadText ? `<pre>${escapeHtml(payloadText)}</pre>` : ""}
  `;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    },
    ...options
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}`);
  }

  return data;
}

function markActiveNav() {
  navLinks.forEach((link) => {
    if (link.dataset.navLink === page) {
      link.classList.add("is-active");
    }
  });
}

function createRowInputs(container, rowClass, defaults = {}) {
  const row = document.createElement("div");
  row.className = rowClass;
  row.innerHTML = `
    <input name="productId" placeholder="Ma san pham" value="${defaults.productId ?? ""}" required />
    <input name="quantity" type="number" min="1" step="1" placeholder="So luong" value="${defaults.quantity ?? 1}" required />
    <input name="price" type="number" min="0" step="0.01" placeholder="Gia" value="${defaults.price ?? 0}" required />
    <button type="button" class="remove-row">Xoa</button>
  `;

  row.querySelector(".remove-row")?.addEventListener("click", () => {
    const rows = container.querySelectorAll(".row-item, .row-item--receipt");
    if (rows.length > 1) {
      row.remove();
    }
  });

  return row;
}

function readRows(container) {
  return Array.from(container.querySelectorAll(".row-item, .row-item--receipt")).map((row) => {
    const productId = row.querySelector('input[name="productId"]')?.value.trim() ?? "";
    const quantity = Number(row.querySelector('input[name="quantity"]')?.value ?? 0);
    const priceValue = row.querySelector('input[name="price"]')?.value ?? "0";
    return { productId, quantity, priceValue };
  });
}

function initSalesPage() {
  const form = document.querySelector("[data-sales-form]");
  const rows = document.querySelector("[data-sales-rows]");
  const addRowBtn = document.querySelector("[data-add-sales-row]");
  const listBody = document.querySelector("[data-sales-list]");

  if (!(form && rows && addRowBtn && listBody)) {
    return;
  }

  const addRow = (defaults) => rows.appendChild(createRowInputs(rows, "row-item", defaults));

  addRow();
  addRowBtn.addEventListener("click", () => addRow());

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const items = readRows(rows)
      .map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: Number(item.priceValue)
      }))
      .filter((item) => item.productId.length > 0);

    try {
      const result = await fetchJson(api.sales.create, {
        method: "POST",
        body: JSON.stringify({ items })
      });

      setOutput("Da tao don ban hang", result);
      form.reset();
      rows.innerHTML = "";
      addRow();
      await loadSales();
    } catch (error) {
      setOutput(error.message, null, "warn");
    }
  });

  async function loadSales() {
    listBody.innerHTML = `<tr><td colspan="5">Dang tai...</td></tr>`;

    try {
      const result = await fetchJson(api.sales.list);
      const orders = result?.data ?? [];

      if (orders.length === 0) {
        listBody.innerHTML = `<tr><td colspan="5" class="empty-state">Chua co don hang nao.</td></tr>`;
        return;
      }

      listBody.innerHTML = orders
        .map(
          (order) => `
            <tr>
              <td>${escapeHtml(order.id)}</td>
              <td>${escapeHtml(order.createdAt)}</td>
              <td>${order.items?.length ?? 0}</td>
              <td>${formatCurrency(order.totalAmount)}</td>
              <td>${escapeHtml(JSON.stringify(order.items))}</td>
            </tr>
          `
        )
        .join("");
    } catch (error) {
      listBody.innerHTML = `<tr><td colspan="5" class="empty-state">Khong tai duoc du lieu don hang.</td></tr>`;
      setOutput(error.message, null, "warn");
    }
  }

  loadSales();
}

function initInventoryPage() {
  const form = document.querySelector("[data-inventory-form]");
  const listBody = document.querySelector("[data-inventory-list]");

  if (!(form && listBody)) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
      productId: form.productId.value.trim(),
      warehouseId: form.warehouseId.value.trim(),
      type: form.type.value,
      quantity: Number(form.quantity.value),
      note: form.note.value.trim() || undefined
    };

    try {
      const result = await fetchJson(api.inventory.create, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      setOutput("Da ghi nhan giao dich ton kho", result);
      form.reset();
      await loadInventory();
    } catch (error) {
      setOutput(error.message, null, "warn");
    }
  });

  async function loadInventory() {
    listBody.innerHTML = `<tr><td colspan="6">Dang tai...</td></tr>`;

    try {
      const result = await fetchJson(api.inventory.list);
      const movements = result?.data ?? [];

      if (movements.length === 0) {
        listBody.innerHTML = `<tr><td colspan="6" class="empty-state">Chua co giao dich ton kho nao.</td></tr>`;
        return;
      }

      listBody.innerHTML = movements
        .map(
          (movement) => `
            <tr>
              <td>${escapeHtml(movement.id)}</td>
              <td>${escapeHtml(movement.productId)}</td>
              <td>${escapeHtml(movement.warehouseId)}</td>
              <td>${escapeHtml(movement.type)}</td>
              <td>${movement.quantity}</td>
              <td>${escapeHtml(movement.createdAt)}</td>
            </tr>
          `
        )
        .join("");
    } catch (error) {
      listBody.innerHTML = `<tr><td colspan="6" class="empty-state">Khong tai duoc du lieu ton kho.</td></tr>`;
      setOutput(error.message, null, "warn");
    }
  }

  loadInventory();
}

function initWarehousePage() {
  const form = document.querySelector("[data-warehouse-form]");
  const rows = document.querySelector("[data-warehouse-rows]");
  const addRowBtn = document.querySelector("[data-add-warehouse-row]");
  const listBody = document.querySelector("[data-warehouse-list]");

  if (!(form && rows && addRowBtn && listBody)) {
    return;
  }

  const addRow = (defaults) => {
    const row = document.createElement("div");
    row.className = "row-item row-item--receipt";
    row.innerHTML = `
      <input name="productId" placeholder="Ma san pham" value="${defaults?.productId ?? ""}" required />
      <input name="quantity" type="number" min="1" step="1" placeholder="So luong" value="${defaults?.quantity ?? 1}" required />
      <input name="price" type="number" min="0" step="0.01" placeholder="Don gia" value="${defaults?.price ?? 0}" required />
      <button type="button" class="remove-row">Xoa</button>
    `;

    row.querySelector(".remove-row")?.addEventListener("click", () => {
      const count = rows.querySelectorAll(".row-item--receipt").length;
      if (count > 1) {
        row.remove();
      }
    });

    rows.appendChild(row);
  };

  addRow();
  addRowBtn.addEventListener("click", () => addRow());

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const items = Array.from(rows.querySelectorAll(".row-item--receipt")).map((row) => ({
      productId: row.querySelector('input[name="productId"]')?.value.trim() ?? "",
      quantity: Number(row.querySelector('input[name="quantity"]')?.value ?? 0),
      unitCost: Number(row.querySelector('input[name="price"]')?.value ?? 0)
    })).filter((item) => item.productId.length > 0);

    const payload = {
      supplierId: form.supplierId.value.trim(),
      warehouseId: form.warehouseId.value.trim(),
      items
    };

    try {
      const result = await fetchJson(api.warehouse.create, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      setOutput("Da tao phieu nhap kho", result);
      form.reset();
      rows.innerHTML = "";
      addRow();
      await loadReceipts();
    } catch (error) {
      setOutput(error.message, null, "warn");
    }
  });

  async function loadReceipts() {
    listBody.innerHTML = `<tr><td colspan="5">Dang tai...</td></tr>`;

    try {
      const result = await fetchJson(api.warehouse.list);
      const receipts = result?.data ?? [];

      if (receipts.length === 0) {
        listBody.innerHTML = `<tr><td colspan="5" class="empty-state">Chua co phieu nhap kho nao.</td></tr>`;
        return;
      }

      listBody.innerHTML = receipts
        .map(
          (receipt) => `
            <tr>
              <td>${escapeHtml(receipt.id)}</td>
              <td>${escapeHtml(receipt.supplierId)}</td>
              <td>${escapeHtml(receipt.warehouseId)}</td>
              <td>${receipt.items?.length ?? 0}</td>
              <td>${escapeHtml(receipt.createdAt)}</td>
            </tr>
          `
        )
        .join("");
    } catch (error) {
      listBody.innerHTML = `<tr><td colspan="5" class="empty-state">Khong tai duoc du lieu phieu nhap kho.</td></tr>`;
      setOutput(error.message, null, "warn");
    }
  }

  loadReceipts();
}

function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(Number(value ?? 0));
}

async function initHomePage() {
  const healthNode = document.querySelector("[data-health]");
  const salesCount = document.querySelector("[data-sales-count]");
  const inventoryCount = document.querySelector("[data-inventory-count]");
  const warehouseCount = document.querySelector("[data-warehouse-count]");

  try {
    const health = await fetchJson(api.health);
    if (healthNode) {
      healthNode.textContent = `${health.message} - ${health.timestamp}`;
    }
  } catch {
    if (healthNode) {
      healthNode.textContent = "Khong the ket noi API health.";
    }
  }

  const updates = [
    [api.sales.list, salesCount],
    [api.inventory.list, inventoryCount],
    [api.warehouse.list, warehouseCount]
  ];

  await Promise.all(
    updates.map(async ([url, node]) => {
      if (!node) {
        return;
      }

      try {
        const result = await fetchJson(url);
        node.textContent = String(result?.data?.length ?? 0);
      } catch {
        node.textContent = "-";
      }
    })
  );
}

markActiveNav();

if (page === "home") {
  initHomePage();
}

if (page === "sales") {
  initSalesPage();
}

if (page === "inventory") {
  initInventoryPage();
}

if (page === "warehouse") {
  initWarehousePage();
}
