const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');

const db = require('./db');
var userModel = require('./models/userModel');
const userController = require('./controllers/userController');
const validator = require('./controllers/validator');

const app = express();


////init db////
//const initiator = require('./init');

////middleware////

app.use(express.static(__dirname + '/public'));
//handlebars setup
app.engine('hbs', hbs ({
	helpers: {
		hasval: function (arr) {
			return (arr.includes(userModel.id));
		},
		getuserid: function() {
			return userModel.id;
		}
	},
	extname: 'hbs',
	defaultLayout: 'layout',
	layoutDir: __dirname + '/views/layouts'
}));

app.set('view engine', 'hbs');
//view engine setup
app.set('views', __dirname + '/views')
//app.engine('html', require('ejs').renderFile);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


////routes////

//login page
app.get('/login', (req, res) => {
	res.render('login', {title: 'Login Page'});
});

var lastip='', errcnt=5;

app.post('/login', (req, res) => {
	let sql = ('SELECT * FROM users WHERE username = ' + req.body.username + ' AND password = ' + req.body.password);
	db.query(sql, (err, result) => {
		if(err || result == undefined) 
			console.log(err);
		//check username & password
		validator.validate(lastip, errcnt, result);
		//found user
		//create new model
		var rdp = result[Object.keys(result)[0]];
		userModel = userController.createUser(rdp);
		//push model to update
		res.redirect('/home');
	});
});


////account home-page////
//load from login or reload pag from uodate
app.get('/home', (req, res, next) => {
	//get users table, don't print current user
	let sql = ('SELECT * FROM users WHERE ' + userModel.id + ' <> users.id');
	db.query(sql, (err, result) => {
		if(err || result == undefined) 
			console.log(err);
		//push to view
		res.render('home', {
			title: 'Home Page',
			myuser: userModel,
			userstable: result
		});
	});
});
//post hobbie update
app.post('/updatehobbies', (req,res) => {
	//get new hobbies from textbox
	var hobbies = (req.body.hobbies).split(/[ ,]+/);
	//post error, reload page
	if(validator.noval(hobbies))
		res.redirect('/home');
	//update model
	userModel = userController.updateUser(userModel, "hobbies", hobbies);
	
	//update DB
	let sql = ('UPDATE users SET hobbies = "' + userModel.hobbies + '" WHERE id = ' + userModel.id);
	db.query(sql, (err, result) => {
		if(err || result == undefined) 
			console.log(err);
	});

	//update view
	res.redirect('/home');
});
//update friend list
app.post('/addfriend', (req,res) => {

	console.log(req.body.id);
/*
	let sql = "SELECT friends FROM users ";
	db.query(sql, (err, result) => {
		if(err || result == undefined) 
			console.log(err);

		console.log(result.affectedRows + " record(s) updated");

		res.render('home', {
			title: 'Home Page',
			myuser: userModel,
			userstable: result
		});
	});
	*/
	//check friends <= 5

	res.render('home');
});


const portnum = 3000;

app.listen(portnum, () => {
	console.log('Server started on port ' + portnum);
});