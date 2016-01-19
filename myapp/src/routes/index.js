var express = require('express');
var router = express.Router();
var signupValidate = require('../modules/validation');
var wsc = require('../modules/wsConnector');
var services = require('../service');
var _ = require('underscore');


/* GET home page. */
router.get('/', function(req, res, next) {
	console.warn('Getting connection files');
	
	wsc.sanderson( function(str){
		res.render('index',JSON.parse(str));
	});
});


/* Get sign up page. */
router.get('/signup', function(req, res, next){
	res.render('signup', {});
});

router.post('/signup', function(req, res, next){
	//res.render('signup', {});
	//console.log("Req: ", req.body);
	//console.log("validate: ", signupValidate.validatePreWS(req.body));

	var cb = function(resp){
		//if (typeof resp._locals !== "undefined"){
			//console.log("it is here", Object.keys(resp));
		//}
		if(resp && Object.keys(resp).length > 0){
			res.render('signup', resp);
			console.log("We got sign up errors!");
		} else{
			res.render('signupSuccess', {});
		}
		console.log("RESP: ", resp);
	};

	//signupValidate.validatePreWS(req.body, cb);
	services.handleSignUp(req.body, cb);

});

router.get('/positionHtml', function(req, res, next){
	console.log("REQ: ", req.query);
	res.render('_includes/position', {position : req.query});
});



module.exports = router;
