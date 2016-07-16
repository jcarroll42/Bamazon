-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.11-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for bamazon
CREATE DATABASE IF NOT EXISTS `bamazon` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bamazon`;


-- Dumping structure for table bamazon.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(50) DEFAULT NULL,
  `DepartmentName` varchar(50) DEFAULT NULL,
  `Price` float DEFAULT NULL,
  `StockQuantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Dumping data for table bamazon.products: ~4 rows (approximately)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id`, `ProductName`, `DepartmentName`, `Price`, `StockQuantity`) VALUES
	(1, 'Fender Stratocaster', 'Musical Instruments', 899.99, 24),
	(2, 'iPhone 6s', 'Electronics', 599.99, 52),
	(3, 'Sennheiser 598 Headphones', 'Electronics', 159.99, 14),
	(4, 'Vox AC15 Amplifier', 'Musical Instruments', 659.99, 20),
	(5, 'Asus Laptop', 'Electronics', 1499.99, 3),
	(6, 'Samsung Monitor', 'Electronics', 199.99, 45),
	(7, 'Floor Lamp', 'Furniture', 69.99, 60),
	(8, 'Office Chair', 'Furniture', 129.99, 4),
	(9, 'Coffee Table', 'Furniture', 89.99, 14),
	(10, 'Gibson Les Paul', 'Musical Instruments', 2199.99, 26);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
