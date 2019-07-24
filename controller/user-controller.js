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

//set for users model
var User = require('../models/users.js');

//set for mongoose
var mongoose = require('mongoose');


// module.exports.seeAllUsers =  (req, res) => {
	
// 	res.render("../users/user", {
// 		 users: db.get('users').value()
		
// 	});
	
// };

module.exports.seeAllUsers = async (req, res) => {

	var user = await User.find();
	res.render('../users/user', {
		users: user
	});
};

// module.exports.search = (req, res) => {
// 	var q = req.query.q;
// 	var result = db.get('users').value().filter( user => {
// 		return user.name.indexOf(q) !== -1;
// 	});
// 	res.render("../users/user", {

// 		users: result

// 	})
// };

module.exports.search = async (req, res) => {
	var q = req.query.q;
	var users = await User.find();
	var result = users.filter( element => {
		return element.name.indexOf(q) !== -1;
 	});
 	res.render("../users/user", {
 		users: result
 	});

};

module.exports.getCreate = (req, res) => {
	res.render("../users/user-create");
};


// module.exports.postCreate = (req, res) => {
// 	req.body.id = ids.generate();
// 	req.body.password = md5(req.body.password);
// 	db.get('users')
// 	.push(req.body)
// 	.write();
// 	// res.json(req.boy);
// 	 res.redirect("/users");

	
// };

module.exports.postCreate = (req, res) => {
	req.body.password = md5(req.body.password);
	var user = new User({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	user.save( (error) => {
		if(error) return console.log(error);
	}); 
	res.redirect("/users");
};

// module.exports.getUser = (req, res) => {
// 	var id = req.params.id;
// 	var user = db.get('users').find({ id: id }).value();
// 	res.render('../users/view-user', {
// 		user: user
// 	});
// 	// res.json(user);
// }; 

module.exports.getUser = async (req, res) => {
	var id = req.params._id;
	var user = await User.findById(id);
	res.render('../users/view-user', {
		user: user
	});
};

// module.exports.deleteUser = (req,res) => {	
// 	db.get('users')
// 	.remove({id: req.params.id})
// 	.write();
// 	// res.json(db.get('users').value());
// 	res.redirect("/users");
// };

module.exports.deleteUser = (req, res) => {
	User.findByIdAndRemove({_id: req.params._id}, (error, docs) => {}
	);
	res.redirect('/users');
}; 

// module.exports.getReplaceUser = (req, res) => {

// 	var user = db.get('users')
// 				 .find( {id: req.params.id} )
// 				 .value();
// 	res.render('../users/user.replace.pug', {
// 		user: user
// 	});
// };


module.exports.getReplaceUser = async (req, res) => {
	var user = await User.findById(req.params._id);
	res.render('../users/user.replace.pug', {
		user: user
	});
};


// module.exports.postReplaceUser = (req, res) => {
// 	req.body.password = md5(req.body.password);
// 	console.log(req.params.id);
// 	db.get('users')
// 	  .find({ id: req.params.id })
// 	  .assign({ name: req.body.name,
// 	  			email: req.body.email,
// 	  			password: req.body.password
// 	  			})
// 	  .write();
// 	res.redirect('/users');
// };

module.exports.postReplaceUser = (req, res) => {
	User.findByIdAndUpdate(req.params.id, {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	res.redirect("/users");
};