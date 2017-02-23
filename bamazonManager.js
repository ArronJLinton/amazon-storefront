var inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");

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


function managerView(){

console.log("Actions:")
console.log("1) View Products for Sale")
console.log("2) View Low Inventory")
console.log("3) Add to Inventory")
console.log("4) Add New Product")

inquirer.prompt([
	{type: "input",
	  name: "managerChoice",
	  message: "What would you like to do (select number from list above)?"}
	]).then(function(data){

		// This condition lists all products for sale
		if(data.managerChoice == 1){

			connection.query('SELECT * from products', function (error, results)
				{
					console.table(results);
				// 	for(var i=0; i<results.length; i++){
				// 		console.table([
				// 			{Product_ID : results[i].id,
				// 				Product_Name : results[i].product_name,
				// 				Price : results[i].price,
				// 				Inventory : results[i].stock_quantity
				// 		}
				// 	])
				// }
				managerView();
			})

		// This condition list all products with quantities less than 5 
		}else if(data.managerChoice == 2){
			connection.query('SELECT * from products', function (error, results)
				{

					for(var i=0; i<results.length; i++){
						if(results[i].stock_quantity <= 5){
							// console.table(results);
						console.table([
							{Product_ID : results[i].id,
								Product_Name : results[i].product_name,
								Price : results[i].price,
								Inventory : results[i].stock_quantity
							}
						])
					}
				}
				managerView();
			})
			// else{
			// 			console.log("Inventory Up to Date");
			// 			managerView()
			// 	}

		// This condition allows manager to add to inventory
		}else if(data.managerChoice == 3){
			inquirer.prompt([
			{type: "input",
			  name: "product_id",
			  message: "What is the ID of the product you would like to add more of?"},
			  {type: "input",
			  name: "add_quantity",
			  message: "How many units?"}
			]).then(function(data){

				var product = data.product_id
				connection.query('SELECT * from products where id=?', product, function (error, result){
				
				var stock = result[0].stock_quantity;
				var newStock = (stock + data.add_quantity);

					connection.query('UPDATE products SET stock_quantity=? where id=?', [newStock, product], function (err, result){
					console.log('Update Complete')
					console.log("New Inventory: " + newStock)
					managerView();
					})
				});
			})

		// This condition allows the manager to add new products
		}else if(data.managerChoice == 4){
			inquirer.prompt([
			{type: "input",
			 name: "product_name",
			 message: "What is the name of the product you would like to add?"},	
			{type: "input",
			 name: "dept_id",
			 message: "What is the ID of the Department you would like this product to go into?"},
			{type: "input",
			 name: "quantity",
			 message: "How many units?"},
			{type: "input",
			 name: "price",
			 message: "What is the price per unit (ex. 5.99)?"}
			]).then(function(data){
				var newProduct = data.product_name;
				var dept = data.dept_id;
				var quantity = data.quantity;
				var price = data.price;

				connection.query('INSERT INTO products SET ?', {
					product_name : newProduct,
					department_id : dept,
					stock_quantity : quantity,
					price : price
				}, function(error, result){
					console.log('Insert Complete!')
					managerView()
				})
			})
		}else{
			console.log("Invalid Selection")
			managerView();
		}
	});
} managerView();