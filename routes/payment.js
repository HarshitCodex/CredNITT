var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Shops = require("../models/shops");
//individual payment routes-----------------------------------------
router.get("/:id", (req, res) => {
	//use this when the backend is ready
	/* Shop.findById(req.params.id, function (err, foundShop) {
		if (err) {
			console.log(err);
		}
		else {
			res.render("payments", { shop: foundShop });
		}
	}); */

	//temporary rendering
	let shop = { name: "2K Market", id: "abc", amount: 100 };
	res.render("payments", { shop: shop });
});
module.exports=router;