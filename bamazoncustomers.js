var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Internet@922",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
});


function buyProducts() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "product_name",
                    type: "list",
                    choices: function () {
                        var productArray = [];
                        for (var i = 0; i < results.length; i++) {
                            //choiceArray.push(results[i].product_name);
                            productArray.push(results[i].product_name);
                        }
                        console.log(productArray);
                        return productArray;
                    },
                    message: "Select the ID of the product you would like to buy?"
                },
                {
                    name: "qty",
                    type: "input",
                    message: "Enter the quanity you want to buy?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }

                
            });
    });
}
*/