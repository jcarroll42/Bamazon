var mysql = require('mysql');
var Table = require('easy-table');
var inquirer = require('inquirer');

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

//initiate prompt. NOTE: Had to include the confirm because inquirer is buggy in Windows if list is the first type.
inquirer.prompt([
	{
		type: "confirm",
		message: "Use manager console?",
		name: "confirm",
		default: true
	},
	{
		type: "list",
		message: "Options:",
		choices: ["1) View products for sale", "2) View low inventory", "3) Add to inventory", "4) Add new product"],
		name: "selectedOption"
	}
]).then(function(action){
	console.log(action.selectedOption);

	switch(action.selectedOption){
		case "1) View products for sale":
		viewAll();
		break;
		case "2) View low inventory":
		viewLowStock();
		break;
		case "3) Add to inventory":
		addQuantity();
		break;
		case "4) Add new product":
		addProduct();
		break;
		default:
		console.log("Bad input");
	}
});

function viewAll(){
	connection.query('SELECT * FROM products',
		function(err, productList){

		if (err) throw err;

		var t = new Table;
		productList.forEach(function(product){
			t.cell('ID', product.id);
			t.cell('Name', product.ProductName);
			t.cell('Department', product.DepartmentName);
			t.cell('Price', product.Price);
			t.cell('Stock Quantity', product.StockQuantity)
			t.newRow();
		});
		console.log(t.toString());
	});
}

function viewLowStock(){
	connection.query('SELECT * FROM products WHERE StockQuantity <= 5',
		function(err, productList){
			if (err) throw err;

			var t = new Table;
			productList.forEach(function(product){
				t.cell('ID', product.id);
				t.cell('Name', product.ProductName);
				t.cell('Department', product.DepartmentName);
				t.cell('Price', product.Price);
				t.cell('Stock Quantity', product.StockQuantity)
				t.newRow();
			});
			console.log(t.toString());
		}
	)
}

function addQuantity(){
	inquirer.prompt([
		{
			type: 'input',
			message: "ID of product to add quantity: ",
			name: "id"
		},
		{
			type: 'input',
			message: "Quantity to add: ",
			name: "quantity"
		},
	]).then(function(item){
		var newQuantity = parseInt(item.quantity);
		connection.query('UPDATE products SET StockQuantity = StockQuantity +' + newQuantity +' WHERE ?', {id: item.id}, function(err, result){
			console.log('Update complete');
		});
	});
}

function addProduct(){
	inquirer.prompt([
		{
			type: 'input',
			message: 'Product name: ',
			name: 'name'
		},
		{
			type: 'input',
			message: 'Department: ',
			name: 'department'
		},
		{
			type: 'input',
			message: 'Price: ',
			name: 'price'
		},
		{
			type: 'input',
			message: 'Stock Quantity: ',
			name: 'quantity'
		}
	]).then(function(item){
		var price = parseFloat(item.price);
		var quantity = parseInt(item.quantity);
		connection.query('INSERT INTO products SET ?', {ProductName: item.name, DepartmentName: item.department, Price: item.price, StockQuantity: item.quantity}, function(err, res){
			console.log("Item added.");
		});
	});
}