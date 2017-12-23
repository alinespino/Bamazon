
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

var chosenItem = {};
// FUNCTIONS // 

//TABLE//
function showStore() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        var table = new Table({
            head: ['Id', 'Product', 'Department', 'Price', 'Quantity'],
            colWidtch: [10, 10, 10, 10, 10]
        });

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name,
                res[i].department_name, res[i].price, res[i].stock_quantity]
            )
        }

        console.log(table.toString());

        askCust();

    });
};

// ONCE ORDER PLACED:
function askCust() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "productId",
                type: "input",
                message: "What's the ID of the product you would like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false
                }
            },

            {
                name: "quantity",
                type: "input",
                message: "How many items would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answer) {
            if (err) throw err;

            connection.query("SELECT * FROM products WHERE item_id = ?", [answer.productId], function (err, res) {
                if (err) throw err;

                // console.log(res);   

                if (res[0].stock_quantity < answer.quantity) {
                    console.log("INSUFFICIENT ITEMS IN STOCK, TRY ANOTHER ITEM.")
                    askCust();
                }
                else if (res[0].stock_quantity >= answer.quantity) {
                    var total = answer.quantity * res[0].price;
                    var newStock = res[0].stock_quantity - answer.quantity;
                    // console.log(res);   
                    console.log("You chose product ID:" + " " + answer.productId + " " + res[0].product_name);
                    console.log("You're purchasing:" + " " + answer.quantity + " " + "item(s)");
                    console.log("Cost of the product is:" + "$" + res[0].price);
                    console.log("Your Total is:" + "$" + total);

                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newStock
                            },

                            {
                                item_id: answer.productId
                            }

                        ])
                        console.log("Items in stock after purchase:" + newStock);
                        console.log("WANT TO ORDER ANOTHER ITEM?");
                        askCust();
                }
               

            }
            );



        });


    })

}



//
// INSTRUCTIONS://
//  Check if your store has enough of the product to meet the customer's request.
// // If not, the app should log a phrase like Insufficient quantity!, and then 
// prevent the order from going through.

// // If your store does have enough of the product, you should fulfill 
// the customer's order.
// // This means updating the SQL database to reflect the remaining quantity.
// // Once the update goes through, show the customer the total cost of their 
// purchase.//

