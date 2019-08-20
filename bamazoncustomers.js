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
let price;
let qty;
checkStock = function (qty, selectedItem_id) {
    //select qty from db
    //if inputQty>dbQty...stop sales
    //else sell and update db
    //make a function with callback()
    //genre=?", ["Dance"], function(err, res) {
    var query = connection.query("SELECT * FROM products WHERE item_id=?",[selectedItem_id] ,function (err, res) {
        if (err) throw err;
        // for (var i = 0; i < res.length; i++) {
        //     console.log(res[i].item_id + " | " + res[i].stock_qty + " | " + res[i].price + " | " + res[i].product_name);
        // }
        let dbQty=res[0].stock_qty;
        let price=res[0].price;
        //console.log("Qty available : " + dbQty);
        if(qty <= dbQty){
            // process purchase
            
            console.log(`Your purchase of ${qty} units of ${res[0].product_name} was successfully`);
            //update db stock with the purchase
            let current_stock= dbQty-qty;
            //call stock update function
            updateProduct(current_stock, selectedItem_id);


        }else{
            //
            console.log("Insufficient quantity");
        }

        // logs the actual query being run
        console.log(query.sql);

    });

}


function updateProduct(current_stock,selectedItem_id) {
    console.log("Updating Stock position after the purchase...\n");
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
            console.log(res.affectedRows + " products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}





callback = function () {
    //select all products and render results



    

}

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
                            //productArray.push(results[i].item_id + ":" + results[i].product_name);
                            productArray.push(results[i].item_id + ":" + results[i].product_name + ":" + results[i].price);
                            //productArray.push(results[i].product_name);
                        }
                        //console.log(productArray);
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
                //console.log(answer.qty);
                console.log(answer.qty);
                qty = answer.qty;
                console.log(answer.product_name);
                var str = answer.product_name;
                var selectedItem = str.split(":");
                console.log(selectedItem);
                let selectedItem_id = selectedItem[0];
                let item_name = selectedItem[1];


                //call checkstock function
                
                checkStock(qty,selectedItem_id);
               

            });
    });
}
buyProducts();
