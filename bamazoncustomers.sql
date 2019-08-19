DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(200) NOT NULL,
  dept_name VARCHAR(200) NOT NULL,
  price DECIMAL(50, 2) NOT NULL,
  stock_qty INT default 0,
  PRIMARY KEY (item_id)
);


INSERT INTO bamazon.products(product_name, dept_name, price,  stock_qty)
VALUES('City of Girls', 'Books', 48.98, 100);

INSERT INTO bamazon.products(product_name, dept_name, price,  stock_qty)
VALUES('The Outlaw Ocean', 'Books', 50.00, 200);

INSERT INTO bamazon.products(product_name, dept_name, price,  stock_qty)
VALUES('ViewSonic 1080p Projector', 'Electronics', 449.99, 50);

INSERT INTO bamazon.products(product_name, dept_name, price,  stock_qty)
VALUES('Taste of Wild', 'Pet Supplies', 46.99, 70);


INSERT INTO bamazon.products(product_name, dept_name, price,  stock_qty)
VALUES('Fistone RC Robot Dinosaur Intelligent', 'Toys', 42.49, 250);

INSERT INTO bamazon.products(product_name, dept_name, price,  stock_qty)
VALUES('Apple MacBook Air' , 'Computer', 999.99, 80);


INSERT INTO bamazon.products(product_name, dept_name, price,  stock_qty)
VALUES('Optiplex Premium Business Desktop' , 'Computer', 260.99, 120);

INSERT INTO bamazon.products(product_name, dept_name, price,  stock_qty)
VALUES('SENSO Bluetooth Wireless Headphones', 'Sports', 30.50, 300);


INSERT INTO bamazon.products(product_name, dept_name, price,  stock_qty)
VALUES("Timberland PRO Men\'s Steel-Toe Shoe", "Fashion", 99.99, 60);


INSERT INTO bamazon.products(product_name, dept_name, price,  stock_qty)
VALUES('All-New Fire 7 Tablet', 'Movies', 49.99, 100);

SELECT * FROM bamazon.products;