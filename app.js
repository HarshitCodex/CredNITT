require('dotenv').config()
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var flash = require("connect-flash");
var Shops = require("./models/shops");
var User = require("./models/user");

var shopsRoutes = require("./routes/shops");
var indexRoutes = require("./routes/index");
var paymentRoutes = require("./routes/payment");
mongoose.connect("mongodb://localhost/CredNitt",{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(require("express-session")({
	secret: "CredNitt",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
    next();

});


mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

app.use("/",indexRoutes);
app.use("/shops",shopsRoutes);
app.use("/",paymentRoutes);
app.listen(process.env.PORT ||3000, function() { 
  console.log('Server listening on port 3000'); 
});