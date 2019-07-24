var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Scheme and model for user

var userSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	email: String,
	password: String
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;