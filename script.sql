-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ulatina
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ulatina
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ulatina` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ulatina` ;

-- -----------------------------------------------------
-- Table `ulatina`.`campuses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulatina`.`campuses` (
  `cp_id` INT NOT NULL AUTO_INCREMENT,
  `cp_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cp_id`),
  UNIQUE INDEX `cp_id_UNIQUE` (`cp_id` ASC) VISIBLE,
  UNIQUE INDEX `cp_name_UNIQUE` (`cp_name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ulatina`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulatina`.`users` (
  `u_id` INT NOT NULL AUTO_INCREMENT,
  `u_fullName` VARCHAR(45) NOT NULL,
  `u_username` VARCHAR(45) NOT NULL,
  `u_password` VARCHAR(45) NOT NULL,
  `u_status` TINYINT NOT NULL DEFAULT '1',
  PRIMARY KEY (`u_id`),
  UNIQUE INDEX `username_UNIQUE` (`u_username` ASC) VISIBLE,
  UNIQUE INDEX `user_id_UNIQUE` (`u_id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 25
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ulatina`.`professors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulatina`.`professors` (
  `p_id` INT NOT NULL AUTO_INCREMENT,
  `p_fullName` VARCHAR(45) NOT NULL,
  `p_identification` VARCHAR(45) NOT NULL,
  `p_createdBy` INT NOT NULL,
  `p_status` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`p_id`),
  UNIQUE INDEX `professor_id_UNIQUE` (`p_id` ASC) VISIBLE,
  UNIQUE INDEX `p_identification_UNIQUE` (`p_identification` ASC) VISIBLE,
  INDEX `fk_professor_user_idx` (`p_createdBy` ASC) VISIBLE,
  CONSTRAINT `fk_professors_users`
    FOREIGN KEY (`p_createdBy`)
    REFERENCES `ulatina`.`users` (`u_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ulatina`.`subjects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulatina`.`subjects` (
  `s_id` INT NOT NULL AUTO_INCREMENT,
  `s_name` VARCHAR(45) NOT NULL,
  `s_code` VARCHAR(45) NOT NULL,
  `s_createdBy` INT NOT NULL,
  `s_status` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`s_id`),
  UNIQUE INDEX `s_code_UNIQUE` (`s_code` ASC) VISIBLE,
  INDEX `fk_subject_user_idx` (`s_createdBy` ASC) VISIBLE,
  CONSTRAINT `fk_subject_user`
    FOREIGN KEY (`s_createdBy`)
    REFERENCES `ulatina`.`users` (`u_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ulatina`.`courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulatina`.`courses` (
  `c_id` INT NOT NULL AUTO_INCREMENT,
  `c_subject` INT NOT NULL,
  `c_professor` INT NOT NULL,
  `c_campus` INT NOT NULL,
  `c_schedule` TIME NOT NULL,
  `c_quarter` INT NOT NULL,
  `c_year` INT NOT NULL,
  `c_students_approved` INT NOT NULL,
  `c_students_failed` INT NOT NULL,
  `c_students_dropped` INT NOT NULL,
  `c_createdBy` INT NOT NULL,
  `c_status` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`c_subject`, `c_professor`, `c_schedule`, `c_quarter`, `c_year`, `c_campus`),
  UNIQUE INDEX `subject_id_UNIQUE` (`c_id` ASC) VISIBLE,
  INDEX `fk_subject_professor_idx` (`c_professor` ASC) VISIBLE,
  INDEX `fk_subject_user_idx` (`c_createdBy` ASC) VISIBLE,
  INDEX `fk_course_subject_idx` (`c_subject` ASC) VISIBLE,
  INDEX `fk_course_campus_idx` (`c_campus` ASC) VISIBLE,
  CONSTRAINT `fk_course_campus`
    FOREIGN KEY (`c_campus`)
    REFERENCES `ulatina`.`campuses` (`cp_id`),
  CONSTRAINT `fk_course_professor`
    FOREIGN KEY (`c_professor`)
    REFERENCES `ulatina`.`professors` (`p_id`),
  CONSTRAINT `fk_course_subject`
    FOREIGN KEY (`c_subject`)
    REFERENCES `ulatina`.`subjects` (`s_id`),
  CONSTRAINT `fk_course_user`
    FOREIGN KEY (`c_createdBy`)
    REFERENCES `ulatina`.`users` (`u_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ulatina`.`alerts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ulatina`.`alerts` (
  `a_id` INT NOT NULL AUTO_INCREMENT,
  `course` INT NOT NULL,
  `courseVarianceApproved` DECIMAL(10,2) NOT NULL,
  `courseVarianceFailed` DECIMAL(10,2) NOT NULL,
  `courseVarianceDropped` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`a_id`),
  INDEX `fk_alert_course_idx` (`course` ASC) VISIBLE,
  CONSTRAINT `fk_alert_course`
    FOREIGN KEY (`course`)
    REFERENCES `ulatina`.`courses` (`c_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `ulatina` ;

-- -----------------------------------------------------
-- procedure create_campus
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_campus`(par_cp_name VARCHAR(45))
BEGIN
INSERT INTO campuses(cp_name)
VALUES (par_cp_name);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure create_course
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_course`(par_c_subject INT, par_c_professor INT, par_c_campus INT , par_c_schedule TIME, par_c_quarter INT, par_c_year INT,  
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
INSERT INTO courses(c_subject, c_campus, c_schedule, c_quarter, c_year, c_professor, c_students_approved, c_students_failed, c_students_dropped, c_createdBy)
VALUES(par_c_subject , par_c_campus, par_c_schedule , par_c_quarter , par_c_year , par_c_professor , par_c_students_approved , par_c_students_failed , par_c_students_dropped , par_c_createdBy );

/*Inserta alerta en caso de variacion*/
SET @last_id = LAST_INSERT_ID();
IF 
@courseAverageApproved < 90 OR @courseAverageApproved > 110 OR @courseAverageFailed < 90 OR @courseAverageFailed > 110 OR @courseAverageDropped < 90 OR @courseAverageDropped > 110
THEN
INSERT INTO alerts(course,courseVarianceApproved, courseVarianceFailed, courseVarianceDropped)
VALUES (@last_id, @approvedVariance, @failedVariance, @droppedVariance);
END IF;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure create_professor
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_professor`(par_fullName VARCHAR(45), par_identification VARCHAR(45), par_createdBy INT)
BEGIN
  INSERT INTO professors(p_fullName, p_identification, p_createdBy)
  VALUES (par_fullName, par_identification, par_createdBy);

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure create_subject
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_subject`(par_name VARCHAR(50), par_code  VARCHAR(50), par_createdBy INT)
BEGIN
INSERT INTO subjects(s_name, s_code, s_createdBy) 
VALUES (par_name,  par_code, par_createdBy);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_course
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_course`(par_c_id INT)
BEGIN
UPDATE courses
SET c_status = 0
WHERE c_id = par_c_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_professor
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_professor`(par_p_id INT)
BEGIN
UPDATE professors
SET p_status = 0
WHERE p_id = par_p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_subject
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_subject`(par_s_id INT)
BEGIN
UPDATE subjects
SET s_status = 0
WHERE s_id = par_s_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_user
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_user`(par_u_id INT)
BEGIN
UPDATE users
SET u_status = 0
WHERE u_id = par_u_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_Campuses
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_Campuses`()
BEGIN
SELECT cp_id, cp_name FROM campuses ORDER BY cp_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_alerts
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_alerts`()
BEGIN
SELECT * FROM alerts LIMIT 5;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_all_courses
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_courses`()
SELECT c_id,p_id,cp_id,s_id,c_quarter,c_year,c_schedule,p_fullName,s_name,cp_Name,c_students_approved,c_students_failed,c_students_dropped 
FROM courses inner join professors 
on c_professor = p_id
inner join campuses 
on c_campus = cp_id
inner join subjects
on c_subject = s_id
where c_status = 1$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_course
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_course`(par_c_subject INT, par_c_campus INT,par_option VARCHAR(15))
BEGIN

IF par_c_campus = 1
THEN
		IF par_option = 'approved'
		THEN
		SELECT  c_students_approved as approved FROM courses WHERE c_subject = par_c_subject ORDER BY c_id DESC LIMIT 10;
		ELSEIF par_option = 'failed'
		THEN 
		SELECT  c_students_failed as failed FROM courses WHERE c_subject = par_c_subject ORDER BY c_id DESC LIMIT 10;
		ELSEIF par_option = 'dropped'
		THEN 
		SELECT  c_students_dropped as dropped FROM courses WHERE c_subject = par_c_subject ORDER BY c_id DESC LIMIT 10;
        END IF;
ELSEIF par_c_campus != 1
THEN
		IF par_option = 'approved'
		THEN
		SELECT  c_students_approved as approved FROM courses WHERE c_subject = par_c_subject AND c_campus = par_c_campus ORDER BY c_id DESC LIMIT 10;
		ELSEIF par_option = 'failed'
		THEN 
		SELECT  c_students_failed as failed FROM courses WHERE c_subject = par_c_subject AND c_campus = par_c_campus ORDER BY c_id DESC LIMIT 10;
		ELSEIF par_option = 'dropped'
		THEN 
		SELECT  c_students_dropped as dropped FROM courses WHERE c_subject = par_c_subject AND c_campus = par_c_campus ORDER BY c_id DESC LIMIT 10;
        END IF;
END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_professors
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_professors`()
BEGIN
SELECT * FROM professors where p_status = 1;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_subjects
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_subjects`()
BEGIN
SELECT * FROM subjects WHERE s_status = 1;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user_by_email
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_by_email`(par_u_username VARCHAR(45))
select u_id
from users
WHERE u_username = par_u_username and u_status = 1$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_users
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_users`()
SELECT * FROM users WHERE u_status = 1$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure login
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `login`(par_username VARCHAR(45), par_password VARCHAR(45))
BEGIN
SET @passwd = md5(par_password);
SELECT u_id as id FROM users  WHERE u_username = par_username AND u_password = @passwd;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure register
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `register`(fullName VARCHAR(45) ,username VARCHAR(45) , passwd VARCHAR(45))
BEGIN
SET @passwd = md5(passwd);
INSERT INTO users (u_username, u_password, u_fullName)
VALUES (username, @passwd, fullName);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_course
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_course`(par_c_id INT, par_c_subject INT, par_c_professor INT,  par_c_campus INT,par_c_schedule TIME, par_c_quarter INT, par_c_year INT,  
par_c_students_approved INT, par_c_students_failed INT, par_c_students_dropped INT)
BEGIN
UPDATE courses
SET c_subject=par_c_subject, c_professor=par_c_professor, c_campus=par_c_campus,c_schedule=par_c_schedule, c_quarter=par_c_quarter, c_year=par_c_year,
 c_students_approved=par_c_students_approved, c_students_failed=par_c_students_failed, c_students_dropped=par_c_students_dropped
 WHERE c_id=par_c_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_password
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_password`(par_u_id INT, par_u_password VARCHAR(45))
UPDATE users 
SET  u_password= md5(par_u_password)
WHERE u_id = par_u_id$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_professor
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_professor`(par_p_id INT,par_fullName VARCHAR(45), par_identification VARCHAR(45))
BEGIN
UPDATE professors
SET p_fullName = par_fullName, p_identification = par_identification
WHERE p_id = par_p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_subject
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_subject`(par_s_id INT, par_s_name VARCHAR(45), par_s_code VARCHAR(45))
BEGIN
UPDATE subjects
SET s_name = par_s_name, s_code = par_s_code
WHERE s_id = par_s_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_user
-- -----------------------------------------------------

DELIMITER $$
USE `ulatina`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_user`(par_u_id INT, par_u_fullName VARCHAR(45), par_u_username VARCHAR(45))
BEGIN
UPDATE users 
SET u_fullName=par_u_fullName, u_username=par_u_username
WHERE u_id = par_u_id;
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
