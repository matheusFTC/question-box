"use strict";

var app = angular.module("qbApp");

app.controller("authenticationController", function($rootScope, $scope, $location, Authentication) {

  $scope.username = null;
  $scope.password = null;

  $scope.authenticate = function() {
    if ($scope.username === null || $scope.password === null || $scope.username.trim() === "" || $scope.password.trim() === "") {
      $scope.message.error("Enter the username and password.");
    } else {
      Authentication.authenticate($scope.username, $scope.password)
        .then(function(response) {
          $rootScope.token = response.data.token;

          $location.path("/administration/groups");
        })
        .catch(function(err) {
          $scope.username = null;
          $scope.password = null;

          if (err.status === 401) {
            $scope.message.error("Username or password is invalid!");
          } else {
            $scope.message.error("We were unable to authenticate.");
          }
        });
    }
  };
});