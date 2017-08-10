var express = require('express');
var router = express.Router(),
    passport = require('passport');
var twilio = require('twilio');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var pos = {}


 
// Find your account sid and auth token in your Twilio account Console.
var client = twilio('ACb4185f3bca36b3d0349be0cab1e912fd', '9c9c4e204ab8f7ef9eb006f2848f8e6d');
 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {title: 'Home'} );

});

router.get('/profile', function(req, res, next){
	res.render("profile", {title:"Profile"})
})

router.get("/map", function(req, res, next){
	res.render('map', {title: "Map Page"});
});
router.post ("/map", function (req, res, next) {
	res.render ('map');
	console.log ("body post: ", req.body)
	pos.lat = req.body.lat;
	pos.lng = req.body.lng;
})

// router.get("/safemap", function(req, res, next){
// 	res.render('geoLocation', {title: "Map Page"});
// });

router.get("/home", function(req,res,next){
	res.render('home')
})

router.get('/user', function(req, res) {
	User.find(function(err, user, count) {
		res.render( 'user', {
			user: user
		});
	});
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {

	var user = new User ({username: req.body.username, password: req.body.password} );
	console.log(user);
	 user.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('user: ' + user.username + " saved.");
      req.login(user, function(err) {
        if (err) {
          console.log(err);
        }
        return res.redirect('/');

      });


	// User.register(new User({username:req.body.user}), 
 //      req.body.password, function(err, user){
 //    if (err) {
 //      res.render('register',{message:'Your registration information is not valid'});
 //    } else {
 //      passport.authenticate('local')(req, res, function() {
      	
 //        res.redirect('/');
 //      });
    }
  });   
});

// router.post('/login', function(req,res,next) {
//   passport.authenticate('local', function(err,user) {
//     if(user) {
//       req.logIn(user, function(err) {
//         res.redirect('/');
//       });
//     } else {
//       res.render('login', {message:'Your login or password is incorrect.'});
//     }
//   })(req, res, next);
// });

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}))

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/user/register', function(req, res) {
  res.render('register');
});

// router.post('/user/register', function(req, res) {
// 	console.log(req.body.user);
// 	new User({
// 		name: req.body.user,
// 		updated_at : Date.now()
// 	}).save(function(err, user, count){
// 		res.redirect('/user');
// 	});
// });

router.get("/i'm-nervous", function(req,res,next){
	
	// // Send the text message.
	client.sendMessage({
	  to: '914-295-0166',
	  from: '845-513-3435',
	  body: "Hi, my location is-- lat: " +String(pos.lat)+ " lng: "+String(pos.lng)+". I don't feel very safe."
});
})

router.get("/contact-nearby", function(req,res,next){
	// // Send the text message.
	client.sendMessage({
	  to: '+19142950166',
	  from: '845-513-3435',
	  body: "Hi, my location is-- lat: " +String(pos.lat)+ " lng: "+String(pos.lng)+"Please come!"
});
})

router.get("/emergency", function(req,res,next){
	// // Send the text message.
	res.render ('index')
	console.log ("in emergency: ", pos)
	client.sendMessage({
	  to: '914-295-0166',
	  from: '845-513-3435',
	  body: "Hi, my location is-- lat: " +String(pos.lat)+ " lng: "+String(pos.lng)+"It's an emergency."
});
})


module.exports = router;
