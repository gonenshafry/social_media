var userModel = require('../models/userModel');
const db = require('../db');

exports.createUser = function(rdp) {
	userModel.id = rdp[Object.keys(rdp)[0]];
	userModel.username = rdp[Object.keys(rdp)[1]];
	userModel.password = rdp[Object.keys(rdp)[2]];
	userModel.hobbies = rdp[Object.keys(rdp)[3]];
	userModel.birthday = rdp[Object.keys(rdp)[4]];
	userModel.friends = rdp[Object.keys(rdp)[5]];

	return userModel;
}