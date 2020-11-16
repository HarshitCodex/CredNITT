var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var User = require("../models/user");
var Shops = require("../models/shops");
var db = mongoose.connection;

/*
var shop1 = new Shops({ name: '2K Market', id: 'A', Dues: 0 });


shop1.save(function (err, shop) {
  if (err) return console.error(err);
  console.log(shop.name + " saved to shopstore collection.");
});
var shop2 = new Shops({ name: 'Dimora', id: 'B', Dues: 0 });


shop2.save(function (err, shop) {
  if (err) return console.error(err);
  console.log(shop.name + " saved to shopstore collection.");
});

var shop3 = new Shops({ name: 'Chat Khazana', id: 'C', Dues: 0 });


shop3.save(function (err, shop) {
  if (err) return console.error(err);
  console.log(shop.name + " saved to shopstore collection.");
});

var shop4 = new Shops({ name: 'Lassi Shop', id: 'D', Dues: 0 });


shop4.save(function (err, shop) {
  if (err) return console.error(err);
  console.log(shop.name + " saved to shopstore collection.");
});

var shop5 = new Shops({ name: 'Coke station', id: 'E', Dues: 0 });


shop5.save(function (err, shop) {
  if (err) return console.error(err);
  console.log(shop.name + " saved to shopstore collection.");
});

var shop6 = new Shops({ name: 'Juicy', id: 'F', Dues: 0 });


shop6.save(function (err, shop) {
  if (err) return console.error(err);
  console.log(shop.name + " saved to shopstore collection.");
});

var shop7 = new Shops({ name: 'Zircon shop', id: 'G', Dues: 0 });


shop7.save(function (err, shop) {
  if (err) return console.error(err);
  console.log(shop.name + " saved to shopstore collection.");
});
var shop8 = new Shops({ name: 'Amber shop', id: 'H', Dues: 0 });


shop8.save(function (err, shop) {
  if (err) return console.error(err);
  console.log(shop.name + " saved to shopstore collection.");
});
var shop9 = new Shops({ name: 'MM1 Laundry', id: 'I', Dues: 0 });


shop9.save(function (err, shop) {
  if (err) return console.error(err);
  console.log(shop.name + " saved to shopstore collection.");
});
*/


router.get("/", isLoggedIn, function (req, res) {


  if (!req.user.isAdmin) {
    Shops.find({}, function (err, AllShop) {
      if (err) {
        req.flash("error", "something went wrong");
        res.redirect("/");
      }
      else {
        res.render("shops", { shop: AllShop, page: 'shops' });
      }
    });
  }
  else {

    res.redirect("/admin")

  }



});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login First!")
  res.redirect("/login");
}
module.exports = router;