// set for lowdb
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);
db.defaults({  users: [] })
  .write();


//set for shortID 
var ids = require('short-id');


module.exports.seeAllUsers = (req, res) => {
	res.render("../users/user", {
		users: db.get('users').value()

	})
};

module.exports.search = (req, res) => {
	var q = req.query.q;
	console.log(db.get('users'));
	var result = db.get('users').filter( user => {
		return user.name.indexOf(q) !== -1;
	});
	res.render("../users/user", {

		users: result

	})
};

module.exports.getCreate = (req, res) => {
	res.render("../users/user-create");
};


module.exports.postCreate = (req, res) => {
	req.body.id = ids.generate();
	db.get('users')
	.push(req.body)
	.write();
	res.redirect("/users");
};

module.exports.getUser = (req, res) => {
	var id = req.params.id;
	var user = db.get('users').find({ id: id }).value();
	res.render('../users/view-user', {
		user: user
	});
}; 