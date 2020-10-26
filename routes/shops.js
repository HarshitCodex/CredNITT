var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Shops = require("../models/shops");
var multer = require("multer");
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function(req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
var upload = multer({
  storage: storage,
  fileFilter: imageFilter
});

var cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: 'crednitt', 
  api_key: process.env.CloudinaryAPIKEY, 
  api_secret: process.env.Cloudinarysecret
});


router.get("/", function(req, res){
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
module.exports=router;