CREATE DATABASE IF NOT EXISTS myanmar_recap
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE myanmar_recap;

CREATE TABLE IF NOT EXISTS projects (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(70) NOT NULL,
  content_type VARCHAR(40) NOT NULL,
  output_language VARCHAR(30) NOT NULL,
  status ENUM('Draft', 'In Progress', 'Completed') NOT NULL DEFAULT 'Draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
