var app = angular.module('coderFriends');

app.controller('loginCtrl', function($scope, githubService){
	$scope.loginGithub();
});


