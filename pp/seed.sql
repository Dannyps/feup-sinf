-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sinf
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `account` (
  `id` varchar(30) NOT NULL,
  `account_description` text NOT NULL,
  `opening_debit_balance` text NOT NULL,
  `opening_credit_balance` text NOT NULL,
  `closing_debit_balance` text NOT NULL,
  `closing_credit_balance` text NOT NULL,
  `grouping_category` text NOT NULL,
  `grouping_code` text,
  `taxonomy_code` int(11) DEFAULT NULL,
  `general_ledger_accounts_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `general_ledger_accounts_id_fk_idx` (`general_ledger_accounts_id`),
  CONSTRAINT `general_ledger_accounts_id_fk` FOREIGN KEY (`general_ledger_accounts_id`) REFERENCES `general_ledger_accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address_detail` varchar(200) NOT NULL,
  `city` varchar(32) NOT NULL,
  `postal_code` varchar(15) NOT NULL,
  `country` enum('AD','AE','AF','AG','AI','AL','AM','AO','AQ','AR','AS','AT','AU','AW','AX','AZ','BA','BB','BD','BE','BF','BG','BH','BI','BJ','BL','BM','BN','BO','BQ','BR','BS','BT','BV','BW','BY','BZ','CA','CC','CD','CF','CG','CH','CI','CK','CL','CM','CN','CO','CR','CU','CV','CW','CX','CY','CZ','DE','DJ','DK','DM','DO','DZ','EC','EE','EG','EH','ER','ES','ET','FI','FJ','FK','FM','FO','FR','GA','GB','GD','GE','GF','GG','GH','GI','GL','GM','GN','GP','GQ','GR','GS','GT','GU','GW','GY','HK','HM','HN','HR','HT','HU','ID','IE','IL','IM','IN','IO','IQ','IR','IS','IT','JE','JM','JO','JP','KE','KG','KH','KI','KM','KN','KP','KR','KW','KY','KZ','LA','LB','LC','LI','LK','LR','LS','LT','LU','LV','LY','MA','MC','MD','ME','MF','MG','MH','MK','ML','MM','MN','MO','MP','MQ','MR','MS','MT','MU','MV','MW','MX','MY','MZ','NA','NC','NE','NF','NG','NI','NL','NO','NP','NR','NU','NZ','OM','PA','PE','PF','PG','PH','PK','PL','PM','PN','PR','PS','PT','PW','PY','QA','RE','RO','RS','RU','RW','SA','SB','SC','SD','SE','SG','SH','SI','SJ','SK','SL','SM','SN','SO','SR','SS','ST','SV','SX','SY','SZ','TC','TD','TF','TG','TH','TJ','TK','TL','TM','TN','TO','TR','TT','TV','TW','TZ','UA','UG','UM','US','UY','UZ','VA','VC','VE','VG','VI','VN','VU','WF','WS','XK','YE','YT','ZA','ZM','ZW','Desconhecido') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pk` (`address_detail`,`city`,`postal_code`,`country`)
) ENGINE=InnoDB AUTO_INCREMENT=51567 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `credit_line`
--

DROP TABLE IF EXISTS `credit_line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `credit_line` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `record_id` int(11) NOT NULL,
  `account_id` varchar(30) NOT NULL,
  `source_document_id` text NOT NULL,
  `system_entry_date` date NOT NULL,
  `description` varchar(45) NOT NULL,
  `credit_amount` double NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `transaction_id_fk_idx` (`transaction_id`),
  KEY `account_id_:fk_idx` (`account_id`),
  CONSTRAINT `credit_line_account_id` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `credit_line_transaction_id_fk` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4520 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `customer` (
  `id` varchar(45) NOT NULL,
  `account_id` varchar(30) DEFAULT NULL,
  `customer_tax_id` varchar(30) NOT NULL,
  `company_name` text NOT NULL,
  `billing_address` int(11) NOT NULL,
  `ship_to_address` int(11) NOT NULL,
  `self_billing_indicator` int(11) NOT NULL,
  `master_files_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `billing_adress_id_idx` (`billing_address`),
  KEY `ship_to_adress_id_idx` (`ship_to_address`),
  KEY `master_files_id_fk_idx` (`master_files_id`),
  KEY `customer_master_files_id_fk_idx` (`master_files_id`),
  KEY `client_id_fk_idx` (`account_id`),
  CONSTRAINT `billing_adress_id` FOREIGN KEY (`billing_address`) REFERENCES `address` (`id`),
  CONSTRAINT `customer_master_files_id_fk` FOREIGN KEY (`master_files_id`) REFERENCES `master_files` (`id`),
  CONSTRAINT `customre_account_id` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `ship_to_adress_id` FOREIGN KEY (`ship_to_address`) REFERENCES `address` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `debit_line`
