-- MySQL Script generated by MySQL Workbench
-- dom 26 jan 2020 16:56:17 -03
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema keycash_challenge
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema keycash_challenge
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `keycash_challenge` DEFAULT CHARACTER SET latin1 ;
USE `keycash_challenge` ;

-- -----------------------------------------------------
-- Table `keycash_challenge`.`imovel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `keycash_challenge`.`imovel` (
  `id` VARCHAR(36) NOT NULL,
  `metragem` INT(11) NOT NULL,
  `qtd_quartos` INT(11) NOT NULL,
  `qtd_vagas_garagem` INT(11) NOT NULL,
  `qtd_banheiros` INT(11) NOT NULL,
  `tipo` INT(11) NOT NULL,
  `endereco` VARCHAR(500) NOT NULL,
  `bairro` VARCHAR(300) NOT NULL,
  `municipio` VARCHAR(300) NOT NULL,
  `estado` VARCHAR(2) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `deleted_at` DATETIME NULL DEFAULT NULL,
  `data_lancamento_imovel` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;