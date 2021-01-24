var mongoose = require('mongoose');
var bodyParser = require('body-parser');


//connect to data base
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', function() {
    console.log('connection created');
}).on('error', function(err) {
    console.log(err);
});

//create a schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({ item: 'Start coding' }).save(function(err) {
//     if (err) throw err;
// });
//var data = [{ item: 'start coding' }, { item: 'Start projects' }, { item: 'complete DSA' }];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {


    app.get('/todo', function(req, res) {
        //get data from mongodb
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        });

    });

    app.post('/todo', urlencodedParser, function(req, res) {
        //get data from view and add to db
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        });


    });

    app.delete('/todo/:item', function(req, res) {
        //delete the item
        console.log(req.params.item.replace(/-/g, " "));
        Todo.find({ item: req.params.item.replace(/-/g, " ") }).remove(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
        // Todo.deleteOne({item: })

    });
};