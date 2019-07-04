var md5 = require('md5');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync'); 
var adapter = new FileSync('db.json');
var db = low(adapter);
db.defaults({  users: [] })
  .write();


module.exports.login = (req, res) => {
	res.render("../views/auth");
};

module.exports.postLogin = (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	var user = db.get('users').find({email: email}).value();
	if(!user) {
		res.render("../views/auth", {
			errors: ["User doesn't exist."],
			values: req.body
		});
		return;
	}
	if(md5(password) !== user.password){
		res.render("../views/auth", {
			errors: ["Wrong password"],
			values: req.body
		});
		return;
	}
	res.cookie("userID", user.id);
	res.redirect("/users");

};