"use strict";

var app = angular.module("qbApp");

app.controller("questionController", function($scope, $routeParams, Group, Question) {

  $scope.selectedGroup;
  $scope.started;

  Group.findById($routeParams._groupId).then(function(response) {
    $scope.selectedGroup = response.data.record;
  });
});