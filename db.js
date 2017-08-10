// as always, require the module
var mongoose = require('mongoose'); 
var passportLocalMongoose = require('passport-local-mongoose');

// some extra stuff goes here...
// var User = new mongoose.Schema({
// 	name: String,
// 	password: String,
// 	updated_at: Date
// });

var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	updated_at: Date
});
UserSchema.plugin(passportLocalMongoose);

// "register" it so that mongoose knows about it
mongoose.model('User', UserSchema);


mongoose.connect('mongodb://localhost/userdb');