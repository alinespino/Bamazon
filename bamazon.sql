

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL  (10,2)    NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);
 

 
 INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
 VALUES ( 1, "iphone X", "Electronics", 250, 10);
  INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
 VALUES ( 2, "Apple Watch", "Electronics", 100, 100);
  INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
 VALUES ( 3, "Nintendo Switch", "Electronics", 75, 7);
  INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
 VALUES ( 4, "Fuji Instax Mini Camera", "Electronics", 50, 25);
  INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
 VALUES ( 5, "Fitbit", "Electronics", 250, 10);
  INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
 VALUES ( 6, "Keurig", "Kitchen", 90, 70);
  INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
 VALUES ( 7, "Apple AirPods", "Electronics", 99, 80);
  INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
 VALUES ( 8, "GoPro", "Electronics", 200, 20);
  INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
 VALUES ( 9, "Star Wars BB8", "Toys", 99, 50);
  INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
 VALUES ( 10, "Jenga", "Toys", 5, 500);
 
  

-- 
-- USE bamazonDB;
-- SELECT * FROM products












