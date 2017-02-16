
/*
step 1 make a folder
step 2 go into the folder
step 3 npm init
step 4 npm install mysql --save
step 5 make a connection.js file
step 6 copy and paste what I slacked out into connection.js
step 7 run it 
step 8 if it breaks change it until it works
*/

var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Lin91650',
  database : 'bamazon_db',
});

connection.connect();