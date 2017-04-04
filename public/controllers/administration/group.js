"use strict";

var app = angular.module("qbApp");

app.controller("administrationGroupController", function($scope, $cookies, Group) {

  var token = $cookies.get("token");
  
  $scope.filter;
  $scope.groups;
  $scope.group;

  $scope.findAll = function() {
    Group.findAll().then(function(response) {
      $scope.groups = response.data;
    });
  };

  $scope.set = function(group) {
    $scope.group = group;
  };

  $scope.new = function() {
    $scope.group = {};

    $scope.group.name = null;
    $scope.group.description = null;
    $scope.group.isActive = true;
  };

  $scope.save = function() {
    Group.save($scope.group, token)
      .then(function(response) {
        $scope.message.success("Group saved successfully!");

        $scope.findAll();
      })
      .catch(function(err) {
        if (err.status === 401) {
          $scope.message.unauthorized();
        } else {
          $scope.message.internalServerError();
        }
      });
  };

  $scope.remove = function(group) {
    Group.remove(group._id, token)
      .then(function(response) {
        $scope.message.success("Group removed successfully!");

        $scope.findAll();
      })
      .catch(function(err) {
        if (err.status === 401) {
          $scope.message.unauthorized();
        } else {
          $scope.message.internalServerError();
        }
      });
  };

  $scope.findAll();
});