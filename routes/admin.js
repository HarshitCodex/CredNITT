var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var User = require("../models/user");
var Shops = require("../models/shops");
const { query } = require("express");


router.get("/", isLoggedIn, function (req, res) {
    Shops.find({}, function (err, AllShop) {

        User.find({}, function (err, AllUser) {
            res.render("admin", { shops: AllShop, users: AllUser });
        });
    });
});


router.post("/", function (req, res) {
    if (req.body.clear === "CLEAR") {
        Shops.find({}, function (err, foundShop) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("hiii");
                foundShop.forEach(function (shopp) {
                    shopp.AccountBalance = 0;
                    shopp.save();
                });
            }
        });
    }
    else {
        console.log('bye');
        User.find({}, function (err, Users) {
            if (err) {
                console.log(err);
            }
            else {

                Users.forEach(function (userr) {

                    let dues_sum = 0;
                    userr.Dues.forEach(function (due) {
                        dues_sum += due.amount;
                        userr.Completetransaction.push({ transactionDate: due.transactionDate, shopName: due.shopName, amount: due.amount });
                        userr.Dues.pull({ _id: due._id });
                    });



                    userr.Balance += 500 - dues_sum;
                    console.log(userr.firstName);
                    userr.save();
                });
            }
        });

    }

    res.redirect("/admin");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login First!")
    res.redirect("/login");
}

module.exports = router;
