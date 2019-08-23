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
/*
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
});
*/
//create 4 functions as follows ; view products for sale
//View low inventory
//add to inventory
//add new product
//use switch and call the functions within the switch
let request;

function viewProductsOnsale() {
    //select all products and render results
    var query = connection.query("SELECT * FROM products ", function (err, res) {
        if (err) throw err;
        console.log("item_id" + "|" + "Product" + "|" + "Dept" + "|" + "Price" + "|" + "StockQty")
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].dept_name + " | " + res[i].price + "|" + res[i].stock_qty);
            //console.log(res[i].item_id + " | " + res[i].stock_qty + " | " + res[i].price + " | " + res[i].product_name);
        }
        // logs the actual query being run
        console.log(query.sql);

    });
}






function viewLowInventory() {

    var query = connection.query("SELECT * FROM products WHERE stock_qty <5", function (err, res) {
        if (err) throw err;
        console.log("item_id" + "|" + "Product" + "|" + "Dept" + "|" + "Price" + "|" + "StockQty")
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].dept_name + " | " + res[i].price + "|" + res[i].stock_qty);
            //console.log(res[i].item_id + " | " + res[i].stock_qty + " | " + res[i].price + " | " + res[i].product_name);
        }
        // logs the actual query being run
        console.log(query.sql);

    });

}


//create a function that updates stock
function updateProduct(current_stock, selectedItem_id) {
    console.log("Updating Stock position with ...\n");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_qty: current_stock
            },
            {
                item_id: selectedItem_id
            }
        ],
        function (err, res) {
            console.log(res.affectedRows + " product updated!\n");
            // Call deleteProduct AFTER the UPDATE completes

        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

addToStock = function (qty, selectedItem_id, callback) {
    //select qty from db
    //make a function with callback()
    //genre=?", ["Dance"], function(err, res) {
    var query = connection.query("SELECT * FROM products WHERE item_id=?", [selectedItem_id], function (err, res) {
        if (err) throw err;

        let dbQty = parseInt(res[0].stock_qty);
        console.log("old stock qty : " + dbQty);

        //update db stock with the purchase
        let current_stock = dbQty + qty;
        //call stock update function
        updateProduct(current_stock, selectedItem_id);
        callback();



        // logs the actual query being run
        console.log(query.sql);

    });

}


//create functions that renders db position after each purchase activity
callback = function () {
    //select all products and render results
    var query = connection.query("SELECT * FROM products ", function (err, res) {
        if (err) throw err;
        console.log("item_id" + "|" + "Product" + "|" + "Dept" + "|" + "Price" + "|" + "StockQty")
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].dept_name + " | " + res[i].price + "|" + res[i].stock_qty);
            //console.log(res[i].item_id + " | " + res[i].stock_qty + " | " + res[i].price + " | " + res[i].product_name);
        }
        // logs the actual query being run
        console.log(query.sql);

    });
}


// INSERT INTO bamazon.products(product_name, dept_name, price, stock_qty)
// VALUES("Timberland PRO Men\'s Steel-Toe Shoe", "Fashion", 99.99, 60);

function insertProduct(product_name, dept_name, price, stock_qty) {    
    var sql = `INSERT INTO bamazon.products(product_name, dept_name, price, stock_qty) VALUES(?,?,?,?)`;
    var query = connection.query(sql,[product_name,dept_name, price,stock_qty], function (err, res) {
        if (err) throw err;

    });
}


function addToInventory() {
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
                            //productArray.push(results[i].item_id + ":" + results[i].product_name);
                            productArray.push(results[i].item_id + ":" + results[i].product_name);
                            //productArray.push(results[i].product_name);
                        }
                        //console.log(productArray);
                        return productArray;
                    },
                    message: "Select the product you would like to update the inventory?"
                },
                {
                    name: "qty",
                    type: "input",
                    message: "Enter the stock quanity you want to add to the inventory?",
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

                qty = parseInt(answer.qty);
                console.log("Qty to be added : " + qty);
                console.log(answer.product_name);
                var str = answer.product_name;
                var selectedItem = str.split(":");
                console.log(selectedItem);
                let selectedItem_id = selectedItem[0];
                let item_name = selectedItem[1];


                //call update function
                //use callback function to display after update
                addToStock(qty, selectedItem_id, callback);


            });
    });
}




function doManagersModule(request) {

    switch (request) {
        case "View Products for sale":
            viewProductsOnsale();
            break;

        case "View Low Inventory":
            viewLowInventory();
            break;

        case "Add to Inventory":
            addToInventory();
            break;

        case "Add New Product":
            addNewProduct();
            break;

        default:
            alert("Sorry, please try again.")
            break;
    }
}


function addNewProduct() {

    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
        .prompt([
            {
                name: "item_name",
                type: "input",
                message: "Enter the name of product you want to add to the store",
                validate: function (value) {                    
                    if (typeof value === "string") {
                      return true;
                 } else {
                       return false;
                    }

                },

            },
            {
                name: "item_qty",
                type: "input",
                message: "Enter the stock quanity you want to add to the inventory?",
                validate: function (value) {
                    if (isNaN(value) === false) {

                        return true;

                    }
                    return false;
                }
            },

            {
                name: "item_price",
                type: "input",
                message: "Enter the price of the item",
                validate: function (value) {
                    if (isNaN(value) === false) {

                        return true;

                    }
                    return false;
                }
            },

            {
                name: "item_dept",
                type: "input",
                message: "Which department does the product belong to?",
                validate: function (value) {
                    if (typeof value === "string") {
                        return true;
                    } else {
                        return false;
                    }

                },
            },


        ])
        .then(function (answer) {
            let product_name = answer.item_name;
            let dept_name = answer.item_dept;
            let price = answer.item_price;
            let stock_qty = answer.item_qty;

            //call insert function
            insertProduct(product_name, dept_name, price, stock_qty,callback);
            //callback();


        });

}





function managerModule() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "selectedActivity",
                    type: "list",

                    choices: ["View Products for sale",
                        "View Low Inventory",
                        "Add to Inventory", "Add New Product"],

                    message: "Select current transaction activity"
                },

            ])
            .then(function (answer) {
                let request = answer.selectedActivity;
                console.log(request);
                //call the switch function
                doManagersModule(request);


            });
    });
}
managerModule();