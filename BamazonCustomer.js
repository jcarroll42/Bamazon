var mysql = require('mysql');
var Table = require('easy-table');
var promptly = require('promptly');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'Bamazon'
});

connection.connect(function(err){
	if (err) throw err;
});

function prompting(){
	var orderID = 0;
	var quantity = 0;
	//first prompt: order ID
	promptly.prompt("ID of what you would like to order (type Q to quit): ", function(err, orderInput){
		if (orderInput === 'Q'){
			connection.end();
			return;
		}
		orderID = parseInt(orderInput);
		//second prompt: quantity
		promptly.prompt("Quantity of order: ", function(err, quantInput){
			quantity = parseInt(quantInput);
			//queries to grab quantity
			connection.query('SELECT id, Price, StockQuantity FROM products WHERE ?', {id: orderID}, function(err, orderQuery){
		 		console.log(orderQuery[0].StockQuantity);
		 		//check quantity
		 		if (quantity > orderQuery[0].StockQuantity){
		 			console.log("Insufficient quantity.");
		 			prompting();
		 		}
		 		//if there is enough quantity, fulfil order
		 		else{
		 			var newQuantity = orderQuery[0].StockQuantity - quantity;
		 			var cost = orderQuery[0].Price;
		 			connection.query('UPDATE products SET ? WHERE ?', [{StockQuantity: newQuantity}, {id: orderID}], function(err, result){
		 				console.log('Order complete');
		 				console.log("Total Cost: $" + (quantity * cost));
		 				prompting();
		 			});
		 		}
			});
		});
	});
}

//queries for all products and displays table
connection.query('SELECT id, ProductName, Price FROM products',
	function(err, productList){
		var pickedID = 0;

		if (err) throw err;

		var t = new Table;
		productList.forEach(function(product){
			t.cell('ID', product.id);
			t.cell('Name', product.ProductName);
			t.cell('Price', product.Price);
			t.newRow();
		});
		console.log(t.toString());
		prompting();
});