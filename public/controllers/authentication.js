"use strict";

var app = angular.module("qbApp");

app.controller("authenticationController", function($rootScope, $scope, Authentication) {

  $scope.message = null;
  $scope.username = null;
  $scope.password = null;

  $scope.authenticate = function() {
    Authentication.authenticate($scope.username, $scope.password)
      .then(function(response) {
        $rootScope.token = response.data.token;
      })
      .catch(function(err) {
        
      });
  };
});