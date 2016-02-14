"use strict";

(function(){


	var myApp = angular.module('myApp', []);

	myApp.controller('UserNameController',  ['$scope', '$http', 
		function UserNameController($scope, $http){
			
			var hasSuccess = 'has-success',
			hasWarning = 'has-warning',
			hasError = 'has-error';

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
	       		

			},
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
				//$scope.emailCheck();
				if($scope.emailCorrectFormat()){
					emailExists();
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
				});
			};

			//////////////////////////
			// Password
			//////////////////////////


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
