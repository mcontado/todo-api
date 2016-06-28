var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
// var todos = [{
// 	id: 1,
// 	description: 'Meet DYUG for lunch',
// 	completed: false
// }, {
// 	id: 2,
// 	description: 'Go to market',
// 	completed: false
// }, {
// 	id: 3,
// 	description: 'Study RESTful API',
// 	completed: true
// }];
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

//GET /todos
app.get('/todos', function (req, res) {
	res.json(todos); //converts into json and sends back to whoever call the api
});

//GET /todos/:id
app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);

	//use underscore library instead of for loop below
	var matchedTodo = _.findWhere(todos, {id: todoId});

	// var matchedTodo; 
	// // iterate over todos array. find the match
	// todos.forEach(function (todo) {
	// 	if (todoId === todo.id) {
	// 		matchedTodo = todo;
	// 	}
	// });

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}

});

// Method: POST - can take data
// POST /todos
app.post('/todos', function (req, res) {
	//var body = req.body;

	// user _.pick from underscore library
	var body = _.pick(req.body, 'description','completed');
	
	_.pick({body}, body.completed, body.description);

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}

	body.description = body.description.trim();

	body.id = todoNextId;
	todoNextId++;

	todos.push(body);

	res.json(body);
});

// DELETE /todos/:id
app.delete('/todos/:id', function (req, res) {
	var toDeleteId =  parseInt(req.params.id, 10);
	var matchedIDToDelete = _.findWhere(todos, {id: toDeleteId});

	if (matchedIDToDelete) {
		todos = _.without(todos, matchedIDToDelete);
		res.json(matchedIDToDelete);
	} else {
		res.status(404).json({"error:" : "no todo found with that id"});
	}

});

// PUT  /todos/:id
app.put('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	var body = _.pick(req.body, 'description','completed');
	var validAttributes = {};

	if (!matchedTodo) {
		return res.status(404).send();  //404 page not found
	}

	if (body.hasOwnProperty('completed')  && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	} 

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description.trim();
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	} 

	//update here
	_.extend(matchedTodo, validAttributes);
	
	res.json(matchedTodo);

});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');  
});