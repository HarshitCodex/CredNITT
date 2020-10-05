var mongoose = require("mongoose");
var shopsSchema = new mongoose.Schema({
	name: String,
	ID: String,
	Points: Number,
    Credits: Number,
    Due: Number
});
module.exports = mongoose.model("Shops", shopsSchema);