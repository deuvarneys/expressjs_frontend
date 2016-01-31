var mocha = require('mocha'),
expect = require('chai').expect,
sinon = require('sinon');

var wsConnector = require('../../../src/modules/wsConnector');




describe('/modules/wsConnector', function(){
	describe('#getSandersonContent', function(){
		/*
		var xhr, requests;

		before(function () {
		    xhr = sinon.useFakeXMLHttpRequest();
		    requests = [];
		    xhr.onCreate = function (req) { requests.push(req); };
		});

		after(function () {
		    xhr.restore();
		});

		it('should return back requested data', function(){
			//console.log('Requests 1', requests);
			wsConnector.signUp(null, sinon.spy());
			console.log
			('Requests 2', requests);
			 //assert.equals(requests.length, 1);
			expect(requests).to.have.length(1);
		});*/

		//var testObj = sinon.spy();

		//before(function () { server = sinon.fakeServer.create(); });
		//after(function () {	server.restore(); });

		it("calls callback with deserialized data", function () {
			//sinon.stub(wsConnector, 'signUp', function(){return "Hellow"});
		    //var x = wsConnector.signUp();
		    //console.log('x is:', x);
		    // This is part of the FakeXMLHttpRequest API
		    /*
		    server.requests[0].respond(
		        200,
		        { "Content-Type": "application/json" },
		        JSON.stringify([{ id: 1, text: "Provide examples", done: true }])
		    )*/
			
		   
		});
	});
});