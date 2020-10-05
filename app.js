var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/CredNitt");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
app.get("/", function(req,res){
	res.render("landing");
});
app.get("/shops", function(req, res){
  var shops = [
         {name: "2K Market", id: "abc"},
         {name: "Dimora", id: "def"},
         {name: "SC Juice", id: "ghi"},
         {name: "Chat Khazana", id: "jkl"},
         {name: "Zircon shop", id: "mno"},
         {name: "coke station", id: "pqr"},
         {name: "bru", id: "stu"},
         {name: "lassi shop", id: "vwx"}
  ]
  res.render("shops",{shops:shops});
});
app.listen(process.env.PORT ||3000,process.env.IP, function() { 
  console.log('Server listening on port 3000'); 

});