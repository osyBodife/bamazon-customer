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

                    choices:["View Products for sale", 
                              "View Low Inventory",
                            "Add to Inventory", "Add New Product"],                
                    
                    message: "Select current transaction activity"
                },
                
            ])
            .then(function (answer) {
                let request=answer.selectedActivity;
                console.log(request);
                //call the switch function
                doManagersModule(request);


            });
    });
}
managerModule();