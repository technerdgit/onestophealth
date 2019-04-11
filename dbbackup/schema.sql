-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema onestophealth
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema onestophealth
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `onestophealth` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `onestophealth` ;

-- -----------------------------------------------------
-- Table `onestophealth`.`patient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onestophealth`.`patient` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `patient_name` VARCHAR(150) NULL,
  `patient_address1` VARCHAR(150) NOT NULL,
  `patient_address2` VARCHAR(150) NULL,
  `patient_city` VARCHAR(45) NULL,
  `patient_state` VARCHAR(45) NULL,
  `patient_zip` INT(5) NULL,
  `patient_insurance_provider_id` INT(11) NOT NULL,
  `patient_dental_provider_id` INT(11) NULL,
  `patient_insurance_id` INT(20) NULL,
  `patient_dental_insurance_id` INT(20) NULL,
  `patient_login_name` VARCHAR(50) NOT NULL,
  `patient_login_password` VARCHAR(50) NULL,
  PRIMARY KEY (`id`));

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `onestophealth`.`doctor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onestophealth`.`doctor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `doctor_name` VARCHAR(150) NULL,
  `doctor_address1` VARCHAR(150) NOT NULL,
  `doctor_address2` VARCHAR(150) NULL,
  `doctor_city` VARCHAR(45) NULL,
  `doctor_state` VARCHAR(45) NULL,
  `doctor_zip` INT(5) NULL,
  `doctor_specilization` VARCHAR(150) NOT NULL,
  `doctor_login_name` VARCHAR(150) NOT NULL,
  `doctor_password` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`));

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `onestophealth`.`insurance_providers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onestophealth`.`insurance_providers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `provider_name` VARCHAR(150) NOT NULL,
  `provider_type` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `onestophealth`.`patient_doctors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onestophealth`.`patient_doctors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `patient_id` INT NOT NULL,
  `doctor_id` INT NOT NULL,
  `current_doctor` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `doctor_id_idx` (`doctor_id` ASC) VISIBLE,
  INDEX `patient_id_idx` (`patient_id` ASC) VISIBLE,
  CONSTRAINT `doctor_id`
    FOREIGN KEY (`doctor_id`)
    REFERENCES `onestophealth`.`doctor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `patient_id`
    FOREIGN KEY (`patient_id`)
    REFERENCES `onestophealth`.`patient` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `onestophealth`.`doctor_insurance_accepted`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onestophealth`.`doctor_insurance_accepted` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `doctor_id` INT NULL,
  `insurance_accepted_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `doctor_id_idx` (`doctor_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `insurance_accepted_id_idx` (`insurance_accepted_id` ASC) VISIBLE,
  CONSTRAINT `doctor_accepted_id`
    FOREIGN KEY (`doctor_id`)
    REFERENCES `onestophealth`.`doctor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `insurance_accepted_id`
    FOREIGN KEY (`insurance_accepted_id`)
    REFERENCES `onestophealth`.`insurance_providers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `onestophealth`.`patient_records`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onestophealth`.`patient_records` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `doctor_id` INT NOT NULL,
  `record` VARCHAR(2000) NOT NULL,
  `patient_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `doctor_idx` (`doctor_id` ASC) VISIBLE,
  INDEX `patient_id_idx` (`patient_id` ASC) VISIBLE,
  CONSTRAINT `doctor_record_id`
    FOREIGN KEY (`doctor_id`)
    REFERENCES `onestophealth`.`doctor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `patient_record_id`
    FOREIGN KEY (`patient_id`)
    REFERENCES `onestophealth`.`patient` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
