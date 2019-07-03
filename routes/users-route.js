var express = require('express');
var router = express.Router();
var userController = require("../controller/user-controller");


//set for shortID 
var ids = require('short-id');

// set for lowdb
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync'); 
var adapter = new FileSync('db.json');
var db = low(adapter);
db.defaults({  users: [] })
  .write();

// send respond for see /users requrest
router.get("/", userController.seeAllUsers );

// send respond for /users/search?
router.get("/search", (req, res) => {
	var q = req.query.q;
	console.log(db.get('users'));
	var result = db.get('users').filter( user => {
		return user.name.indexOf(q) !== -1;
	});
	res.render("../users/user", {

		users: result

	})
});

// send respond for create /users/create request
router.get("/create", userController.getCreate);

// send respond for view user
router.get("/:id", userController.getUser);

// post method insert user
router.post("/create", userController.postCreate);

module.exports = router;
