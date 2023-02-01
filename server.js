var express = require('express'),
    app = express(),
    port = process.env.PORT || 8000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'),
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes');
routes(app);

// Handle 404 - using this as a last route
app.use(function (req, res) {
  res.status(404).send({ status: '404', url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('todo list API server started on: ' + port);