
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

    //Create table // 

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

        // ask user // 

        inquirer.prompt([{
            name: "productId",
            type: "input",
            message: "What's the ID of the product you would like to purchase?"
        },
        {
            name:"amount",
            type: "input",
            message:"How many units would you like to buy?",
            // validate:function (answer){
            //     if((answer.amount) > this.stock_quantity){
            //         placeOrder();
            //         return(true);
            //         console.log(this.stock_quantity);
            //     }
            //     else {
            //         console.log(" "+ "items."+ "Sorry, we are unable to process your order, Insufficient items in store!!")
            //     }
            //     return(false);
            // }
        
        }])
    
    })
 
};


// ONCE ORDER PLACED:

// Check if your store has enough of the product to meet the customer's request.
// // If not, the app should log a phrase like Insufficient quantity!, and then 
// prevent the order from going through.

// // If your store does have enough of the product, you should fulfill 
// the customer's order.
// // This means updating the SQL database to reflect the remaining quantity.
// // Once the update goes through, show the customer the total cost of their 
// purchase.//

function placeOrder(){


}



// DISPLAY CUST TOTAL AMOUNT OFORDER

function total(){


}