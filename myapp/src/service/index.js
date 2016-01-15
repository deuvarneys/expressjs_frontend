var signupValidate = require('../modules/validation'),
wsconnector = require('../modules/wsConnector');


var signUpService = function(req, cb){

	var preWsCb = function(respObj){
		console.log("Sign up service respObj", respObj);
		if(Object.keys(respObj).length){
			cb(respObj);
		}

		//Make backend server call
		wsconnector.signUp(req, function(wsObj){
			console.log("Sign up service wsObj", wsObj);
			if(wsObj && Object.keys(wsObj).length){
				signupValidate.validatePostWS(wsObj, function(respObj2){
					console.log("Sign up service respObj2", respObj2);
					cb(respObj2);
				});
			}else{
				cb();
			}
		}
		);
	};

	signupValidate.validatePreWS(req, preWsCb);
};


module.exports.handleSignUp = signUpService;