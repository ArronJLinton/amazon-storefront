
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


// function selectTable(table){
// 	connection.query('SELECT * from ' + table, function (error, results, fields) {
// 	  if (error) throw error;
// 	  console.log(results);
// 	});
// }

connection.query('SELECT * from products', function (error, results, fields)
{
	// console.log(results);
	console.log('\n');

	inquirer.prompt([
	{type: "input",
	  name: "product_id",
	  message: "What is the ID of the product you would like to buy?"}
	]).then(function(data){
		var product = data.product_id;
		console.log(product);

		// connection.query('SELECT * from beers', function (error, results, fields) {
		// 	console.log(results);
		// 	console.log('\n');
		// 	inquirer.prompt([
		// 	{type: "input",
		// 	  name: "beer_id",
		// 	  message: "Put the id of the beer that you want."}
		// 	]).then(function(data){
		// 		//do an insert into mysql 
		// 		connection.query('INSERT into dranken_beers SET ?', {
		// 			beer_id : data.beer_id,
		// 			dranker_id : dranker
		// 		}, function (error, results, fields) {
		// 			console.log('insert complete')
		// 		});
		// 	});
		// });

	});
});