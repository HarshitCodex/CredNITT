var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Shops = require("../models/shops");
router.get("/transactions", function(req,res){
	res.render("landing");
});
module.exports=router;