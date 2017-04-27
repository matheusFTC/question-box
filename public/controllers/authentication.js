"use strict";

var app = angular.module("qbApp");

app.controller("authenticationController", function($scope, $cookies, $location, $translate, Authentication) {

  $scope.username = null;
  $scope.password = null;

  $scope.authenticate = function() {
    if (!$scope.username || !$scope.password || $scope.username.trim() === "" || $scope.password.trim() === "") {
      $translate("REQUIRED_USERNAME_PASSWORD").then(function(translation) {
        $scope.message.error(translation);
      });
    } else {
      Authentication.authenticate($scope.username, $scope.password)
        .then(function(response) {
          $cookies.put("token", response.data.token);

          $location.path("/administration/groups");
        })
        .catch(function(err) {
          $scope.username = null;
          $scope.password = null;

          if (err.status === 401) {
            $translate("USERNAME_PASSWORD_INVALID").then(function(translation) {
              $scope.message.error(translation);
            });
          } else {
            $translate("UNABLE_AUTHENTICATE").then(function(translation) {
              $scope.message.error(translation);
            });
          }
        });
    }
  };
});