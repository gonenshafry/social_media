const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'devsensedb',
	multipleStatements: true
});

//connect
db.connect((err) => {
	if(err)
		throw err
	console.log('mysql connected');
});

module.exports = db;