var mongoose = require("mongoose");
var shopsSchema = new mongoose.Schema({
	name: String,
	id: String,
	Dues: Number,
	AccountBalance:{type:Number, default:0}
});

module.exports = mongoose.model("Shops", shopsSchema);