--

DROP TABLE IF EXISTS `debit_line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `debit_line` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `record_id` int(11) NOT NULL,
  `account_id` varchar(30) NOT NULL,
  `source_document_id` text NOT NULL,
  `system_entry_date` text NOT NULL,
  `description` text NOT NULL,
  `debit_amount` double NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `debit_line_transaction_id_fk_idx` (`transaction_id`),
  KEY `debit_line_account_id_idx` (`account_id`),
  CONSTRAINT `debit_line_account_id` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `debit_line_transaction_id_fk` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3994 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_status`
--

DROP TABLE IF EXISTS `document_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `document_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` text NOT NULL,
  `status_date` date NOT NULL,
  `source_id` text NOT NULL,
  `source_billing` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `general_ledger_accounts`
--

DROP TABLE IF EXISTS `general_ledger_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `general_ledger_accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `taxonomy_reference` varchar(1) NOT NULL,
  `master_files_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `gla_master_files_id_fk_idx` (`master_files_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `gla_master_files_id_fk` FOREIGN KEY (`master_files_id`) REFERENCES `master_files` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `general_ledger_entries`
--

DROP TABLE IF EXISTS `general_ledger_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `general_ledger_entries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number_of_entries` int(11) NOT NULL,
  `total_debit` float NOT NULL,
  `total_credit` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `header`
--

DROP TABLE IF EXISTS `header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `header` (
  `audit_file_version` text,
  `company_id` text,
  `tax_regisration_number` text,
  `tax_Accounting_basis` tinyint(4) DEFAULT NULL,
  `company_name` text,
  `ca_street_name` text,
  `ca_address_detail` text,
  `ca_city` text,
  `ca_postal_code` text,
  `ca_region` text,
  `ca_country` text,
  `fiscal_year` text,
  `start-date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `currency_code` varchar(3) DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `tax_entity` text,
  `product_company_tax_id` text COMMENT 'AKA NIF',
  `software_certificate_number` text,
  `product_id` text,
  `product_version` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `invoice` (
  `invoice_number` varchar(45) NOT NULL,
  `atcud` varchar(45) DEFAULT NULL,
  `ds_invoice_status` varchar(45) DEFAULT NULL,
  `ds_invoice_status_date` datetime DEFAULT NULL,
  `ds_source_billing` varchar(45) DEFAULT NULL,
  `ds_source_id` varchar(45) DEFAULT NULL,
  `hash` text,
  `hash_control` tinyint(4) DEFAULT NULL,
  `period` int(11) DEFAULT NULL,
  `invoice_date` date DEFAULT NULL,
  `invoice_type` enum('FT','FS','FR','ND','NC','VD','TV','TD','AA','DA') DEFAULT NULL,
  `source_id` varchar(45) DEFAULT NULL,
  `system_entry_date` date DEFAULT NULL,
  `customer_id` varchar(45) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `ship_to_id` int(11) DEFAULT NULL,
  `ship_from_id` int(11) DEFAULT NULL,
  `movement_start_time` datetime DEFAULT NULL,
  `document_totals_tax_payable` double DEFAULT NULL,
  `document_totals_net_total` double DEFAULT NULL,
  `document_totals_gross_total` double DEFAULT NULL,
  `whithholding_tax_ammount` double DEFAULT NULL,
  `sales_invoices_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`invoice_number`),
  KEY `invoice_customer_id_fk_idx` (`customer_id`),
  KEY `invoice_transaction_id_fk_idx` (`transaction_id`),
  KEY `invoice_sales_invoices_id_fk_idx` (`sales_invoices_id`),
  KEY `invoice_ship_to_id_fk_idx` (`ship_to_id`),
  KEY `invoice_ship_from_id_fk_idx` (`ship_from_id`),
  CONSTRAINT `invoice_customer_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `invoice_sales_invoices_id_fk` FOREIGN KEY (`sales_invoices_id`) REFERENCES `sales_invoices` (`id`),
  CONSTRAINT `invoice_ship_from_id_fk` FOREIGN KEY (`ship_from_id`) REFERENCES `ship_from` (`id`),
  CONSTRAINT `invoice_ship_to_id_fk` FOREIGN KEY (`ship_to_id`) REFERENCES `ship_to` (`id`),
  CONSTRAINT `invoice_transaction_id_fk` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `journal`
--

DROP TABLE IF EXISTS `journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `journal` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `general_ledger_entries_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `general_ledger_entries_id_fk_idx` (`general_ledger_entries_id`),
  CONSTRAINT `general_ledger_entries_id_fk` FOREIGN KEY (`general_ledger_entries_id`) REFERENCES `general_ledger_entries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `line`
--

DROP TABLE IF EXISTS `line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `line` (
  `id` int(11) NOT NULL,
  `line_number` int(11) NOT NULL,
  `product_code_id` varchar(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_of_measure` text NOT NULL,
  `unit_price` float NOT NULL,
  `tax_point_date` date NOT NULL,
  `description` text NOT NULL,
  `credit_amount` float NOT NULL,
  `tax_id` int(11) NOT NULL,
  `settlement_amount` float NOT NULL,
  `iec_amount` double NOT NULL,
  `arc_no` int(11) DEFAULT NULL,
  `stock_movement_id` varchar(45) DEFAULT NULL,
  `invoice_id` varchar(45) DEFAULT NULL,
  `order_ref_originating_on` varchar(45) DEFAULT NULL,
  `order_ref_order_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tax_id_idx` (`tax_id`),
  KEY `stock_movement_id_fk_idx` (`stock_movement_id`),
  KEY `product_code_idx` (`product_code_id`),
  KEY `line_invoice_id_fk_idx` (`invoice_id`),
  KEY `order_ref_originating_on_id_fk_idx` (`order_ref_originating_on`),
  CONSTRAINT `line_invoice_id_fk` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`invoice_number`),
  CONSTRAINT `line_product_code_id_fk` FOREIGN KEY (`product_code_id`) REFERENCES `product` (`product_code`),
  CONSTRAINT `line_stock_movement_id_fk` FOREIGN KEY (`stock_movement_id`) REFERENCES `stock_movement` (`document_number`),
  CONSTRAINT `line_tax_id_fk` FOREIGN KEY (`tax_id`) REFERENCES `tax_table_entry` (`id`),
  CONSTRAINT `order_ref_originating_on_id_fk` FOREIGN KEY (`order_ref_originating_on`) REFERENCES `stock_movement` (`document_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='a line can hava a invoice or stock_movement';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `master_files`
--

DROP TABLE IF EXISTS `master_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `master_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `movement_of_goods`
--

DROP TABLE IF EXISTS `movement_of_goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `movement_of_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number_of_movement_lines` int(11) NOT NULL,
  `total_quantity_issued` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product` (
  `product_code` varchar(20) NOT NULL,
  `product_type` enum('P','S','O','E','I') NOT NULL,
  `product_group` text NOT NULL,
  `product_description` text NOT NULL,
  `product_number_code` text NOT NULL,
  `master_files_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`product_code`),
  KEY `master_files_idx` (`master_files_id`),
  CONSTRAINT `master_files` FOREIGN KEY (`master_files_id`) REFERENCES `master_files` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sales_invoices`
--

DROP TABLE IF EXISTS `sales_invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sales_invoices` (
  `id` int(11) NOT NULL,
  `number_of_entries` int(11) NOT NULL,
  `total_debit` double NOT NULL,
  `total_credit` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ship_from`
--

DROP TABLE IF EXISTS `ship_from`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ship_from` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `delivery_date` date NOT NULL,
  `address_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `adress_id_idx` (`address_id`),
  CONSTRAINT `ship_from_address_id_fk` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11778 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ship_to`
--

DROP TABLE IF EXISTS `ship_to`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ship_to` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `delivery_date` date NOT NULL,
  `address_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `adress_id_idx` (`address_id`),
  CONSTRAINT `ship_to_address_id_fk` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11094 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stock_movement`
--

DROP TABLE IF EXISTS `stock_movement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `stock_movement` (
  `document_number` varchar(45) NOT NULL,
  `atcud` int(11) NOT NULL,
  `ds_movement_status` varchar(45) NOT NULL,
  `ds_movement_status_date` datetime NOT NULL,
  `ds_source_id` varchar(45) NOT NULL,
  `ds_source_billing` varchar(45) NOT NULL,
  `hash` text NOT NULL,
  `hash_control` int(11) NOT NULL,
  `period` int(11) NOT NULL,
  `movement_date` date NOT NULL,
  `movement_type` text NOT NULL,
  `system_entry_date` date NOT NULL,
  `customer_id` varchar(45) DEFAULT NULL,
  `source_id` text NOT NULL,
  `ship_to_id` int(11) DEFAULT NULL,
  `ship_from_id` int(11) DEFAULT NULL,
  `movement_start_time` date NOT NULL,
  `movement_of_goods_id` int(11) NOT NULL,
  `document_totals_tax_payable` double NOT NULL,
  `document_totals_net_total` double NOT NULL,
  `document_totals_gross_total` double NOT NULL,
  PRIMARY KEY (`document_number`),
  KEY `movement_of_goods_id_fk_idx` (`movement_of_goods_id`),
  KEY `stock_mov_customer_id_idx` (`customer_id`),
  KEY `ship_from_id_fk_idx` (`ship_from_id`),
  KEY `ship_to_id_fk_idx` (`ship_to_id`),
  CONSTRAINT `movement_of_goods_id_fk` FOREIGN KEY (`movement_of_goods_id`) REFERENCES `movement_of_goods` (`id`),
  CONSTRAINT `ship_from_id_fk` FOREIGN KEY (`ship_from_id`) REFERENCES `ship_from` (`id`),
  CONSTRAINT `ship_to_id_fk` FOREIGN KEY (`ship_to_id`) REFERENCES `ship_to` (`id`),
  CONSTRAINT `stock_mov_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `supplier` (
  `id` varchar(255) NOT NULL,
  `account_id` varchar(30) NOT NULL,
  `supplier_tax_id` int(11) NOT NULL COMMENT 'isto é o NIF',
  `company_name` text NOT NULL,
  `billing_address` int(11) NOT NULL,
  `ship_from_address` int(11) NOT NULL,
  `telephone` text,
  `fax` text,
  `website` int(11) DEFAULT NULL,
  `master_files_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `billing_address_idx` (`billing_address`),
  KEY `ship_from_address_fk_idx` (`ship_from_address`),
  KEY `master_files_id_fk_idx` (`master_files_id`),
  KEY `account_id_fk_idx` (`account_id`),
  CONSTRAINT `billing_address_fk` FOREIGN KEY (`billing_address`) REFERENCES `address` (`id`),
  CONSTRAINT `ship_from_address_fk` FOREIGN KEY (`ship_from_address`) REFERENCES `address` (`id`),
  CONSTRAINT `supplier_account_id` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `supplier_master_files_id_fk` FOREIGN KEY (`master_files_id`) REFERENCES `master_files` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tax_table`
--

DROP TABLE IF EXISTS `tax_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tax_table` (
  `id` int(11) NOT NULL,
  `master_files_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tax_table_master_files_id_fk_idx` (`master_files_id`),
  CONSTRAINT `tax_table_master_files_id_fk` FOREIGN KEY (`master_files_id`) REFERENCES `master_files` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tax_table_entry`
--

DROP TABLE IF EXISTS `tax_table_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tax_table_entry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tax_type` enum('IVA','IS') NOT NULL,
  `tax_country_region` text NOT NULL,
  `tax_code` text NOT NULL,
  `tax_percentage` double NOT NULL,
  `tax_description` text NOT NULL,
  `tax_table_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tax_table_id_fk_idx` (`tax_table_id`),
  CONSTRAINT `tax_table_id_fk` FOREIGN KEY (`tax_table_id`) REFERENCES `tax_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2382 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transaction` (
  `id` varchar(255) NOT NULL,
  `period` int(11) NOT NULL,
  `transaction_date` datetime NOT NULL,
  `source_id` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `doc_archival_number` varchar(45) NOT NULL,
  `transaction_type` varchar(45) NOT NULL,
  `gl_posting_date` datetime NOT NULL,
  `supplier_id` varchar(45) DEFAULT NULL COMMENT 'Choice between supplier ID and customer ID. Can appear one of them or none.',
  `customer_id` varchar(45) DEFAULT NULL COMMENT 'Choice between supplier ID and customer ID. Can appear one of them or none.',
  `journal_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `transaction_supplier_id_fk_idx` (`supplier_id`),
  KEY `transaction_customer_id_fk_idx` (`customer_id`),
  KEY `transaction_journal_id_fk_idx` (`journal_id`),
  CONSTRAINT `transaction_customer_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `transaction_journal_id_fk` FOREIGN KEY (`journal_id`) REFERENCES `journal` (`id`),
  CONSTRAINT `transaction_supplier_id_fk` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-13  1:58:39
