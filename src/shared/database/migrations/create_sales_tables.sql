-- Migration: tạo bảng hoa_don_ban_hang và hoa_don_ban_hang_chi_tiet
CREATE TABLE IF NOT EXISTS `hoa_don_ban_hang` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ma_hoa_don` varchar(50) NOT NULL,
  `id_nguoi_ban` int(11) DEFAULT NULL,
  `ngay_ban` datetime DEFAULT current_timestamp(),
  `tong_tien` decimal(15,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ma_hoa_don` (`ma_hoa_don`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

CREATE TABLE IF NOT EXISTS `hoa_don_ban_hang_chi_tiet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_hoa_don` int(11) NOT NULL,
  `id_san_pham` int(11) NOT NULL,
  `so_luong` int(11) NOT NULL,
  `don_gia` decimal(15,2) NOT NULL,
  `thanh_tien` decimal(15,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_hoa_don` (`id_hoa_don`),
  KEY `id_san_pham` (`id_san_pham`),
  CONSTRAINT `hoa_don_chi_tiet_ibfk_1` FOREIGN KEY (`id_hoa_don`) REFERENCES `hoa_don_ban_hang` (`id`) ON DELETE CASCADE,
  CONSTRAINT `hoa_don_chi_tiet_ibfk_2` FOREIGN KEY (`id_san_pham`) REFERENCES `san_pham` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
