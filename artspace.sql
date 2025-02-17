-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 16 فبراير 2025 الساعة 03:08
-- إصدار الخادم: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `artspace`
--

-- --------------------------------------------------------

--
-- بنية الجدول `advertisements`
--

CREATE TABLE `advertisements` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `advertisements`
--

INSERT INTO `advertisements` (`id`, `title`, `content`, `image_url`, `link`) VALUES
(1, 'معرض الفنون التشكيلية الخليجي', '2024', '/uploads/1736175439755.png', 'https://www.facebook.com'),
(2, 'معرض الفنون التشكيلية الخليجي', '2024', '/uploads/1736175475836.png', 'https://www.facebook.com'),
(3, 'معرض الفنون التشكيلية الخليجي', '2024', '/uploads/1736175517547.png', 'https://www.facebook.com');

-- --------------------------------------------------------

--
-- بنية الجدول `artists`
--

CREATE TABLE `artists` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `othar_name` varchar(255) DEFAULT NULL,
  `nationality` varchar(100) DEFAULT NULL,
  `speciality` varchar(255) DEFAULT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `profession` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `college` varchar(255) DEFAULT NULL,
  `graduation_year` year(4) DEFAULT NULL,
  `rotors` text DEFAULT NULL,
  `skill_1` varchar(255) DEFAULT NULL,
  `skill_2` varchar(255) DEFAULT NULL,
  `achievements` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `hrefX` varchar(255) DEFAULT NULL,
  `hrefY` varchar(255) DEFAULT NULL,
  `hrefI` varchar(255) DEFAULT NULL,
  `hrefF` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `artists`
--

INSERT INTO `artists` (`id`, `name`, `othar_name`, `nationality`, `speciality`, `degree`, `profession`, `location`, `college`, `graduation_year`, `rotors`, `skill_1`, `skill_2`, `achievements`, `email`, `image`, `hrefX`, `hrefY`, `hrefI`, `hrefF`, `password`) VALUES
(1, 'يوسف السالمي', 'الفنان / يوسف السالمي', 'اماراتي', 'نحت', 'فنان نحات إماراتي يُعرف بإبداعه في الأعمال الفنية من الرخام والبرونز', 'فنان نحت', 'المدينة، الدولة', 'بكالوريوس الفنون الجميلة', '2015', ' النحت الحديث في المهعد البرطاني', 'نحات مستقل : تصميم وتنفيذ منحوتات فنية للمعارض المحلية والدولية.', 'معلم فن النحت :  تقديم ورش عمل لتعريف المشاركين بأساليب وتقنيات النحت الحديثة. ', 'مشاركات في الفعاليات الثقافية :المشاركة في المهرجانات الفنية مثل اسم المهرجان', 'youssfsalam@gmail.com', '/uploads/1736180927625.png', 'https://www.youtube.com', 'https://www.youtube.com', 'https://www.youtube.com', 'https://www.facebook.com', '$2a$10$M4EmYomJfGTO5CXRS0Ufq.Bp77CzZXSfyVUOmwH960OnVWTcpUFje'),
(22, 'محمد علي غالب ', 'الفنان / يوسف السالمي', 'اماراتي', 'نحت', 'فنان نحات إماراتي يُعرف بإبداعه في الأعمال الفنية من الرخام والبرونز', 'فنان نحت', 'المدينة، الدولة', 'بكالوريوس الفنون الجميلة', '2015', ' النحت الحديث في المهعد البرطاني', 'نحات مستقل : تصميم وتنفيذ منحوتات فنية للمعارض المحلية والدولية.', 'معلم فن النحت :  تقديم ورش عمل لتعريف المشاركين بأساليب وتقنيات النحت الحديثة. ', 'مشاركات في الفعاليات الثقافية :المشاركة في المهرجانات الفنية مثل اسم المهرجان', 'beshorafek0@gmail.com', '/uploads/1739317563689.jpeg', 'https://www.youtube.com', 'https://www.youtube.com', 'https://www.youtube.com', 'https://www.facebook.com', '$2a$10$M4EmYomJfGTO5CXRS0Ufq.Bp77CzZXSfyVUOmwH960OnVWTcpUFje');

-- --------------------------------------------------------

--
-- بنية الجدول `artworks`
--

