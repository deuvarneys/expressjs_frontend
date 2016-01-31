var mocha = require('mocha'),
should = require('chai').should(),
expect = require('chai').expect,
service = require('../../src/service'),
_ = require('underscore'),
wsConnector = require('../../src/modules/wsConnector');

var validObject = {
	username : 'testUserName',
	email : 'testEmail@test.com',
	confirmEmail : 'testEmail@test.com',
	password : 'test123456',
	confirmPassword : 'test123456',
	firstName : 'testFirstName',
	lastName : 'testLastName'
}

describe('service/index.js', function(){

	describe('#signUpService(req, cb)', function(){
		var testObject;
		
		beforeEach('beforeEach #validatePreWS', function(){
	  		testObject = _.clone(validObject);
		});
		/*
		it('should return a username Error', function(){
			testObject.username = 'test';
			service.handleSignUp(testObject, function(respObj){
				expect(respObj).to.have.all.keys(['error_username']);
			});
			
		});
		
		it('should return no error Error', function(){
			sinon.stub(wsConnector, 'signUp', function(){return {}});
			service.handleSignUp(testObject, function(respObj){
				console.log("RESPOBJ", respObj);
				expect(respObj).to.have.all.keys(['test']);
			});
			
		});
		*/
	});


});