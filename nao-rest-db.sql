-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 06, 2016 at 04:56 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nao-rest-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `docID` int(11) NOT NULL,
  `name` text NOT NULL,
  `phone` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`docID`, `name`, `phone`) VALUES
(1, 'Dr. Strange', 1233455678);

-- --------------------------------------------------------

--
-- Table structure for table `dosage`
--

CREATE TABLE `dosage` (
  `dosageID` int(11) NOT NULL,
  `acctNum` int(11) NOT NULL,
  `medID` int(11) NOT NULL,
  `dosage_date` date DEFAULT NULL,
  `mornDose` datetime DEFAULT NULL,
  `eveDose` datetime DEFAULT NULL,
  `supplyLeft` int(11) NOT NULL,
  `docID` int(11) NOT NULL,
  `priority` int(11) DEFAULT NULL,
  `mornDoseFlag` int(11) NOT NULL,
  `eveDoseFlag` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dosage`
--

INSERT INTO `dosage` (`dosageID`, `acctNum`, `medID`, `dosage_date`, `mornDose`, `eveDose`, `supplyLeft`, `docID`, `priority`, `mornDoseFlag`, `eveDoseFlag`) VALUES
(2, 1, 1, '2016-11-05', '2016-11-05 08:00:00', '2016-11-05 20:00:00', 5, 1, 2, 0, 0),
(3, 1, 2, '2016-11-06', '2016-11-06 08:00:00', '2016-11-06 21:00:00', 3, 1, 2, 0, 0),
(4, 3, 2, '2016-11-05', '2016-11-05 07:00:00', '2016-11-05 19:00:00', 6, 1, 2, 0, 0),
(5, 4, 4, '2016-11-05', '2016-11-05 09:00:00', '2016-11-05 19:00:00', 3, 1, 2, 0, 0),
(6, 5, 3, '2016-11-05', '2016-11-05 08:00:00', '2016-11-05 20:00:00', 10, 1, 2, 0, 0),
(7, 6, 2, '2016-11-05', '2016-11-05 09:00:00', '2016-11-05 18:00:00', 15, 1, 2, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `medID` int(11) NOT NULL,
  `name` text NOT NULL,
  `information` text NOT NULL,
  `sideEffects` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`medID`, `name`, `information`, `sideEffects`) VALUES
(1, 'Advil', 'For headaches', 'None'),
(2, 'Aspirin', 'Pain', 'None'),
(3, 'Aspirin2', 'For headache.', 'None'),
(4, 'Amoxicilin', 'Fever', 'None');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `acctNum` int(11) NOT NULL,
  `name` text NOT NULL,
  `gender` varchar(1) NOT NULL,
  `primaryCare` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`acctNum`, `name`, `gender`, `primaryCare`) VALUES
(1, 'tam', 'M', 'Tam\'s Mom'),
(3, 'addy', 'M', 'addy\'s mom'),
(4, 'shivoum', 'M', 'shivoum\'s sister'),
(5, 'dheeraj', 'M', 'dheeraj\'s mom'),
(6, 'thomas', 'M', 'thomas\' mom');

-- --------------------------------------------------------

--
-- Table structure for table `primarycare`
--

CREATE TABLE `primarycare` (
  `primaryCareID` int(11) NOT NULL,
  `acctNum` int(11) NOT NULL,
  `careName` text NOT NULL,
  `phone` int(11) NOT NULL,
  `email` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `primarycare`
--

INSERT INTO `primarycare` (`primaryCareID`, `acctNum`, `careName`, `phone`, `email`) VALUES
(1, 1, 'Tam\'s Mom', 2004567889, '8328379703@vtext.com'),
(2, 3, 'Addy\'s Mom', 99999999, '8328379703@vtext.com'),
(3, 4, 'shivoum\'s mom', 90999999, '8328379703@vtext.com'),
(4, 5, 'dheeraj\'s mom', 888888888, '8328379703@vtext.com'),
(5, 6, 'thomas\' mom', 77777777, '8328379703@vtext.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`docID`);

--
-- Indexes for table `dosage`
--
ALTER TABLE `dosage`
  ADD PRIMARY KEY (`dosageID`),
  ADD KEY `fk_questionbank_exams` (`acctNum`);

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`medID`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`acctNum`);

--
-- Indexes for table `primarycare`
--
ALTER TABLE `primarycare`
  ADD PRIMARY KEY (`primaryCareID`),
  ADD KEY `fk_questionbank_exams` (`acctNum`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `docID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `dosage`
--
ALTER TABLE `dosage`
  MODIFY `dosageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `medID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `acctNum` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `primarycare`
--
ALTER TABLE `primarycare`
  MODIFY `primaryCareID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
