// set for lowdb
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);
db.defaults({  users: [] })
  .write();
var ids = require('short-id');
// get
module.exports.getAllUsers = (req, res) => {
	var users = db.get('users').value();
	res.json(users);
};
//get/:id
module.exports.getUser = (req, res) => {
	var id = req.params.id;
	var user = db.get('users')
				 .find({id: id})
				 .value();
	var values = [];
	if(user){
		values.push(user);
		values.push(httpStatusCode.find( element => {
			return element.status === 200;
		}));
	}
	else {
		values.push(httpStatusCode.find( element => element.status === 404));
	}
	res.json(values);
};
// post
module.exports.createUser = (req, res) =>{
	req.body.id = ids.generate();
	db.get('users')
	  .push(req.body)
	  .write();
	res.json(req.body);
	
};

// put
module.exports.replaceUser = (req, res) => {
	db.get('users')
      .find({ id: res.locals.id })
      .assign({name : req.body.name,
      		   email : req.body.email,
      		   password: req.body.password})
      .write();
    var user = db.get('users')
    			 .find({ id: res.locals.id})
    			 .value();
   	res.json(user);
};

// patch 
module.exports.updateUser = (req, res) => {
	
};

module.exports.deleteUser = (req, res) => {
	db.get('users')
	  .remove({ id: res.locals.id })
	  .write();
	res.send("Successful!")
};

var httpStatusCode = [
	{ status: 200, message : "OK"},
	{ status: 400, message : "Bad request"},
	{ status: 404, message : "Not found"}
];