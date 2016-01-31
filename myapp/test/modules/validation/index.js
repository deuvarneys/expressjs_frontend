var mocha = require('mocha'),
should = require('chai').should(),
_ = require('underscore');

var validation = require('../../../src/modules/validation');

var un_shortLength = 'Username needs to be at least 5 characters',
un_longLength = 'Username needs to be less than 50 characters',
un_exists = 'Username already exists',
ps_tooShort = 'Password needs to be at least 5 charachers',
cps_noMatch = 'Passwords do not match',
email_notValid = 'Email address is not valid',
cemail_noMatch = 'Email addresses do not match',
email_exist = 'Email already exists',
firstName_req = 'First Name is required',
lastName_req = 'Last Name is required';

var USERNAME_NS = 'username',
EMAIL_NS = 'email',
CONFIRM_EMAIL_NS =  'confirmEmail',
PASS_NS = 'password',
CONFIRM_PASS_NS = "confirmPassword",
FIRSTNAME_NS = 'firstName',
LASTNAME_NS = 'lastName',
ERROR_NS= 'error_';

var validObject = {
	username : 'testUserName',
	email : 'testEmail@test.com',
	confirmEmail : 'testEmail@test.com',
	password : 'test123456',
	confirmPassword : 'test123456',
	firstName : 'testFirstName',
	lastName : 'testLastName'
}

var callBack = function(respObj){
	return respObj;
}

