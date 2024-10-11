CREATE DATABASE food_fairy;

USE food_fairy;

CREATE TABLE donors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact VARCHAR(255) NOT NULL,
  address TEXT
);

CREATE TABLE beneficiaries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact VARCHAR(255) NOT NULL,
  address TEXT
);

CREATE TABLE distribution_centers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  capacity INT
);

CREATE TABLE food_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100)
);

CREATE TABLE delivery_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  donor_id INT,
  beneficiary_id INT,
  distribution_center_id INT,
  food_type_id INT,
  quantity INT,
  delivery_date DATE,
  FOREIGN KEY (donor_id) REFERENCES donors(id),
  FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id),
  FOREIGN KEY (distribution_center_id) REFERENCES distribution_centers(id),
  FOREIGN KEY (food_type_id) REFERENCES food_types(id)
);