// set for lowdb
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);
db.defaults({  users: [] })
  .write();
//set for md5
var md5  = require('md5');
//set for shortID 
var ids = require('short-id');


module.exports.seeAllUsers =  (req, res) => {
	
	res.render("../users/user", {
		 users: db.get('users').value()
		
	});
	
};

module.exports.search = (req, res) => {
	var q = req.query.q;
	var result = db.get('users').value().filter( user => {
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
	req.body.password = md5(req.body.password);
	db.get('users')
	.push(req.body)
	.write();
	// res.json(req.boy);
	 res.redirect("/users");

	
};

module.exports.getUser = (req, res) => {
	var id = req.params.id;
	var user = db.get('users').find({ id: id }).value();
	res.render('../users/view-user', {
		user: user
	});
	// res.json(user);
}; 

module.exports.deleteUser = (req,res) => {	
	db.get('users')
	.remove({id: req.params.id})
	.write();
	// res.json(db.get('users').value());
	res.redirect("/users");
};

module.exports.getReplaceUser = (req, res) => {

	var user = db.get('users')
				 .find( {id: req.params.id} )
				 .value();
	res.render('../users/user.replace.pug', {
		user: user
	});
};

module.exports.postReplaceUser = (req, res) => {
	req.body.password = md5(req.body.password);
	console.log(req.params.id);
	db.get('users')
	  .find({ id: req.params.id })
	  .assign({ name: req.body.name,
	  			email: req.body.email,
	  			password: req.body.password
	  			})
	  .write();
	res.redirect('/users');
};