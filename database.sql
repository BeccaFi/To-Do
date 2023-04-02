CREATE DATABASE  IF NOT EXISTS `todo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `todo`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: todo
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Friends`
--

DROP TABLE IF EXISTS `Friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Friends` (
  `Username` varchar(30) NOT NULL,
  `Friend` varchar(30) NOT NULL,
  PRIMARY KEY (`Username`,`Friend`),
  KEY `Friend` (`Friend`),
  CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `Users` (`Username`),
  CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`Friend`) REFERENCES `Users` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Friends`
--

LOCK TABLES `Friends` WRITE;
/*!40000 ALTER TABLE `Friends` DISABLE KEYS */;
INSERT INTO `Friends` VALUES ('test','test2'),('test','test3');
/*!40000 ALTER TABLE `Friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ToDoLists`
--

DROP TABLE IF EXISTS `ToDoLists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ToDoLists` (
  `List_ID` int NOT NULL AUTO_INCREMENT,
  `ListName` varchar(30) NOT NULL,
  `Username` varchar(50) NOT NULL,
  PRIMARY KEY (`List_ID`),
  KEY `Username` (`Username`),
  CONSTRAINT `todolists_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `Users` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ToDoLists`
--

LOCK TABLES `ToDoLists` WRITE;
/*!40000 ALTER TABLE `ToDoLists` DISABLE KEYS */;
INSERT INTO `ToDoLists` VALUES (1,'Monday','test'),(2,'Birthday Party','test'),(3,'At the office','test');
/*!40000 ALTER TABLE `ToDoLists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Todos`
--

DROP TABLE IF EXISTS `Todos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Todos` (
  `List_ID` int NOT NULL,
  `ID` int NOT NULL AUTO_INCREMENT,
  `Todo` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `List_ID` (`List_ID`),
  CONSTRAINT `todos_ibfk_1` FOREIGN KEY (`List_ID`) REFERENCES `ToDoLists` (`List_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Todos`
--

LOCK TABLES `Todos` WRITE;
/*!40000 ALTER TABLE `Todos` DISABLE KEYS */;
INSERT INTO `Todos` VALUES (1,1,'Laundry'),(1,2,'Grocery Shopping'),(2,3,'Get new speakers');
/*!40000 ALTER TABLE `Todos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `Username` varchar(30) NOT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Username`),
  UNIQUE KEY `Username_UNIQUE` (`Username`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('test','$2b$10$RWucAn3uKhNrOdNwsO1RwuXVWqWh8wWI1ofjpI3MAzeVxsVOmm4Um','test@testsson.se'),('test2','$2b$10$fkrddEDbx4yauAZ4d8X3N.r5V3NW1pxy/VrDTZPYRxjDJiaUMI6vy','test2@fdsfd.se'),('test3','$2b$10$dcN4PqmLDhDzvG7rSeq14.9pirGBohtNwrrEgkkQynJNV.z.fq2Fe','test3@ffs.se'),('test4','$2b$10$HRLqLKgsMck/G6hK3rPkiuYRk4py3/hDpuxZd6MGGTIa.4ZzWXnna','test4@testsson.se'),('test5','$2b$10$GOXGZVbAtBdQl7twO4TXtu1xtRLynRNjDkY6iJ/Rf8ZxqRJhGvsYO','test5@testsson.se'),('test6','$2b$10$Edt/A0s1MG2QptRsNhH.luYnI8.TqViUbUMT41RvTQKaAuG.zuI6.','test6@testsson.se');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-21 23:54:29
