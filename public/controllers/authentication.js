"use strict";

var app = angular.module("qbApp");

app.controller("authenticationController", function($rootScope, $scope, $location, Authentication) {

  $scope.message = null;
  $scope.username = null;
  $scope.password = null;

  $scope.authenticate = function() {
    if ($scope.username === null || $scope.password === null || $scope.username.trim() === "" || $scope.password.trim() === "") {
      $scope.message = "Informe o usuário e a senha.";
    } else {
      Authentication.authenticate($scope.username, $scope.password)
        .then(function(response) {
          $rootScope.token = response.data.token;

          $location.path("/");
        })
        .catch(function(err) {
          if (err.status === 401) {
            $scope.message = "Usuário e/ou senha invalído(s).";
          } else {
            $scope.message = "Não conseguimos realizar a sua autenticação.";
          }
        });
    }
  };
});