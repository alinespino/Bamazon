
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table ({
            head: ['Id','Product', 'Department', 'Price','Quantity'],
            colWidtch: [10,10,10,10,10]
        });
        for (var i=0; i<res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, 
                res[i].department_name, res[i].price, res[i].stock_quantity]
            )
        }
        console.log(table.toString());


        inquirer.prompt([{
            name: "buyAndAmount",
            type: "input",
            message: "What's the ID of the product you would like to purchase?",
        }])
    });
};