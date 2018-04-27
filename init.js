/*
//create DB devsensedb
app.get('/createdb', (req, res) => {
	let sql = 'CREATE DATABASE devsensedb';
	db.query(sql, (err, result) => {
		if(err)
			console.log(err);
		console.log(result);
		res.send('database devsensedb created');
	});
});

//create users table
app.get('/createusertable', (req, res) => {
	let sql = 'CREATE TABLE users (id int AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), hobbies VARCHAR(255), birthday VARCHAR(255), friends VARCHAR(255), PRIMARY KEY(id))';
	db.query(sql, (err, result) => {
		if(err)
			console.log(err);
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
			if(err)
				console.log(err);
			console.log(result);
		});
		res.send(i + ' users added');
	}//for
});
*/