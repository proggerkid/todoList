var http = require('http');
var express = require('express');
var app = express();
var httpServer = http.createServer(app);
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var mongo = require('./mongo');
var routing = require('./routes/routing');
var handleRegistration = require('./handler/handleRegistration');
var handleLogin = require('./handler/handleLogin');
var handleTodo = require('./handler/handleTodo');

app.set('views', './views');
app.set('view engine', 'ejs');

mongo.connect(mongoose);
var User = mongo.createUserModel(mongoose);
var Items = mongo.createItemsModel(mongoose);

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(session({
	secret: "dfjjsioefhwieubfwib378fb8237283rg2387fb783bf",
	resave: true,
	saveUninitialized: false
}));

routing(app);
handleRegistration(app, User);
handleLogin(app, User);
handleTodo(app, Items);	



httpServer.listen(8000);