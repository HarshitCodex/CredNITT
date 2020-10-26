var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({
	username: {type:String, unique:true, required:true},
	password: String,
	firstName: String,
	lastName: String,
	image: String,
	imageId: String,
	email: {type:String, unique:true, required:false},
	Balance: Number,
	Dues: Number,
	isAdmin:{type:Boolean, default:false}
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);