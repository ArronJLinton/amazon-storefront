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


-- The products table should have each of the following columns:

-- id (unique, auto incrementing primary key not null)

-- product_name (Name of product)

-- department_id (foreign id)

-- price (cost to customer)

-- stock_quantity (how much of the product is available in stores)

-- Then create a Table inside of that database called sales.

-- The sales table should have each of the following columns:

-- id (unique, auto incrementing primary key not null)

-- product_id (foreign id)

-- quantity_purchased

-- created_at (timestamp)