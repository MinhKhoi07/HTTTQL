-- Migration: tạo user admin nếu chưa tồn tại
INSERT INTO tai_khoan (ten_dang_nhap, mat_khau, ho_ten, vai_tro, trang_thai)
SELECT 'admin', 'admin123', 'Quản trị viên', 'Quản trị viên', 1
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM tai_khoan WHERE ten_dang_nhap = 'admin');

-- Lưu ý: mật khẩu lưu ở đây là plain text theo cấu hình hiện tại của ứng dụng.
-- Khi triển khai thực tế, hãy hash mật khẩu bằng bcrypt và cập nhật logic so sánh mật khẩu.
