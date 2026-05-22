# HTTTQL - He thong quan ly cua hang tien loi

HTTTQL la ung dung quan ly cua hang tien loi duoc xay dung theo mo hinh MVC, to chuc theo tung module nghiep vu va co giao dien web rieng cho tung chuc nang.

## Tong quan

He thong tap trung vao 3 nhom chuc nang chinh:

- Ban hang
- Ton kho
- Nhap kho

## Chuc nang

### Ban hang

- Tao don ban hang voi nhieu san pham
- Tinh tong tien don hang
- Xem danh sach don da tao

### Ton kho

- Ghi nhan giao dich `IN`, `OUT`, `ADJUSTMENT`
- Luu ma san pham, ma kho, so luong, ghi chu
- Xem lich su giao dich ton kho

### Nhap kho

- Lap phieu nhap kho tu nha cung cap
- Nhap nhieu dong san pham trong mot phieu
- Luu thong tin nha cung cap va kho nhan

### Giao dien web

- Trang chu tong quan
- Trang ban hang
- Trang ton kho
- Trang nhap kho

## Cong nghe

- Node.js
- Express.js
- TypeScript
- MySQL / phpMyAdmin
- HTML, CSS, JavaScript
- mysql2
- dotenv

## Cau truc du an

```text
src/
  app.ts
  server.ts
  config/
    env.ts
  modules/
    sales/
    inventory/
    warehouse/
  shared/
    database/
    middleware/
    utils/
public/
  index.html
  sales.html
  inventory.html
  warehouse.html
  assets/
    styles.css
    app.js
```

## Cau hinh database

Tao file `.env` o thu muc goc:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=htttql
DB_CONNECTION_LIMIT=10
```

## Cach chay

```bash
npm install
npm run dev
```

Mo trinh duyet tai:

```text
http://localhost:3000/
```

## Local URLs

- Node (dev server): `http://localhost:3000/` — khởi động bằng `npm run dev`.
- XAMPP (static files, nếu bạn chạy Apache trên cổng 8080):
  - Truy cập giao diện tĩnh: `http://localhost:8080/HTTTQL/public/index.html`
  - Hoặc danh mục dự án: `http://localhost:8080/HTTTQL/` (nếu Apache hiển thị index).

Lưu ý: nếu bạn dùng XAMPP trên cổng khác, thay `8080` bằng cổng tương ứng.

## API chinh

- `GET /api/health`
- `GET /api/sales/orders`
- `POST /api/sales/orders`
- `GET /api/inventory/stock-movements`
- `POST /api/inventory/stock-movements`
- `GET /api/warehouse/goods-receipts`
- `POST /api/warehouse/goods-receipts`

## Ghi chu

Du an hien co giao dien demo va API mau. Co the tiep tuc gan repository vao MySQL de luu du lieu that.
