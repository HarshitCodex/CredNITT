var mongoose = require("mongoose");
var shopsSchema = new mongoose.Schema({
	name: String,
	id: String,
    Dues: Number
});
module.exports = mongoose.model("Shops", shopsSchema);
