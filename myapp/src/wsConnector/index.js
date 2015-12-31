var http = require("http");

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
	  var str = ''
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


exports.sanderson = getSandersonContent;