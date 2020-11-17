var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Shops = require("../models/shops");
//individual payment routes-----------------------------------------
router.get("/payment/:id", isLoggedIn, (req, res) => {
	//use this when the backend is ready
	// console.log(req.params.id)
	Shops.findOne({ id: req.params.id }, function (err, foundShop) {
		if (err) {
			console.log(err);
		}
		else {
			res.render("payments", { shop: foundShop });
		}
	});

	//temporary rendering
	// let shop = { name: "2K Market", id: "abc", amount: 100 };
	// res.render("payments", { shop: shop });
});


router.post("/payment/:id", (req, res) => {

	//temporary rendering
	//console.log(req.body)
	let shop = { name: req.body.name, id: req.params.id, amount: req.body.amount, date: req.body.datetime };
	
	
	if (req.user.Balance >= shop.amount) {
		req.user.Balance -= shop.amount;
		req.user.Completetransaction.push({ shopName: req.body.shopName, amount: shop.amount, transactionDate: shop.date });

		req.user.save().then(user => {
			//console.log(req.user)

			Shops.findOne({ id: req.params.id }, function (err, foundShop) {
				if (err) {
					console.log(err);
				}
				else {
					foundShop.AccountBalance += parseInt(shop.amount);
					foundShop.save().then(foundShop => {
						req.flash("success", "Payment successfull");
						res.redirect("/users/" + req.user.id);
					}
					);
				}
			});

		}).catch(err => {
			req.flash("error", "Something went wrong");
			res.redirect("/");
		})

	} else {
		req.flash("error", "You don't have enough balance");
		res.redirect("/due/" + req.params.id);
	}
});




router.get("/due/:id", isLoggedIn, (req, res) => {
	//use this when the backend is ready
	// console.log(req.params.id)
	Shops.findOne({ id: req.params.id }, function (err, foundShop) {
		if (err) {
			console.log(err);
		}
		else {
			res.render("due", { shop: foundShop });
		}
	});

	//temporary rendering
	// let shop = { name: "2K Market", id: "abc", amount: 100 };
	// res.render("payments", { shop: shop });
});


router.post("/due/:id", (req, res) => {

	//temporary rendering
	//console.log(req.body)
	let shop = { name: req.body.name, id: req.params.id, amount: req.body.amount, date: req.body.datetime };


	Shops.findOne({ id: req.params.id }, function (err, foundShop) {
		if (err) {
			console.log(err);
		}
		else {
			
			let dues_sum = 0;
			req.user.Dues.forEach(function (due) {
				dues_sum += due.amount;
			});
			

			if (parseInt(dues_sum) + parseInt(shop.amount) <= 500) {
				foundShop.AccountBalance += parseInt(shop.amount);
			
				req.user.Dues.push({ shopName: req.body.shopName, amount: shop.amount, transactionDate: shop.date });
				req.user.save();
				

				foundShop.save().then(foundShop => {
					req.flash("success", "Due Payment successfull");
					res.redirect("/users/" + req.user.id);
				}
				).catch(err => { });
			}
			else {
				req.flash("error", "Total dues exceeded limit");
				res.redirect("/shops");
			}
		}
	});


});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "Please Login First!")
	res.redirect("/login");
}
module.exports = router;