CREATE TABLE `artworks` (
  `id` int(11) NOT NULL,
  `artist_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `price` decimal(10,2) DEFAULT 0.00,
  `image` varchar(255) DEFAULT NULL,
  `Auctiontype` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `artworks`
--

INSERT INTO `artworks` (`id`, `artist_id`, `title`, `price`, `image`, `Auctiontype`, `details`) VALUES
(18, 22, 'ورقة فنية فاخرة', 500.00, '/uploads/1736412865042.svg', 'مزاد علني ', '	\r\nلوحه مقاس 30*40 تعبر عن .............................');

-- --------------------------------------------------------

--
-- بنية الجدول `auctions`
--

CREATE TABLE `auctions` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `speciality` varchar(255) DEFAULT NULL,
  `highestBid` decimal(10,2) DEFAULT NULL,
  `timeRemaining` varchar(50) DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `artist_id` int(11) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `auctions`
--

INSERT INTO `auctions` (`id`, `title`, `image`, `speciality`, `highestBid`, `timeRemaining`, `endTime`, `artist_id`, `details`) VALUES
(1, 'تمثال نحت صخري من الصخور الطبيعية ', '/uploads/1736176652442.svg', 'مزاد علني', 1000.00, 'متبقي 6 سعات من الان علي انتهاء المزداد', '2025-02-05 17:02:00', 22, 'لوحه مقاس 30*40 تعبر عن ................................'),
(2, 'تمثال نحت صخري من الصخور الطبيعية ', '/uploads/1736176709033.svg', 'مزاد علني ', 1500.00, 'متبقي 6 سعات من الان علي انتهاء المزداد', '2025-02-06 17:18:00', NULL, NULL),
(3, 'تمثال نحت صخري من الصخور الطبيعية ', '/uploads/1736176729897.svg', 'مزاد علني ', 1000.00, 'متبقي 6 سعات من الان علي انتهاء المزداد', '2025-02-08 17:18:00', NULL, NULL);

-- --------------------------------------------------------

--
-- بنية الجدول `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `speciality` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `categories`
--

INSERT INTO `categories` (`id`, `name`, `speciality`, `image`, `address`) VALUES
(1, 'رسم', 'رسم', '/uploads/1736425146903.svg', NULL),
(2, 'نحت', 'نحت', '/uploads/1736425384573.svg', NULL),
(3, 'الخزف', 'الخزف', '/uploads/1736425469100.svg', NULL),
(4, 'التراث', 'التراث', '/uploads/1736425510203.svg', NULL),
(5, 'الحرف اليديوية', 'الحرف اليديوية', '/uploads/1736425638873.svg', NULL),
(6, 'التصوير الفتوغرافي', 'التصوير الفتوغرافي', '/uploads/1736425703474.svg', NULL),
(7, 'الفن ثلاثي الابعاد', 'الفن ثلاثي الابعاد', '/uploads/1736425758043.svg', NULL),
(8, 'الديكور', 'الديكور', '/uploads/1736425799589.svg', NULL);

-- --------------------------------------------------------

--
-- بنية الجدول `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `item_type` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `item_id`, `item_type`, `created_at`) VALUES
(1, 1, 18, 'artworks', '2025-02-14 17:02:17'),
(3, 1, 2, 'upcoming_events', '2025-02-15 18:25:04');

-- --------------------------------------------------------

--
-- بنية الجدول `installments`
--

CREATE TABLE `installments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `due_date` date NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paid` tinyint(1) DEFAULT 0,
  `payment_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `artwork_id` int(11) DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `payment_type` enum('full','installment') NOT NULL,
  `offer_price` decimal(10,2) DEFAULT NULL,
  `installment_plan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`installment_plan`)),
  `status` enum('pending','approved','rejected','completed') DEFAULT 'pending',
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `source_table` enum('artworks','virtualmarket','silent_auctions','auctions') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `artwork_id`, `order_date`, `payment_type`, `offer_price`, `installment_plan`, `status`, `customer_name`, `customer_email`, `customer_phone`, `source_table`) VALUES
(1, 1, 18, '2025-02-12 02:36:43', '', 1000.00, NULL, 'pending', 'بيشوي رفيق سرافين', 'admin@gmail.com', '966123435', 'artworks'),
(4, 1, 3, '2025-02-12 02:48:45', '', 2000.00, NULL, 'pending', 'Bishoy rafiq', 'admin1@gmail.com', '9661233245', 'auctions'),
(5, 1, 2, '2025-02-12 03:33:16', '', 2000.00, NULL, 'pending', 'بيشوي رفيق سرافين', 'admin@gmail.com', '966134355', 'auctions'),
(6, 1, 8, '2025-02-16 00:22:44', '', 500.00, NULL, 'pending', 'rafiq', 'beshorafek0@gmail.com', '966112314', 'virtualmarket'),
(7, 1, 8, '2025-02-16 00:29:28', '', 500.00, NULL, 'pending', 'rafiq', 'beshorafek0@gmail.com', '966112314', 'virtualmarket');

-- --------------------------------------------------------

--
-- بنية الجدول `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `content` text NOT NULL,
  `arrow_up` int(11) DEFAULT 20,
  `arrow_down` int(11) DEFAULT 1,
  `chat` int(11) DEFAULT 2,
  `pencilEdit` varchar(255) DEFAULT 'إضافة رد',
  `show_count` int(11) DEFAULT 56
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `posts`
--

INSERT INTO `posts` (`id`, `time`, `content`, `arrow_up`, `arrow_down`, `chat`, `pencilEdit`, `show_count`) VALUES
(7, '0000-00-00 00:00:00', 'هل يمكن أن تحكي اللوحات ثلاثية الأبعاد قصصًا أكثر عمقًا من اللوحات الكلاسيكية المسطحة؟\" أو \"كيف تؤثر المزادات على مستقبل الفنانين الشباب؟\"', 20, 1, 3, 'إضافة رد', 53),
(16, '0000-00-00 00:00:00', 'هل يمكن أن تحكي اللوحات ثلاثية الأبعاد قصصًا أكثر عمقًا من اللوحات الكلاسيكية المسطحة؟\" أو \"كيف تؤثر المزادات على مستقبل الفنانين الشباب؟\"', 20, 1, 3, 'إضافة رد', 53);

-- --------------------------------------------------------

--
-- بنية الجدول `silent_auctions`
--

CREATE TABLE `silent_auctions` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `artist_id` int(11) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `silent_auctions`
--

INSERT INTO `silent_auctions` (`id`, `title`, `image`, `artist_id`, `details`) VALUES
(3, 'لوحة فنية تعبر عن الطبيعة ', '/uploads/1736175316967.svg', 22, 'لوحه مقاس 30*40 تعبر عن ................................\r\n\r\n');

-- --------------------------------------------------------

--
-- بنية الجدول `upcoming_events`
--

CREATE TABLE `upcoming_events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `effectiveness` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `upcoming_events`
--

INSERT INTO `upcoming_events` (`id`, `title`, `location`, `data`, `image`, `effectiveness`) VALUES
(1, 'المكان : مركز الفنون الدولية في الدوحة', 'ألوان الحياة\" للفن التشكيلي ', '2025-02-03', '/uploads/1736174406720.svg', 'فعالية '),
(2, 'ألوان الحياة\" للفن التشكيلي ', 'المكان : مركز الفنون الدولية في الدوحة', '2025-02-02', '/uploads/1736174441329.svg', 'فعالية '),
(3, 'ألوان الحياة\" للفن التشكيلي ', 'المكان : مركز الفنون الدولية في الدوحة', '2025-02-01', '/uploads/1736174467752.svg', 'فعالية ');

-- --------------------------------------------------------

--
-- بنية الجدول `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `status` enum('active','suspended') DEFAULT 'active',
  `role` enum('user','artist','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `users`
--

INSERT INTO `users` (`id`, `name`, `date_of_birth`, `email`, `password`, `profile_image`, `status`, `role`, `created_at`) VALUES
(1, 'محمد علي محمد', '2002-07-01', 'admin@gmail.com', '$2a$10$E6eraa9HCFwhK.doAJnb1upr2eeegshzHEC/Zam.zp.LYgZeSxFym', '/uploads/1736477563990.png', 'active', 'user', '2025-02-04 22:48:48'),
(5, 'admin', '2002-01-24', 'admin1@gmail.com', '$2a$10$cS7mvdANmySjgzt4YWm9xuLiMzH.k.KLKGbVNwDd/C8vS0F4jSw4.', NULL, 'active', 'admin', '2025-02-12 00:10:11');

-- --------------------------------------------------------

--
-- بنية الجدول `virtualmarket`
--

CREATE TABLE `virtualmarket` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `artist_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `virtualmarket`
--

INSERT INTO `virtualmarket` (`id`, `title`, `price`, `image`, `artist_id`, `category_id`, `address`, `details`) VALUES
(8, 'لوحة فنية ثلاثية الابعاد ', 500.00, '/uploads/1736415546858.jpg', 22, 1, 'لوحة فنية تعبر عن جودة الحياة وروعتها ', 'لوحه مقاس 30*40 تعبر عن ................................');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advertisements`
--
ALTER TABLE `advertisements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `artworks`
--
ALTER TABLE `artworks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artist_id` (`artist_id`);

--
-- Indexes for table `auctions`
--
ALTER TABLE `auctions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `installments`
--
ALTER TABLE `installments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `artwork_id` (`artwork_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `silent_auctions`
--
ALTER TABLE `silent_auctions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `upcoming_events`
--
ALTER TABLE `upcoming_events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `virtualmarket`
--
ALTER TABLE `virtualmarket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artist_id` (`artist_id`),
  ADD KEY `fk_category` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advertisements`
--
ALTER TABLE `advertisements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `artworks`
--
ALTER TABLE `artworks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `auctions`
--
ALTER TABLE `auctions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `installments`
--
ALTER TABLE `installments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `silent_auctions`
--
ALTER TABLE `silent_auctions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `upcoming_events`
--
ALTER TABLE `upcoming_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `virtualmarket`
--
ALTER TABLE `virtualmarket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `artworks`
--
ALTER TABLE `artworks`
  ADD CONSTRAINT `artworks_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`);

--
-- قيود الجداول `installments`
--
ALTER TABLE `installments`
  ADD CONSTRAINT `installments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `virtualmarket`
--
ALTER TABLE `virtualmarket`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `virtualmarket_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
