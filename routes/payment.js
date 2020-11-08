var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Shops = require("../models/shops");
//individual payment routes-----------------------------------------
router.get("/payment/:id", (req, res) => {
	//use this when the backend is ready
	// console.log(req.params.id)
	Shops.findOne({id:req.params.id}, function (err, foundShop) {
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
	console.log(req.body)
	let shop = { name: req.body.name, id: req.params.id, amount: req.body.amount };

	if(req.user.Balance >= shop.amount){
		req.user.Balance -= shop.amount;
		req.user.Completetransaction.push({shopName:req.body.shopName, amount:shop.amount})
		
		req.user.save().then(user=>{
			console.log(req.user)
		
			Shops.findOne({id:req.params.id}, function (err, foundShop) {
				if (err) {
					console.log(err);
				}
				else {
					foundShop.AccountBalance += shop.amount;
					foundShop.save().then(foundShop=>{
							req.flash("success", "Payment successfull");
							res.redirect("/users/"+req.user.id); 
						}
					);
				}
			}); 

		}).catch(err=>{
			req.flash("error", "Something went wrong");
			res.redirect("/"); 
		})

	}	else{
		req.flash("error", "You don't have enough balance" );
		res.redirect("/due/" + req.params.id); 
	}
});




router.get("/due/:id", (req, res) => {
	//use this when the backend is ready
	// console.log(req.params.id)
	Shops.findOne({id:req.params.id}, function (err, foundShop) {
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
	console.log(req.body)
	let shop = { name: req.body.name, id: req.params.id, amount: req.body.amount };

	req.user.Dues.push({shopName:req.body.shopName, amount:shop.amount})
	
	req.user.save().then(user=>{
		
		Shops.findOne({id:req.params.id}, function (err, foundShop) {
			if (err) {
				console.log(err);
			}
			else {
				foundShop.Dues += shop.amount;
				foundShop.save().then(foundShop=>{
						req.flash("success", "Due Payment successfull");
						res.redirect("/"); 												
					}
				).catch(err=>{});
			}
		}); 

	}).catch(err=>{
		req.flash("error", "Something went wrong");
		res.redirect("/"); 
	})

});


module.exports=router;