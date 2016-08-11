var express = require('express');
var router = express.Router();
var twilio = require('twilio');
 
// Find your account sid and auth token in your Twilio account Console.
var client = twilio('ACb4185f3bca36b3d0349be0cab1e912fd', '9c9c4e204ab8f7ef9eb006f2848f8e6d');
 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'} );

});

router.get("/map", function(req, res, next){
	res.render('map', {title: "Map Page"});
});

router.get("/home", function(req,res,next){
	res.render('home')
})

router.get("/registerpage", function(req,res,next){
	res.render("registerpage")
})

router.get("/i'm-nervous", function(req,res,next){
	// // Send the text message.
	client.sendMessage({
	  to: '914-295-0166',
	  from: '845-513-3435',
	  body: "Hi, my location is: _____ I don't feel very safe."
});
})

router.get("/contact-nearby", function(req,res,next){
	// // Send the text message.
	client.sendMessage({
	  to: '914-309-0655',
	  from: '845-513-3435',
	  body: "Hi, my location is: _____ I don't feel very safe."
});
})

router.get("/emergency", function(req,res,next){
	// // Send the text message.
	client.sendMessage({
	  to: '914-309-0655',
	  from: '845-513-3435',
	  body: "Hi, my location is: _____ I don't feel very safe."
});
})


module.exports = router;
