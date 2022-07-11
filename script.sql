CREATE DATABASE  IF NOT EXISTS `ulatina` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ulatina`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: ulatina
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `alerts`
--

DROP TABLE IF EXISTS `alerts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alerts` (
  `a_id` int NOT NULL AUTO_INCREMENT,
  `c_id` int NOT NULL,
  `courseVarianceApproved` decimal(10,2) NOT NULL,
  `courseVarianceFailed` decimal(10,2) NOT NULL,
  `courseVarianceDropped` decimal(10,2) NOT NULL,
  PRIMARY KEY (`a_id`),
  KEY `fk_alert_course_idx` (`c_id`),
  CONSTRAINT `fk_alert_course` FOREIGN KEY (`c_id`) REFERENCES `courses` (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alerts`
--

LOCK TABLES `alerts` WRITE;
/*!40000 ALTER TABLE `alerts` DISABLE KEYS */;
INSERT INTO `alerts` VALUES (1,4,-46.43,140.00,300.00),(2,5,-4.00,50.00,-100.00);
/*!40000 ALTER TABLE `alerts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `c_id` int NOT NULL AUTO_INCREMENT,
  `c_subject` int NOT NULL,
  `c_professor` int NOT NULL,
  `c_schedule` time NOT NULL,
  `c_quarter` int NOT NULL,
  `c_year` int NOT NULL,
  `c_students_approved` int NOT NULL,
  `c_students_failed` int NOT NULL,
  `c_students_dropped` int NOT NULL,
  `c_createdBy` int NOT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `subject_id_UNIQUE` (`c_id`),
  KEY `fk_subject_professor_idx` (`c_professor`),
  KEY `fk_subject_user_idx` (`c_createdBy`),
  KEY `fk_course_subject_idx` (`c_subject`),
  CONSTRAINT `fk_course_professor` FOREIGN KEY (`c_professor`) REFERENCES `professors` (`p_id`),
  CONSTRAINT `fk_course_subject` FOREIGN KEY (`c_subject`) REFERENCES `subjects` (`s_id`),
  CONSTRAINT `fk_course_user` FOREIGN KEY (`c_createdBy`) REFERENCES `users` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,2,1,'18:00:00',1,2022,28,2,0,1),(2,1,2,'19:30:00',2,2022,25,2,2,1),(3,2,1,'18:00:00',2,2022,28,3,1,1),(4,2,1,'18:00:00',2,2022,15,6,2,1),(5,1,2,'19:30:00',1,2022,24,3,0,1);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professors`
--

DROP TABLE IF EXISTS `professors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professors` (
  `p_id` int NOT NULL AUTO_INCREMENT,
  `p_fullName` varchar(45) NOT NULL,
  `p_identification` varchar(45) NOT NULL,
  `p_createdBy` int NOT NULL,
  PRIMARY KEY (`p_id`),
  UNIQUE KEY `professor_id_UNIQUE` (`p_id`),
  UNIQUE KEY `p_identification_UNIQUE` (`p_identification`),
  KEY `fk_professor_user_idx` (`p_createdBy`),
  CONSTRAINT `fk_professors_users` FOREIGN KEY (`p_createdBy`) REFERENCES `users` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professors`
--

LOCK TABLES `professors` WRITE;
/*!40000 ALTER TABLE `professors` DISABLE KEYS */;
INSERT INTO `professors` VALUES (1,'Gerardo','12345678',1),(2,' Jacqueline','87654321',1);
/*!40000 ALTER TABLE `professors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `s_id` int NOT NULL AUTO_INCREMENT,
  `s_name` varchar(45) NOT NULL,
  `s_code` varchar(45) NOT NULL,
  `s_createdBy` int NOT NULL,
  PRIMARY KEY (`s_id`),
  UNIQUE KEY `s_code_UNIQUE` (`s_code`),
  KEY `fk_subject_user_idx` (`s_createdBy`),
  CONSTRAINT `fk_subject_user` FOREIGN KEY (`s_createdBy`) REFERENCES `users` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'Análisis 2','BIS01',1),(2,'Programación 4','BIS02',1);
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `u_id` int NOT NULL AUTO_INCREMENT,
  `u_fullName` varchar(45) NOT NULL,
  `u_username` varchar(45) NOT NULL,
  `u_password` varchar(45) NOT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `username_UNIQUE` (`u_username`),
  UNIQUE KEY `user_id_UNIQUE` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Administrador','admin@ulatina.net','21232f297a57a5a743894a0e4a801fc3');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ulatina'
--
/*!50003 DROP PROCEDURE IF EXISTS `create_course` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_course`(par_c_subject INT, par_c_schedule TIME, par_c_quarter INT, par_c_year INT, par_c_professor INT, 
par_c_students_approved INT, par_c_students_failed INT, par_c_students_dropped INT, par_c_createdBy INT)
BEGIN
SET @approved = (SELECT SUM(c_students_approved) FROM courses WHERE c_subject = par_c_subject ORDER BY c_id DESC LIMIT 9);
SET @failed = (SELECT SUM(c_students_failed) FROM courses WHERE c_subject = par_c_subject ORDER BY c_id DESC LIMIT 9);
SET @dropped = (SELECT SUM(c_students_dropped) FROM courses WHERE c_subject = par_c_subject ORDER BY c_id DESC LIMIT 9);

SET @courseRows = (SELECT count(*) FROM (SELECT * FROM courses WHERE c_subject = par_c_subject LIMIT 9) as approvedQuantity);
/*Da cantidad de estudiantes de registros*/
SET @averageApproved = @approved / @courseRows;
SET @averageFailed = @failed / @courseRows;
SET @averageDropped = @dropped / @courseRows;
/*Da porcentaje respecto a un 100%*/
SET @courseAverageApproved = ((par_c_students_approved * 100) / @averageApproved);
SET @courseAverageFailed = ((par_c_students_failed * 100) / @averageFailed);
SET @courseAverageDropped = ((par_c_students_dropped * 100) / @averageDropped);
/*Da valores de variacion para registrar*/
SET @approvedVariance = (@courseAverageApproved - 100);
SET @failedVariance = (@courseAverageFailed- 100);
SET @droppedVariance = (@courseAverageDropped- 100);

