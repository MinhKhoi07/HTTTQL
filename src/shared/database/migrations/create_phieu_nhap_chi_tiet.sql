-- Migration: tạo bảng phieu_nhap_chi_tiet
CREATE TABLE IF NOT EXISTS `phieu_nhap_chi_tiet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_phieu_nhap` int(11) NOT NULL,
  `id_san_pham` int(11) NOT NULL,
  `so_luong` int(11) NOT NULL,
  `don_gia` decimal(15,2) NOT NULL,
  `thanh_tien` decimal(15,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_phieu_nhap` (`id_phieu_nhap`),
  KEY `id_san_pham` (`id_san_pham`),
  CONSTRAINT `phieu_nhap_chi_tiet_ibfk_1` FOREIGN KEY (`id_phieu_nhap`) REFERENCES `phieu_nhap` (`id`) ON DELETE CASCADE,
  CONSTRAINT `phieu_nhap_chi_tiet_ibfk_2` FOREIGN KEY (`id_san_pham`) REFERENCES `san_pham` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
