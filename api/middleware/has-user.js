// set for lowdb
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);
db.defaults({  users: [] })
  .write();

module.exports.isUser = (req, res, next) => {
	var errors = [];
	res.locals.id = req.params.id;
	var user = db.get('users')
	             .find({id: res.locals.id})
	             .value();
	if(!user){
		errors.push("User doens't exist");
		errors.push(httpStatusCode.find( element => element.status === 404));
		res.json(errors);
		return;
	}
	next(); 
};
var httpStatusCode = [
	{ status: 200, message : "OK"},
	{ status: 400, message : "Bad request"},
	{ status: 404, message : "Not found"}
];