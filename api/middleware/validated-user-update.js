module.exports.validateUser = function (req, res, next){
	// if ( req.body.id || req.body.email || req.body.password){
	// 	next();
	// }
	// else{
	// 	var errors = [];
	// 	errors.push(httpStatusCode.find( element => element.status === 400));
	// 	res.json(errors);
	// }
	// var updatedData = [];
	// for( var index in req.body) {
	// 	if(index === "id" || index === "email" || index === "password") {
	// 		updatedData.push({ i
	// 			ndex: req.body[index]});
	// 	}
	// }
	// if(updatedData.length !== 0){
	// 	res.json(updatedData);
	// }
	// else next();
};


var httpStatusCode = [
	{ status: 200, message : "OK"},
	{ status: 400, message : "Bad request"},
	{ status: 404, message : "Not found"}
];