## bamazon-customer
The App is a Node.js application designed to help users select product they want to buy.
The Following technologies were used to developed the Application
1. Mysql as database
2. Node.js
3. Dependencies include;
    1. npm modules
    2. npm inquirer module
    
    !["Image"](assets/images/dependencies_db_connection.png "db connection")
   
## Currently the Application has two modules as follows;
1. Customer Module
   1.This is designed to enable a customer buy things from tha App
   2. It can be acces from node.js using bamazoncustomers.js
2. Manager Module
   1. This module is accessed through bamazonManager.js file
   2. It is designed to enable Manager add inventory, pull reports , add new products to store etc

### Sample of Transaction Activities
# Customer Module
a. The Store prompts the user to select product based on what is available on DB

!["Image"](assets/images/customer_prompt_select_product_01.png "customer prompt image")

b. customers makes a select of product with ID of 3
!["Image"](assets/images/customer_select_03.png "customer makes a selection")

c. Purchased Confirmed and Db updated
!["Image"](assets/images/purchase_confirmed.png "purchase confirmed")

d. Cost of Purchase Computed and displayed
<br>
!["Image"](assets/images/cost_of_purchase.png "cost of purchase confirmed")

e. Customer selects more quantity is available in db
<br>
!["Image"](assets/images/insufficient_qty.png "insufficient quantity")

f. Updating Transactions in the Database
<br>
  i. image 1 Database Bafore the transaction
  <br>
  !["Image"](assets/images/database_before.jpg "database before")
  <br>
  ii. image 2 Database after the transaction
  <br>
  !["Image"](assets/images/database_after.jpg "database after")
  <br>
  <br>
  ## Manager Module
  <br>
  ### Manager Acivity Options
  <br>
!["Image"](assets/images/manager_module_options.png "manager options")
<br>
1. View Products on Sale
<br>
!["Image"](assets/images/manager_module_view_products_onsale.png "manager options")
<br>
2. View Low Inventory
!["Image"](assets/images/manager_module_view_low_inventory.png "manager options")
