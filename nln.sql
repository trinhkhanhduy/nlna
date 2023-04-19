-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2023 at 01:49 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nln`
--

-- --------------------------------------------------------

--
-- Table structure for table `chitiethoadonxuat`
--

CREATE TABLE `chitiethoadonxuat` (
  `MaHDX` int(11) NOT NULL,
  `SoLuongXuat` int(11) NOT NULL,
  `MaSP` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `giohang`
--

CREATE TABLE `giohang` (
  `MaGH` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `MaSP` varchar(10) NOT NULL,
  `SLSP` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hinhanhsanpham`
--

CREATE TABLE `hinhanhsanpham` (
  `MaSP` varchar(10) NOT NULL,
  `HinhAnhSP` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `hinhanhsanpham`
--
DELIMITER $$
CREATE TRIGGER `them_hinhanh` BEFORE INSERT ON `hinhanhsanpham` FOR EACH ROW BEGIN
DECLARE id varchar(10);

SET id = (SELECT CONCAT("SP0",SUBSTRING(MaSP,4)+1) FROM hinhanhsanpham ORDER BY SUBSTRING(MaSP,4)*1 DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.MaSP = 'SP01';
ELSE SET NEW.MaSP = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `hoadonnhap`
--

CREATE TABLE `hoadonnhap` (
  `MaHDN` int(11) NOT NULL,
  `NgayLapHDN` date NOT NULL,
  `SoLuongNhap` int(11) NOT NULL,
  `GiaSPN` int(11) NOT NULL,
  `MaKhoHang` int(11) NOT NULL,
  `MaSP` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `hoadonnhap`
--
DELIMITER $$
CREATE TRIGGER `them_hoa_don_nhap` BEFORE INSERT ON `hoadonnhap` FOR EACH ROW BEGIN
DECLARE id varchar(10);

SET id = (SELECT CONCAT("SP0",SUBSTRING(MaSP,4)+1) FROM hoadonnhap ORDER BY SUBSTRING(MaSP,4)*1 DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.MaSP = 'SP01';
ELSE SET NEW.MaSP = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `hoadonxuat`
--

CREATE TABLE `hoadonxuat` (
  `MaHDX` int(11) NOT NULL,
  `NgayLapHDX` date NOT NULL,
  `TrangThaiHD` int(11) NOT NULL,
  `MaKH` int(11) NOT NULL,
  `MaKhoHang` int(11) NOT NULL,
  `TinhTrangHD` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

CREATE TABLE `khachhang` (
  `MaKH` int(11) NOT NULL,
  `TenKH` varchar(50) NOT NULL,
  `SDT` varchar(10) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `DiaChi` varchar(100) NOT NULL,
  `Username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `khohang`
--

CREATE TABLE `khohang` (
  `MaKhoHang` int(11) NOT NULL,
  `TenKhoHang` varchar(100) NOT NULL,
  `DiaChiKhoHang` varchar(100) NOT NULL,
  `SDTKhoHang` varchar(10) NOT NULL,
  `MaLSP` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `khohang`
--

INSERT INTO `khohang` (`MaKhoHang`, `TenKhoHang`, `DiaChiKhoHang`, `SDTKhoHang`, `MaLSP`) VALUES
(2, 'Kho hàng Cần Thơ', '30/4 Hưng Lợi', '0964064694', 'LSP01');

--
-- Triggers `khohang`
--
DELIMITER $$
CREATE TRIGGER `them_khohang` BEFORE INSERT ON `khohang` FOR EACH ROW BEGIN
DECLARE id varchar(10);

SET id = (SELECT CONCAT("MKH0",SUBSTRING(MaKhoHang,4)+1) FROM khohang ORDER BY SUBSTRING(MaKhoHang,4)*1 DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.MaKhoHang = 'MKH01';
ELSE SET NEW.MaKhoHang = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `kichthuocsanpham`
--

CREATE TABLE `kichthuocsanpham` (
  `ID` int(2) NOT NULL,
  `KichThuocSP` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kichthuocsanpham`
--

INSERT INTO `kichthuocsanpham` (`ID`, `KichThuocSP`) VALUES
(1, '36'),
(2, '37'),
(3, '38'),
(4, '39'),
(5, '40'),
(6, '41'),
(7, '42'),
(8, '43'),
(9, '44'),
(10, '45');

-- --------------------------------------------------------

--
-- Table structure for table `loaisanpham`
--

CREATE TABLE `loaisanpham` (
  `MaLSP` varchar(10) NOT NULL,
  `TenLSP` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `loaisanpham`
--

INSERT INTO `loaisanpham` (`MaLSP`, `TenLSP`) VALUES
('LSP01', 'Giày'),
('LSP02', 'Dép');

--
-- Triggers `loaisanpham`
--
DELIMITER $$
CREATE TRIGGER `them_loaisp` BEFORE INSERT ON `loaisanpham` FOR EACH ROW BEGIN
DECLARE id varchar(10);

SET id = (SELECT CONCAT("LSP0",SUBSTRING(MaLSP,4)+1) FROM loaisanpham ORDER BY SUBSTRING(MaLSP,4)*1 DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.MaLSP = 'LSP01';
ELSE SET NEW.MaLSP = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `MaSP` varchar(10) NOT NULL,
  `TenSP` varchar(100) NOT NULL,
  `GiaSPX` int(11) NOT NULL,
  `ThongTinSP` varchar(255) NOT NULL,
  `MaTH` varchar(10) NOT NULL,
  `MaLSP` varchar(10) NOT NULL,
  `MaKT` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `sanpham`
--
DELIMITER $$
CREATE TRIGGER `them_san_pham` BEFORE INSERT ON `sanpham` FOR EACH ROW BEGIN
DECLARE id varchar(10);

SET id = (SELECT CONCAT("SP0",SUBSTRING(MaSP,4)+1) FROM sanpham ORDER BY SUBSTRING(MaSP,4)*1 DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.MaSP = 'SP01';
ELSE SET NEW.MaSP = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `taikhoan`
--

CREATE TABLE `taikhoan` (
  `Username` varchar(50) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Role` varchar(5) NOT NULL DEFAULT 'USER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `thuonghieu`
--

CREATE TABLE `thuonghieu` (
  `MaTH` varchar(10) NOT NULL,
  `TenTH` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `thuonghieu`
--

INSERT INTO `thuonghieu` (`MaTH`, `TenTH`) VALUES
('TH001', 'Adidas'),
('TH002', 'Nike'),
('TH003', 'Supreme'),
('TH004', 'Jordan'),
('TH005', 'Puma'),
('TH006', 'Balenciaga'),
('TH007', 'Converse'),
('TH008', 'Vans');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chitiethoadonxuat`
--
ALTER TABLE `chitiethoadonxuat`
  ADD KEY `Relationship 18` (`MaSP`),
  ADD KEY `Relationship 30` (`MaHDX`);

--
-- Indexes for table `giohang`
--
ALTER TABLE `giohang`
  ADD PRIMARY KEY (`MaGH`),
  ADD KEY `Relationship 5` (`Username`),
  ADD KEY `Relationship 19` (`MaSP`);

--
-- Indexes for table `hinhanhsanpham`
--
ALTER TABLE `hinhanhsanpham`
  ADD KEY `Relationship 11` (`MaSP`);

--
-- Indexes for table `hoadonnhap`
--
ALTER TABLE `hoadonnhap`
  ADD PRIMARY KEY (`MaHDN`),
  ADD KEY `Relationship 6` (`MaKhoHang`),
  ADD KEY `Relationship 20` (`MaSP`);

--
-- Indexes for table `hoadonxuat`
--
ALTER TABLE `hoadonxuat`
  ADD PRIMARY KEY (`MaHDX`),
  ADD KEY `Relationship 7` (`MaKH`),
  ADD KEY `Relationship 8` (`MaKhoHang`);

--
-- Indexes for table `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`MaKH`),
  ADD KEY `Relationship 9` (`Username`);

--
-- Indexes for table `khohang`
--
ALTER TABLE `khohang`
  ADD PRIMARY KEY (`MaKhoHang`),
  ADD KEY `Relationship 10` (`MaLSP`);

--
-- Indexes for table `kichthuocsanpham`
--
ALTER TABLE `kichthuocsanpham`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `loaisanpham`
--
ALTER TABLE `loaisanpham`
  ADD PRIMARY KEY (`MaLSP`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`MaSP`),
  ADD KEY `Relationship 14` (`MaTH`),
  ADD KEY `Relationship 15` (`MaLSP`),
  ADD KEY `Relationship 12` (`MaKT`);

--
-- Indexes for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`Username`);

--
-- Indexes for table `thuonghieu`
--
ALTER TABLE `thuonghieu`
  ADD PRIMARY KEY (`MaTH`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `giohang`
--
ALTER TABLE `giohang`
  MODIFY `MaGH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT for table `hoadonnhap`
--
ALTER TABLE `hoadonnhap`
  MODIFY `MaHDN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `hoadonxuat`
--
ALTER TABLE `hoadonxuat`
  MODIFY `MaHDX` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `MaKH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `khohang`
--
ALTER TABLE `khohang`
  MODIFY `MaKhoHang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `kichthuocsanpham`
--
ALTER TABLE `kichthuocsanpham`
  MODIFY `ID` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chitiethoadonxuat`
--
ALTER TABLE `chitiethoadonxuat`
  ADD CONSTRAINT `Relationship 18` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Relationship 30` FOREIGN KEY (`MaHDX`) REFERENCES `hoadonxuat` (`MaHDX`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `giohang`
--
ALTER TABLE `giohang`
  ADD CONSTRAINT `Relationship 19` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Relationship 5` FOREIGN KEY (`Username`) REFERENCES `taikhoan` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hinhanhsanpham`
--
ALTER TABLE `hinhanhsanpham`
  ADD CONSTRAINT `Relationship 11` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hoadonnhap`
--
ALTER TABLE `hoadonnhap`
  ADD CONSTRAINT `Relationship 20` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Relationship 6` FOREIGN KEY (`MaKhoHang`) REFERENCES `khohang` (`MaKhoHang`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hoadonxuat`
--
ALTER TABLE `hoadonxuat`
  ADD CONSTRAINT `Relationship 7` FOREIGN KEY (`MaKH`) REFERENCES `khachhang` (`MaKH`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Relationship 8` FOREIGN KEY (`MaKhoHang`) REFERENCES `khohang` (`MaKhoHang`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `khachhang`
--
ALTER TABLE `khachhang`
  ADD CONSTRAINT `Relationship 9` FOREIGN KEY (`Username`) REFERENCES `taikhoan` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `khohang`
--
ALTER TABLE `khohang`
  ADD CONSTRAINT `Relationship 10` FOREIGN KEY (`MaLSP`) REFERENCES `loaisanpham` (`MaLSP`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `Relationship 12` FOREIGN KEY (`MaKT`) REFERENCES `kichthuocsanpham` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Relationship 14` FOREIGN KEY (`MaTH`) REFERENCES `thuonghieu` (`MaTH`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Relationship 15` FOREIGN KEY (`MaLSP`) REFERENCES `loaisanpham` (`MaLSP`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
