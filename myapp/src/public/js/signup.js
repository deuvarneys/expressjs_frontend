'use strict';

(function(){


	var myApp = angular.module('myApp', []);

	myApp.controller('UserNameController',  ['$scope', '$http', '$timeout', '$location',
		function UserNameController($scope, $http, $timeout, $location){
			
			var hasSuccess = 'has-success',
			hasWarning = 'has-warning',
			hasError = 'has-error';

			
			//////////////////////////
			// UserName  
			//////////////////////////
			$scope.unExists,
			$scope.unKeyUp= function(){
				$scope.inputCheck();
				if($scope.charLength() && $scope.noSpaces()){
					userNameExists();
				}
			},
			$scope.charLength = function(){
				if($scope.userName && $scope.userName.length){
					return $scope.userName.length>= 5;
				}
				return false;
			},
			$scope.noSpaces = function(){
				if($scope.userName && $scope.userName.length){
					return $scope.userName.indexOf(' ') === -1;
				}
				return true;
			},
			$scope.inputCheck = function(){
				if($scope.charLength() && $scope.noSpaces() && !$scope.unExists){
					$scope.unInputClass = hasSuccess;
					return true;
				} else if(!$scope.noSpaces() || $scope.unExists){
					$scope.unInputClass = hasError;
					return false;
				} else if(!$scope.charLength()){
					$scope.unInputClass = hasWarning;
					return false;
				} else{
					$scope.unInputClass = '';
					return false;
				}
			};

			var userNameExists = function(){
				accountExistsReq($scope.username, function(response){
					$scope.unExists = response.data;
				});
			};

			//////////////////////////
			// Email  
			//////////////////////////

			$scope.emailExists,
			$scope.emailKeyUp= function(){
				
				if($scope.emailCorrectFormat()){
					emailExists();
				}else{
					$scope.emailCheck();
				}

				if($scope.confirmEmail && $scope.confirmEmail.length){
					$scope.confirmEmailCheck();
				}

			},
			$scope.emailCheck = function(){
				if($scope.emailCorrectFormat() && !$scope.emailExists){
					$scope.emailStatus = hasSuccess;
					return true;
				}else if ($scope.emailExists){
					$scope.emailStatus = hasError;
					return false;
				}else{
					$scope.emailStatus = hasWarning;
					return false;
				}
			},
			$scope.confirmEmailCheck = function(){
				if($scope.emailsMatch()){
					$scope.confirmEmailStatus = hasSuccess;
					return true;
				}else{
					$scope.confirmEmailStatus = hasWarning;
					return false;
				}
			},
			$scope.emailCorrectFormat = function(){
				//move this to higher scope
				var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if($scope.email){
					return re.test($scope.email);
				}
				return false;
			},
			$scope.emailsMatch = function(){
				if($scope.email && $scope.confirmEmail){
					return $scope.email === $scope.confirmEmail;
				}
				return false;
			};

			var emailExists = function(){
				accountExistsReq($scope.email, function(response){
					$scope.emailExists = response.data;
					$scope.emailCheck();
				});
			};

			//////////////////////////
			// Password
			//////////////////////////
			$scope.passwordLength = function(){
				if($scope.password){
					return ($scope.password.length >= 5);
				}
				return false;
			},

			$scope.passwordSpaces = function(){
				if($scope.password){
					return $scope.password.indexOf(' ') !== -1;
				}
				return true;
			},

			$scope.passwordsMatch = function(){
				if($scope.password && $scope.confirmPassword){
					return ($scope.password === $scope.confirmPassword);
				}
				return false;
			},
			$scope.passwordInputCheck = function(){
				var x =  ($scope.passwordLength() && !$scope.passwordSpaces() && $scope.passwordsMatch());
				return x;
			},
			$scope.passKeyUp= function(){
				if($scope.passwordLength() && !$scope.passwordSpaces()){
					$scope.passInputClass = hasSuccess;
				}else if( $scope.passwordSpaces()){
					$scope.passInputClass = hasError;
				}else{
					$scope.passInputClass = hasWarning;
				}
			},

			$scope.confirmPassKeyUp = function(){
				if($scope.passwordLength() && !$scope.passwordSpaces() && $scope.passwordsMatch()){
					$scope.confirmPassInputClass = hasSuccess;
				}else if ($scope.passwordLength() && !$scope.passwordSpaces() && !$scope.passwordsMatch()){
					$scope.confirmPassInputClass = hasWarning;
				}else{
					$scope.confirmPassInputClass = '';
				}
			},
			//////////////////////////
			// Legal Name  
			//////////////////////////
			$scope.firstNameStatus,
			$scope.lastNameStatus,

			$scope.firstNameKeyUp = function(){
				var result =  nameLengthCheck($scope.firstName);
				if(result){
					$scope.firstNameStatus = hasSuccess;
				}else{
					$scope.firstNameStatus = hasWarning;
				}
				return result;
			},


			$scope.lastNameKeyUp = function(){
				var result =  nameLengthCheck($scope.lastName);
				if(result){
					$scope.lastNameStatus = hasSuccess;
				}else{
					$scope.lastNameStatus = hasWarning;
				}
				return result;
			},

			$scope.legalNameCheck = function(){
				if ($scope.firstNameKeyUp() && $scope.lastNameKeyUp()){
					return true;
				}
				return false;
			};

			var nameLengthCheck = function(name){
				if(name){
					return ( name.length > 0);
				}
				return false;
			};

			//////////////////////////
			// Submission  
			//////////////////////////
			var signUpObj;
	
			$scope.submit = function(){
				signUpObj = {
					username : $scope.userName,
					email : $scope.email,
					confirmEmail : $scope.confirmEmail,
					password : $scope.password,
					confirmPassword : $scope.confirmPassword,
					firstName : $scope.firstName,
					lastName : $scope.lastName
				};
				signUpReq(signUpObj, function(){
					$scope.next();
					$timeout(function() {
						window.location = 'http://localhost:3000/';
					}, 4000);
				});

			};

			//////////////////////////
			// Animations  
			//////////////////////////
			var animateElement = function(element, effect, showElement, cb){
				if(showElement){
					$(element).show();
				}
				$(element).addClass(effect).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		       	function(){
		       		$(element).removeClass(effect);
		       		if(!showElement){
		       			$(element).hide();
		       		}
		       		if(cb){
		       			cb();
		       		}

		       	});
			};

			$scope.next = function(){
				console.log('Now we are getting somewhere');
				animateElement(sections[sectionIndex], animatedOutClass, false, function(){
					sectionIndex++;
	       			animateElement(sections[sectionIndex], animatedInClass, true);
				});
	       		

			},
			$scope.previous = function(){
				console.log('Now we are going back from somewhere');
				animateElement(sections[sectionIndex], animatedOutPrevClass, false, function(){
					sectionIndex--;
	       			animateElement(sections[sectionIndex], animatedInPrevClass, true);
				});
	       		

			};

			//////////////////////////
			// Utilities  
			//////////////////////////
			var accountExistsReq = function(accountId,cb){
				$http({
				 	method: 'GET',
				 	url: 'http://localhost:8080/account/'+ accountId + '/exists'
				}).then(function successCallback(response) {
				    console.log('success response: ', response);
				    cb(response);
				}, function errorCallback(response) {
				    console.error('error response: ', response);
				});
			},

			signUpReq = function(dataObj, cb){
				$http({
				 	method: 'POST',
				 	url: 'http://localhost:8080/account/signup',
				 	data : dataObj
				}).then(function successCallback(response) {
				    
				    if(response.errorCount){
				    	console.error("Sign Up Errors", response.errors);
				    }else{
				    	console.log('success response: ', response);
				    	cb();
				    }


				}, function errorCallback(response) {
				    console.error('error response: ', response);
				});
			};


			var sections,
			sectionIndex = 0;
			var animatedInClass = 'animated bounceInRight',
			animatedOutClass= 'animated bounceOutLeft',
			animatedInPrevClass = 'animated bounceInLeft',
			animatedOutPrevClass = 'animated bounceOutRight';


			angular.element(document).ready(function () {
		       sections = $('.section');
		       animateElement(sections[sectionIndex], animatedInClass, true);
		    });
		}
	]);
})(); 
