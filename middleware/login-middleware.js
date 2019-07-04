// set for lowdb
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync'); 
var adapter = new FileSync('db.json');
var db = low(adapter);
db.defaults({  users: [] })
  .write();

module.exports.requireLogin = (req, res, next) => {
	if(!req.cookies.userID){
		res.redirect("/auth/login");
		return;
	}
	var user = db.get('users').find({id: req.cookies.userID}).value();
	if(!user){
		res.redirect("/auth/login");
		return;
	}
	next();
};