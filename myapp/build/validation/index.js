var _ = require('underscore');
//wsconnector = require('../../wsConnector');

var un_shortLength = 'Username needs to be at least 5 characters',
un_longLength = 'Username needs to be less than 50 characters',
un_exists = 'Username already exists',
ps_tooShort = 'Password needs to be at least 5 charachers',
cps_noMatch = 'Passwords do not match',
email_notValid = 'Email address is not valid',
cemail_noMatch = 'Email addresses do not match';

var USERNAME_NS = 'username',
EMAIL_NS = 'email',
CONFIRM_EMAIL_NS =  'confirmEmail',
PASS_NS = 'password',
CONFIRM_PASS_NS = "confirmPassword",
ERROR_NS= 'error_';



var validatePreWS = function(req, cb){
	var respObj = {};
	var errorKey;
	//Check userName length
	var username = req[USERNAME_NS];
	if(username && username.length < 5){
		respObj[ERROR_NS + USERNAME_NS] =  un_shortLength;
	}

	//var email = req[EMAIL_NS];
	//if(email.length < 5){
	//	respObj.join{ERROR_NS+EMAIL_NS : }
	//}

	//Check password length
	var password = req[PASS_NS];
	if(password && password.length < 5){
		errorkey = ERROR_NS + PASS_NS;
		//_.extend(respObj,{errorkey : ps_tooShort});
		respObj[ERROR_NS + PASS_NS] =  ps_tooShort;
	}

	var confirmPassword = req[CONFIRM_PASS_NS];
	if(confirmPassword && password !== confirmPassword){
		//errorkey = ERROR_NS+CONFIRM_PASS_NS;
		//_.extend(respObj,{ errorkey: cps_noMatch});
		respObj[ERROR_NS+CONFIRM_PASS_NS] =  cps_noMatch;
	}

	var returnFunction = function(response){
		if(response && response.errorCount >0){
			console.log("BODY 4", response);
			respObj.error = response;
		}

		//return respObj;
		cb(respObj);
	};

	//var response = wsconnector.signUp(req, returnFunction);
	//return wsconnector.signUp(req, returnFunction);
	//console.log("BODY 5", response);
	cb(respObj);
	
};

var validatePostWS = function(data, cb){
	console.log('errors:', data.errors);
	var respObj = {};

	_.each(data.errors, function(error){
		//Check if username is too short
		if(error.errorCode == 201){
			respObj[ERROR_NS + USERNAME_NS] =  un_shortLength;
		} 
		//Check if username is too long
		else if(error.errorCode == 202){
			respObj[ERROR_NS + USERNAME_NS] =  un_longLength;
		} 
		//Check if username exists in the database
		else if(error.errorCode == 101){
			respObj[ERROR_NS + USERNAME_NS] =  un_exists;
		}
		//Check if password is too short
		else if(error.errorCode == 203){
			respObj[ERROR_NS + PASS_NS] =  ps_tooShort;
		}
		//Check if passwords do not match
		 else if(error.errorCode == 204){
			respObj[ERROR_NS+CONFIRM_PASS_NS] =  cps_noMatch;
		} 
		//Check if emails match
		else if(error.errorCode == 206){
			respObj[ERROR_NS+CONFIRM_EMAIL_NS] =  cemail_noMatch;
		}
	});

	cb(respObj);
};

	

module.exports.validatePreWS = validatePreWS;
module.exports.validatePostWS = validatePostWS;
//exports.validatePostWS