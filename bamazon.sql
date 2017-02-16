-- Create the database bamazon_db and specified it for use.
CREATE DATABASE bamazon_db;
USE departments;

-- Create the table departments.
CREATE TABLE departments (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  department_name varchar(30) NOT NULL,
  over_head_costs INTEGER(11) NOT NULL,
  PRIMARY KEY(id)
);

-- Insert a set of records.

