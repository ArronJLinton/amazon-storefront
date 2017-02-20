
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

// Initiate MySQL Connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  // console.log("connected as id " + connection.threadId);
});

connection.query('SELECT * from products', function (error, results)
{
	console.log("WELCOME TO BAMAZON!")
	// Displays products table
	for(var i=0; i < results.length; i++){
	console.log("Product ID: " + results[i].id);
	console.log("Product Name: "  + results[i].product_name);
	}
	inquirer.prompt([
	{type: "input",
	  name: "product_id",
	  message: "What is the ID of the product you would like to buy?"},
	  {type: "input",
	  name: "quantity",
	  message: "How many units?"}
	]).then(function(data){
		var product = data.product_id;
		var quantity = data.quantity

		connection.query('SELECT * from products where id = ?', product, function (err, result){
			var stock = result[0].stock_quantity;
			var newStock = (stock - quantity);
			var totalCost = (quantity * result[0].price)

			// console.log(result[0].product_name);

		// This condition checks whether or not the stock_quantity can meet quantity requested
			if(quantity <= stock){
				console.log("Yes We Have Enough!")

			// Updates database to reflect the remaining quantity 
				connection.query('UPDATE products SET stock_quantity=? where id=?', [newStock, product], function (err, result){
					console.log('Update Complete')
					console.log('Total Cost: $'+totalCost);
				})
				// Adds record into sales table
				connection.query('INSERT INTO sales SET ?', {
					product_id : product,
					quantity_purchased : quantity
				}, function(error, result){
					console.log('Transaction Complete!')
				})

			}else{
				console.log("Insufficent Quantity!")
			}

		});

	});

});