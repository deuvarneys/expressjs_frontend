var http = require("http"),
requestJson = require('request-json');

var options = {
  host: 'localhost',
  port: '8080',
  path: '/profile/sanderson3'//,
  //method: 'GET'//,
  //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
};


// write the request parameters
//req.write('post=data&is=specified&like=this');
//req.end();

var getSandersonContent = function(cb){

	var callback = function(response) {
	  var str = '';
	  response.on('data', function (chunk) {
	    str += chunk;
	  });

	  response.on('end', function () {
	    console.warn('STRING',str);
	    cb(str);
	  });
	};


	var req = http.request(options, callback);
	req.end();
};


var getSignUpContent = function(data, cb){
	/*
	var callback = function(response) {
	  var str = ''
	  response.on('data', function (chunk) {
	    str += chunk;
	  });

	  response.on('end', function () {
	    console.log('SIGNUP: ',str);
	  });
	};

	


	var req = http.request(options, callback);
	req.end();   
	*/

	var options = {
	  host: 'localhost',
	  port: '8080',
	  path: '/account/signup',
	  method: 'POST',
	  headers: {
        "content-type": "application/json",
      },
      json : true,
	  data: data
	  //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	};

	var client = requestJson.createClient('http://localhost:8080/');

	console.log("Inside connector");

	client.post(options.path, data, function(err, res, body){
		console.log(/*"Err: ", err, "Res: ", res,*/ "Body:", body);

		if(cb){
			console.log("Hitting cb!");
			return cb(body);
		}
		
	});
};


exports.sanderson = getSandersonContent;
exports.signUp = getSignUpContent;