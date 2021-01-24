var express = require('express');
var todoController = require(__dirname + '/controllers/todoController')
var app = express();

//set template endine
app.set('view engine', 'ejs');

//static file
app.use(express.static(__dirname + '/public'));

//fire controllers
todoController(app);

//listen to port
app.listen(3000);
console.log('You arelistning to port 3000');