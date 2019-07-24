// set for lowdb
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync'); 
var adapter = new FileSync('db.json');
var db = low(adapter);
db.defaults({  users: [] })
  .write();
//set for users model
var User = require('../models/users.js');

//set for mongoose
var mongoose = require('mongoose');
module.exports.login = (req, res) => {
	res.render("../views/auth");
};
module.exports.requireLogin = (req, res, next) => {
	if(!req.cookies.userID){
		res.redirect("/auth/login");
		return;
	}
	var user = db.get('users').find({id: req.cookies.userID}).value();
	var user = User.findOne({_id: req.cookies.userID}, function (err, obj) {
		if(!obj){
		res.redirect("/auth/login");
		return;
	}
	next();
	});
	// if(!user){
	// 	res.redirect("/auth/login");
	// 	return;
	// }
	// next();
};