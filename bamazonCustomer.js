
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
                // choices: function(){
                //     var productArray = [];
                //     for (var i=0; i < res.length; i++){
                //         productArray.push(res[i].item_id)
                //     }

                // },
                message: "What's the ID of the product you would like to purchase?",
                // validate: function (value) {
                //     if (isNaN(value) === false) {
                //         return true;
                //     }
                //     return false
                // }
            },

            {
                name: "quantity",
                type: "input",
                message: "How many items would you like to buy?",
                // validate: function (value) {
                //     if (isNaN(value) === false) {
                //         return true;
                //     }
                //     return false;
                // }
            }
        ]).then(function (answer) {
            if (err) throw err;
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === answer.productId) {
                    chosenItem = res[i];
                    console.log(chosenItem);
                }
            }

            var newStock;
            for (var i = 0; i < res.length; i++) {
                if (res[i].stock_quantity > parseInt(answer.quantity)) {
                    newStock = res[i];
                }

                var newQuantity = chosenItem.stock_quantity - answer.quantity;
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: answer.productId
                        }
                    ],

                    function (err) {
                        if (err) throw err;
                        console.log("your total amount due is: $" + (answer.quantity * res[i].price));
                        showStore();


                        // total(answer.quantity,res[i].price);
                    }
                );
            }
        
    
        if (res[i].stock_quantity < answer.quantity) {
                if (err) throw err;
                console.log("INSUFFICIENT ITEMS IN STOCK");
                askCust();
            }
        });

    });
}




// function total(number, price) {
//     var total = number * price;
//     console.log("YOUR TOTAL AMOUNT DUE IS:" + "$" + total);
// };


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


