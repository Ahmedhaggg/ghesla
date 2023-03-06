CREATE DATABASE IF NOT EXISTS picker_service;

CREATE TABLE IF NOT EXISTS `reservation_statuses` (
    `id` INTEGER NOT NULL auto_increment, 
    `name` VARCHAR(30) NOT NULL, 
    PRIMARY KEY (`id`)
);

INSERT IGNORE INTO `reservation_statuses` (`name`) VALUES ("في الانتظار");
INSERT IGNORE INTO `reservation_statuses` (`name`) VALUES ("يقوم به البايكر حاليا");
INSERT IGNORE INTO `reservation_statuses` (`name`) VALUES ("مكتملة");
