var express = require('express');
var router = express.Router();
var wsc = require('../wsConnector');



/* GET home page. */
router.get('/', function(req, res, next) {
	console.warn('Getting connection files');
	
	wsc.sanderson( function(str){
		res.render('index',JSON.parse(str));
	});

	
});

module.exports = router;
