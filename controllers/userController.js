var userModel = require('../models/userModel');
//hobbies & friends <=5
const MAX = 5;

exports.createUser = function(rdp) {
	userModel.id = rdp[Object.keys(rdp)[0]];
	userModel.username = rdp[Object.keys(rdp)[1]];
	userModel.password = rdp[Object.keys(rdp)[2]];
	userModel.hobbies = rdp[Object.keys(rdp)[3]];
	userModel.birthday = rdp[Object.keys(rdp)[4]];
	userModel.friends = rdp[Object.keys(rdp)[5]];
	
	return userModel;
}

exports.fifo = function(arr) {
	var ret = new Object(MAX);
	var size = arr.length;
	for(var i=0; i<MAX;i++) {
		ret[i] = arr[size-(MAX-1)+i];
	}
	return ret;
}

exports.updateUser = function(user, key, val) {
	//FIFO for more than 5 hobbies;
	if(val.length>MAX)
		val = fifo(val);
	user[key] = val;
	return user;
}