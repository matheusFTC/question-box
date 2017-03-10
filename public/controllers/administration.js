"use strict";

var app = angular.module("qbApp");

app.controller("administrationController", function($rootScope, $scope, Group, Question) {

  $scope.message = {
    success: null,
    error: null
  };

  $scope.groupsFilter;
  $scope.groups;
  $scope.group;

  $scope.findAllGroups = function() {
    Group.findAll().then(function(response) {
      $scope.groups = response.data;
    });
  };

  $scope.setGroup = function(group) {
    $scope.group = group;
  };

  $scope.newGroup = function() {
    $scope.group = {};

    $scope.group.name = "";
    $scope.group.description = "";
    $scope.group.isActive = true;
  };

  $scope.saveGroup = function() {
    Group.save($scope.group, $rootScope.token)
      .then(function(response) {
        $scope.message.success = "Grupo salvo com sucesso!";

        $scope.findAllGroups();
      })
      .catch(function(err) {
        if (err.status === 401) {
          $scope.message.error = "Você não possui autorização para realizar essa ação.";
        } else {
          $scope.message.error = "Não foi possível realizar essa ação.";
        }
      });
  };

  $scope.removeGroup = function(group) {
    Group.remove(group._id, $rootScope.token)
      .then(function(response) {
        $scope.message.success = "Grupo removido com sucesso!";

        $scope.findAllGroups();
      })
      .catch(function(err) {
        if (err.status === 401) {
          $scope.message.error = "Você não possui autorização para realizar essa ação.";
        } else {
          $scope.message.error = "Não foi possível realizar essa ação.";
        }
      });
  };

  $scope.findAllGroups();
  $scope.newGroup();
});