var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Shops = require("../models/shops");


router.get("/", function(req, res){
  /*var shops = [
         {name: "2K Market", id: "abc"},
         {name: "Dimora", id: "def"},
         {name: "SC Juice", id: "ghi"},
         {name: "Chat Khazana", id: "jkl"},
         {name: "Zircon shop", id: "mno"},
         {name: "coke station", id: "pqr"},
         {name: "bru", id: "stu"},
         {name: "lassi shop", id: "vwx"}
  ]
  res.render("shops",{shops:shops}); */
  Shops.find({}, function(err, AllShop){
    if(err){
      req.flash("error", "something went wrong");
      res.redirect("/");
    }
    else
      { 
        console.log(AllShop);
        res.render("shops", {shop: AllShop, page:'shops', currentUser:req.user});}
  });
});
module.exports=router;