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

function supervisorView(){

  console.log("1) View Product Sales by Department")
  console.log("2) Create New Department")


  inquirer.prompt([
  	{type: "input",
  	  name: "supervisorChoice",
  	  message: "What would you like to do (select number from list above)?"}
  	]).then(function(data){

      if(data.supervisorChoice == 1){

          connection.query('SELECT d.id, d.department_name, d.over_head_costs, SUM(s.quantity_purchased * p.price) AS Product_Sales, SUM(d.over_head_costs - (s.quantity_purchased * p.price)) AS Total_Profit FROM departments d left join products p on d.id = p.department_id left join sales s on s.product_id = p.id GROUP BY d.id;', function (error, results){
              // console.table(results)

              for(var i=0; i < results.length; i++){
                console.table([
                  {
                    DepartmentId : results[i].id,
                    Department_Name : results[i].department_name,
                    Over_Head_Costs : results[i].over_head_costs,
                    Product_Sales : "$" + results[i].Product_Sales,
                    Total_Profit : "$" + results[i].Total_Profit
                }
              ]);
            }
          })
        }else if(data.supervisorChoice == 2){
         inquirer.prompt([
         {type: "input",
           name: "department_name",
           message: "What is the name of the department you would like to add?"},
           {type: "input",
           name: "over_head_cost",
           message: "How much are the over_head_costs?"}
         ]).then(function(data){
          var name = data.department_name
          var overHead = data.over_head_cost;

          connection.query('INSERT INTO departments SET ?', {
            department_Name : name,
            over_head_costs : overHead
          }, function (error, results)
           {
            console.log('Department Inserted!')
          })
        })
      }else{
      console.log("Invalid Selection")
      supervisorView();
     }
  	})
  }supervisorView()





