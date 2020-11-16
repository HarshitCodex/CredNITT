var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

const transaction = new mongoose.Schema({
	shopName: String,
	amount: { type: Number },
	transactionDate: {
		type: Date,
		default: Date.now()
	}
});

var UserSchema = new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: String,
	firstName: String,
	lastName: String,
	image: String,
	imageId: String,
	email: { type: String, require: true, index: true, unique: true, sparse: true },
	Balance: { type: Number, default: 5000 },
	Dues: {
		type: [transaction],
		default: null
	},
	Completetransaction: {
		type: [transaction],
		default: null
	},
	isAdmin: { type: Boolean, default: false }
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);