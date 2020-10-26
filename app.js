var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Shops = require("./models/shops");
var User = require("./models/user");
mongoose.connect("mongodb://localhost/CredNitt", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
	secret: "CredNitt",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	next();
});
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
app.get("/", function (req, res) {
	res.render("landing");
});
//Authentication routes----------------------------
app.get("/register", function (req, res) {
	res.render("register");
});
app.post("/register", function (req, res) {
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function () {
			res.redirect("/shops");
		});

	});
});
//show login form----------------------------------
app.get("/login", function (req, res) {
	res.render("login");
});
//handling login logic
app.post("/login", passport.authenticate("local",
	{
		successRedirect: "/shops",
		failureRedirect: "/login"
	}), function (req, res) {

	});
//logout route
app.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
});
//shop routes--------------------------------------
app.get("/shops", function (req, res) {
	var shops = [
		{ name: "2K Market", id: "abc" },
		{ name: "Dimora", id: "def" },
		{ name: "SC Juice", id: "ghi" },
		{ name: "Chat Khazana", id: "jkl" },
		{ name: "Zircon shop", id: "mno" },
		{ name: "coke station", id: "pqr" },
		{ name: "bru", id: "stu" },
		{ name: "lassi shop", id: "vwx" }
	]
	res.render("shops", { shops: shops });
});

//individual payment routes-----------------------------------------
app.get("/payment/:id", (req, res) => {
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





app.listen(process.env.PORT || 3000, process.env.IP, function () {
	console.log('Server listening on port 3000');

});