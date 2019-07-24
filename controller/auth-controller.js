var md5 = require('md5');
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

module.exports.postLogin = (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	// var user = db.get('users').find({email: email}).value();
	var user = User.findOne({email: email}, function (err, obj) {

	if(!obj) {
		res.render("../views/auth", {
			errors: ["User doesn't exist."],
			values: req.body
		});
		return;
	}
	else{
		console.log(obj.email);
	}

	if(md5(password) !== obj.password){
		res.render("../views/auth", {
			errors: ["Wrong password"],
			values: req.body
		});
		return;
	}
	res.cookie("userID", obj._id);
	res.redirect("/users");
	});

};