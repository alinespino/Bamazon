
var mysql = require("mysql");
var inquirer = require("inquirer");

// connect to mysql // 
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    showStore();

});

//end//

// FUNCTIONS // 

function showStore() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(results);
        inquirer.prompt([{
            name: "buyAndAmount",
            type: "input",
            message: "What's the ID of the product you would like to purchase?",
        }])
    });
};