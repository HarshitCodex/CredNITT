var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Shops = require("../models/shops");
var multer = require("multer");
var storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
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
  api_key: '698692367846536',
  api_secret: 'NN7xe67y2pg0HgyhPU3YQIdldog'
});



router.get("/", function (req, res) {
  if (req.user) {
    return res.redirect("/shops");
  } else {
    res.render("landing");
  }
});
//Authentication routes----------------------------
router.get("/register", function (req, res) {
  if (req.user) {
    return res.redirect("/shops");
  } else {
    res.render("register");
  }
});

router.post("/register", upload.single("image"), function (req, res) {
  if (req.file === undefined) {
    var newUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      image: "",
      imageId: ""
    });
    //console.log(req.body.admincode);
    if (req.body.admincode === 'secretcode123') {

      newUser.isAdmin = true;
    }

    User.register(newUser, req.body.password, function (err, user) {
      if (err) {
        console.log(err);
        return res.render("register");
        req.flash("error", "Fill every field");
      }
      passport.authenticate("local")(req, res, function () {
        req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
        res.redirect("/shops");
      });
    });
  } else {
    cloudinary.v2.uploader.upload(
      req.file.path, {
      width: 400,
      height: 400,
      gravity: "center",
      crop: "scale"
    },
      function (err, result) {
        if (err) {
          req.flash("error", err.messsage);
          return res.redirect("/");
        }
        req.body.image = result.secure_url;
        req.body.imageId = result.public_id;
        var newUser = new User({
          username: req.body.username,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          image: req.body.image,
          imageId: req.body.imageId
        });
        User.register(newUser, req.body.password, function (err, user) {
          if (err) {
            return res.render("register");
            req.flash("error", err.message);
          }
          passport.authenticate("local")(req, res, function () {
            res.redirect("/shops");
          });
        });
      }, {
      moderation: "webpurify"
    }
    );

  }
});

//show login form----------------------------------
router.get("/login", function (req, res) {
  if (req.user) {
    return res.redirect("/shops")
  } else {
    res.render("login");
  }
});
//handling login logic
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/shops",
    failureRedirect: "/login"
  }), function (req, res) {

  });
//logout route
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged out successfully!");
  res.redirect("/");
});
//USER Profile
router.get("/users/:id", function (req, res) {
  User.findById(req.params.id, function (err, foundUser) {
    if (err) {
      req.flash("error", "something went wrong");
      res.redirect("/");
    }
    else {
      res.render("show", { user: foundUser });
      //console.log(foundUser.Completetransaction);
    }
  });
});
module.exports = router;
