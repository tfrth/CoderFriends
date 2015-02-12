var app = angular.module('coderFriends');

app.service('githubService', function($http){

var loginGithub = function() {
		return $http({
			method: 'GET',
			url: 'http://localhost:9999/auth/guthub'
		})	
	}
});