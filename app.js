const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');

const db = require('./db');
var userModel = require('./models/userModel');
var userController = require('./controllers/userController');

const ip = require('ip');
const fs = require('fs');

const app = express();


////initializing db////
/*
//create DB devsensedb
app.get('/createdb', (req, res) => {
	let sql = 'CREATE DATABASE devsensedb';
	db.query(sql, (err, result) => {
		if(err)
			throw(err);
		console.log(result);
		res.send('database devsensedb created');
	});
});

//create users table
app.get('/createusertable', (req, res) => {
	let sql = 'CREATE TABLE users (id int AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), hobbies VARCHAR(255), birthday VARCHAR(255), friends VARCHAR(255), PRIMARY KEY(id))';
	db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Table users created');
	});
});

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
//create users for testing
app.get('/createusers', (req, res) => {
	for(var i=0; i<5 ;i++) {
		let user = {
			//use incrementor for name
			username: i,
			password: i,
			hobbies: '',
			//generate random date
			birthday: randomDate(new Date(2012, 0, 1), new Date()),
			friends: ''
		}
		let sql = 'INSERT INTO users SET ?';
		let query = db.query(sql, user, (err, result) => {
			if(err) throw err;
			console.log(result);
		});
		res.send(i + ' users added');
	}//for
});
*/


////middleware////

app.use(express.static(__dirname + '/public'));
//handlebars setup
app.engine('hbs',hbs({
	extname: 'hbs',
	defaultLayout: 'layout',
	layoutDir: __dirname + '/views'}));
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
		if(err) 
			throw err;
		//user not found, check validation
		if(result.length >0) {
			if(lastip==ip.address()) {
				if (errcnt > 0)
					errcnt--;
				console.log('You have ' + errcnt + ' tries left');
				if(errcnt<=0) {
					fs.createWriteStream('log.txt', {
  						flags: 'a' // 'a' means appending (old data will be preserved)
					});
					var date = new Date();
					logger.write(lastip + ' ' + date.getTime());
				}
			}
			//new ip
			else {
				lastip = ip.address();
				errcnt = 5;
			}
		}//user not found
		//found user
		var rdp = result[Object.keys(result)[0]];
		userModel = userController.createUser(rdp);

		res.redirect('/home');
	});
});


////account home-page////
//load from login
app.get('/home', (req, res, next) => {
	//don't print current user
	let sql = ('SELECT * FROM users WHERE ' + userModel.id + '<> users.id');
	db.query(sql, (err, result) => {
		if(err || result[0] == undefined) 
			throw err;

		res.render('home', {
			title: 'Home Page',
			myuser: userModel,
			userstable: result
		});
	});
});
//post hobbie update
app.post('/updatehobbies', (req,res) => {
	//check hobbies <= 5

	res.render('home', {myuser: userModel});
});
//update friend list
app.post('/addfriend', (req,res) => {
	//check friends <= 5

	res.render('home' + req.param.id, {myuser: userModel});
});


const portnum = 3000;

app.listen(portnum, () => {
	console.log('Server started on port ' + portnum);
});