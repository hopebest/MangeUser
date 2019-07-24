var express = require('express');
var router = express.Router();
var userController = require("../controller/user-controller-api.js");
var userValidation = require("../middleware/post-user-validation.js");
var userExist = require("../middleware/has-user.js");
var userUpdateValidation = require("../middleware/validated-user-update.js")

// get all users
router.get("/", userController.getAllUsers);
// get user
router.get("/:id", userController.getUser);
// create a new user
router.post("/", userValidation.validateUser, userController.createUser);
// replace a user
router.put("/:id", userExist.isUser, userValidation.validateUser,  userController.replaceUser);
// deltele a user
router.delete("/:id", userExist.isUser, userController.deleteUser);
module.exports = router;