describe('modules/validation', function() {
  
  describe('#validatePreWS(req, cb)', function() {
  	var testObject,
  	userObject;


  	beforeEach('beforeEach #validatePreWS', function(){
  		testObject = _.clone(validObject);
  		userObject = new Object();
  	});

    it('should return username error', function() {
    	testObject[USERNAME_NS] = "test";
    	validation.validatePreWS(testObject, function(respObj){
    		userObject[ERROR_NS + USERNAME_NS] = un_shortLength;
    		JSON.stringify(respObj).should.equal(JSON.stringify(userObject));
    	});
    });

    it('should return email error', function() {
    	testObject[EMAIL_NS] = "test";
    	testObject[CONFIRM_EMAIL_NS] = "test";
    	validation.validatePreWS(testObject, function(respObj){
    		userObject[ERROR_NS + EMAIL_NS] = email_notValid;
    		JSON.stringify(respObj).should.equal(JSON.stringify(userObject));
    	});
    });

    it('should return confirmEmail error', function() {
    	testObject[CONFIRM_EMAIL_NS] = "test";
    	validation.validatePreWS(testObject, function(respObj){
    		userObject[ERROR_NS + CONFIRM_EMAIL_NS] = cemail_noMatch;
    		JSON.stringify(respObj).should.equal(JSON.stringify(userObject));
    	});
    });

    it('should return password error', function() {
    	testObject[PASS_NS] = "test";
    	testObject[CONFIRM_PASS_NS] = "test";
    	validation.validatePreWS(testObject, function(respObj){
    		userObject[ERROR_NS + PASS_NS] = ps_tooShort;
    		JSON.stringify(respObj).should.equal(JSON.stringify(userObject));
    	});
    });

    it('should return confirmPassword error', function() {
    	testObject[CONFIRM_PASS_NS] = "test";
    	validation.validatePreWS(testObject, function(respObj){
    		userObject[ERROR_NS + CONFIRM_PASS_NS] = cps_noMatch;
    		JSON.stringify(respObj).should.equal(JSON.stringify(userObject));
    	});
    });

    it('should return firstName error', function() {
    	testObject[FIRSTNAME_NS] = "t";
    	validation.validatePreWS(testObject, function(respObj){
    		userObject[ERROR_NS + FIRSTNAME_NS] = firstName_req;
    		JSON.stringify(respObj).should.equal(JSON.stringify(userObject));
    	});
    });

    it('should return lastName error', function() {
    	testObject[LASTNAME_NS] = "t";
    	validation.validatePreWS(testObject, function(respObj){
    		userObject[ERROR_NS + LASTNAME_NS] = lastName_req;
    		JSON.stringify(respObj).should.equal(JSON.stringify(userObject));
    	});
    });
 
 });

 describe('validatePostWS(data,cb)', function(){

 	var testObject,
  	userObject;

 	beforeEach('beforeEach #validatePreWS', function(){
  		testObject = new Object();
  		errorObject = {errors : []};
  	});
 	
 	it('should return firstName too short error', function(){
 		errorObject.errors.push({errorCode : 201});
 		validation.validatePostWS(errorObject, function(respObj){
 			testObject[ERROR_NS + USERNAME_NS] = un_shortLength;
 			JSON.stringify(respObj).should.equal(JSON.stringify(testObject));
 		});
 	});
	
 	it('should return firstName too long error', function() {
    	errorObject.errors.push({errorCode : 202});
    	validation.validatePostWS(errorObject, function(respObj){
    		testObject[ERROR_NS + USERNAME_NS] = un_longLength;
    		JSON.stringify(respObj).should.equal(JSON.stringify(testObject));
    	});
    });

    

    it('should return confirmEmail error', function() {
    	errorObject.errors.push({errorCode : 101});
    	validation.validatePostWS(errorObject, function(respObj){
    		testObject[ERROR_NS + USERNAME_NS] = un_exists;
    		JSON.stringify(respObj).should.equal(JSON.stringify(testObject));
    	});
    });
    
    it('should return password error', function() {
    	errorObject.errors.push({errorCode : 203});
    	validation.validatePostWS(errorObject, function(respObj){
    		testObject[ERROR_NS + PASS_NS] = ps_tooShort;
    		JSON.stringify(respObj).should.equal(JSON.stringify(testObject));
    	});
    });
    
    it('should return confirmPassword error', function() {
    	errorObject.errors.push({errorCode : 204});
    	validation.validatePostWS(errorObject, function(respObj){
    		testObject[ERROR_NS + CONFIRM_PASS_NS] = cps_noMatch;
    		JSON.stringify(respObj).should.equal(JSON.stringify(testObject));
    	});
    });
	
    it('should return email not valid error', function() {
    	errorObject.errors.push({errorCode : 205});
    	validation.validatePostWS(errorObject, function(respObj){
    		testObject[ERROR_NS + EMAIL_NS] = email_notValid;
    		JSON.stringify(respObj).should.equal(JSON.stringify(testObject));
    	});
    });
    it('should return confirm email error', function() {
    	errorObject.errors.push({errorCode : 206});
    	validation.validatePostWS(errorObject, function(respObj){
    		testObject[ERROR_NS + CONFIRM_EMAIL_NS] = cemail_noMatch;
    		JSON.stringify(respObj).should.equal(JSON.stringify(testObject));
    	});
    });
    it('should return email already exists error', function() {
    	errorObject.errors.push({errorCode : 102});
    	validation.validatePostWS(errorObject, function(respObj){
    		testObject[ERROR_NS + EMAIL_NS] = email_exist;
    		JSON.stringify(respObj).should.equal(JSON.stringify(testObject));
    	});
    });
    it('should return firstName error', function() {
    	errorObject.errors.push({errorCode : 207});
    	validation.validatePostWS(errorObject, function(respObj){
    		testObject[ERROR_NS + FIRSTNAME_NS] = firstName_req;
    		JSON.stringify(respObj).should.equal(JSON.stringify(testObject));
    	});
    });
    it('should return lastName error', function() {
    	errorObject.errors.push({errorCode : 208});
    	validation.validatePostWS(errorObject, function(respObj){
    		testObject[ERROR_NS + LASTNAME_NS] = lastName_req;
    		JSON.stringify(respObj).should.equal(JSON.stringify(testObject));
    	});
    });

    it('should not return an error', function() {
    	errorObject.errors.push({errorCode : null});
    	validation.validatePostWS(errorObject, function(respObj){
    		JSON.stringify(respObj).should.equal(JSON.stringify(testObject));
    	});
    });

 });
});