module.exports.postCreate = (req, res, next) => {
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
			errors.push("Email is not valided");

		}

	}				
	if(!req.body.password){
		errors.push("Password is required");
	}
	if(errors.length){		
	res.render("../users/user-create", {
		errors: errors,
		values: req.body
	});
	return;
	}
	next();
	
};

module.exports.postReplace = (req, res, next) => {
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
			errors.push("Email is not valided");

		}

	}				
	if(!req.body.password){
		errors.push("Password is required");
	}
	if(errors.length){		
	res.render("../users/user.replace", {
		errors: errors,
		values: req.body
	});
	return;
	}
	next();
	
}
function validateEmail (email){
		var reg = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
		var testedEmail = reg.test(email);
		return testedEmail;

};


//asdasdhasdhadshhahjasfjh