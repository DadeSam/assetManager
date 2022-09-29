-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2022 at 01:25 PM
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
-- Database: `nodejs_login`
--

-- --------------------------------------------------------

--
-- Table structure for table `asset`
--

CREATE TABLE `asset` (
  `id` int(11) NOT NULL,
  `asset id` varchar(15) NOT NULL,
  `asset category` varchar(250) NOT NULL,
  `asset type` varchar(50) NOT NULL,
  `device name` varchar(300) NOT NULL,
  `serial no` varchar(300) NOT NULL,
  `model` varchar(300) NOT NULL,
  `manufacturer` varchar(100) NOT NULL,
  `os` varchar(100) NOT NULL,
  `role` varchar(300) NOT NULL,
  `service ip` varchar(15) NOT NULL,
  `ilo ip` varchar(15) NOT NULL,
  `datacenter` varchar(100) NOT NULL,
  `lane` varchar(5) NOT NULL,
  `rack` tinyint(2) NOT NULL,
  `status` varchar(50) NOT NULL,
  `support` varchar(3) NOT NULL,
  `support name` varchar(300) NOT NULL,
  `system owner` varchar(300) NOT NULL,
  `system admin` varchar(300) NOT NULL,
  `services` varchar(500) NOT NULL,
  `time added` datetime NOT NULL,
  `active_status` tinyint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `asset`
--

INSERT INTO `asset` (`id`, `asset id`, `asset category`, `asset type`, `device name`, `serial no`, `model`, `manufacturer`, `os`, `role`, `service ip`, `ilo ip`, `datacenter`, `lane`, `rack`, `status`, `support`, `support name`, `system owner`, `system admin`, `services`, `time added`, `active_status`) VALUES
(1, 'VFQ9HMP96', 'server', 'Physical', 'Linux server 1', '1290480', 'HP 1000', 'HP', 'Linux', 'jskfskfhksf', '192.168.0.1', '', 'Accra North', '', 0, 'Production', 'Yes', 'HP support', 'Emmanuel Dade', 'Samuel Dade', 'Cash services', '2022-09-29 10:15:53', 1),
(2, 'VFDCL7RDP', 'server', 'Physical', 'Windows server 1', 'X890183018', 'Dell Artifact', 'Dell Computers', 'Windows', 'To be used for DNS caching', '192.168.12.16', '', 'Cantonement', 'B6', 8, 'Production', 'No', '', 'Emmanuel Dade', 'Samuel Dade', 'DNS Caching', '2022-09-29 10:28:08', 1);

-- --------------------------------------------------------

--
-- Table structure for table `assetsessionsstore`
--

CREATE TABLE `assetsessionsstore` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `session_expiry` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assetsessionsstore`
--

INSERT INTO `assetsessionsstore` (`session_id`, `session_expiry`, `data`) VALUES
('1iTzig32Ezy1UxIswMzcrNM62T8QZK7x', 1664457526, '{\"cookie\":{\"originalMaxAge\":7200000,\"expires\":\"2022-09-29T13:18:37.197Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('bIs0sHqXyaZhnw67FbhQqkJ-41z8RWub', 1664455189, '{\"cookie\":{\"originalMaxAge\":7200000,\"expires\":\"2022-09-29T12:16:22.080Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('moGKjFMNhPGhYktoRHTxn4TH0Js6R3eB', 1664454972, '{\"cookie\":{\"originalMaxAge\":7200000,\"expires\":\"2022-09-29T12:28:44.957Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asset`
--
ALTER TABLE `asset`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assetsessionsstore`
--
ALTER TABLE `assetsessionsstore`
  ADD PRIMARY KEY (`session_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `asset`
--
ALTER TABLE `asset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
