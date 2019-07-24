module.exports.validateUser = (req, res, next) => {
	
	var errors = [];
	if(!req.body.name){
		errors.push("Name is required");

	}
	if(!req.body.email){
		errors.push("Email is required");
	}
	else{
		email = req.body.email;
		if(validateEmail(email) == false){
			errors.push("Email is no valided");

		}

	}				
	if(!req.body.password){
		errors.push("Password is required");
	}
	if(errors.length){
	errors.push(httpStatusCode.find( element => element.status === 400));		
	res.json(errors);
	return;
	}
	next();
	
};

function validateEmail (email){
		var error = "Email is not valid";
		if(email.length <= 2){
			return false;
		}
		if(email.indexOf("@") == -1){
			return false;
		}

		var parts = email.split("@");
		var dot= parts[1].indexOf(".");
		var len = parts[1].length;
		var dotSplits = parts[1].split(".");
		var dotcount = dotSplits.length -1;
		

		if(dot == -1 || dot <2 || dotcount >2 ){
			return false;
		}
		for (el of dotSplits){
			if(el.length == 0){
				return false;
			}
		}
		return true;
};

var httpStatusCode = [
	{ status: 200, message : "OK"},
	{ status: 400, message : "Bad request"},
	{ status: 404, message : "Not found"}
];