/*Inserta curso*/
INSERT INTO courses(c_subject, c_schedule, c_quarter, c_year, c_professor, c_students_approved, c_students_failed, c_students_dropped, c_createdBy)
VALUES(par_c_subject , par_c_schedule , par_c_quarter , par_c_year , par_c_professor , par_c_students_approved , par_c_students_failed , par_c_students_dropped , par_c_createdBy );

/*Inserta alerta en caso de variacion*/
SET @last_id = LAST_INSERT_ID();
IF 
@courseAverageApproved < 90 OR @courseAverageApproved > 110 OR @courseAverageFailed < 90 OR @courseAverageFailed > 110 OR @courseAverageDropped < 90 OR @courseAverageDropped > 110
THEN
INSERT INTO alerts(c_id,courseVarianceApproved, courseVarianceFailed, courseVarianceDropped)
VALUES (@last_id, @approvedVariance, @failedVariance, @droppedVariance);
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_professor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_professor`(par_fullName VARCHAR(45), par_identification VARCHAR(45), par_createdBy INT)
BEGIN
  INSERT INTO professors(p_fullName, p_identification, p_createdBy)
  VALUES (par_fullName, par_identification, par_createdBy);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_subject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_subject`(par_name VARCHAR(50), par_code  VARCHAR(50), par_createdBy INT)
BEGIN
INSERT INTO subjects(s_name, s_code, s_createdBy) 
VALUES (par_name,  par_code, par_createdBy);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_alerts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_alerts`()
BEGIN
SELECT * FROM alerts LIMIT 5;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_course` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_course`(par_s_id INT, par_option VARCHAR(15))
BEGIN
IF par_option = 'approved'
THEN
SELECT  c_students_approved as approved FROM courses WHERE c_subject = par_s_id ORDER BY c_id DESC LIMIT 10;
ELSEIF par_option = 'failed'
THEN 
SELECT  c_students_failed as failed FROM courses WHERE c_subject = par_s_id ORDER BY c_id DESC LIMIT 10;
ELSEIF par_option = 'dropped'
THEN 
SELECT  c_students_dropped as dropped FROM courses WHERE c_subject = par_s_id ORDER BY c_id DESC LIMIT 10;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_professors` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_professors`()
BEGIN
SELECT * FROM professors;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_subjects` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_subjects`()
BEGIN
SELECT * FROM subjects;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `login`(par_username VARCHAR(45), par_password VARCHAR(45))
BEGIN
SET @passwd = md5(par_password);
SELECT u_id as id FROM users  WHERE u_username = par_username AND u_password = @passwd;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `register` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `register`(username VARCHAR(45) , passwd VARCHAR(45) , fullName VARCHAR(45) )
BEGIN
SET @passwd = md5(passwd);
INSERT INTO users (u_username, u_password, u_fullName)
VALUES (username, @passwd, fullName);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-10 13:48:46
