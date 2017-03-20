"use strict";

var app = angular.module("qbApp");

app.controller("administrationAlternativeController", function($scope, $routeParams, Question) {

  $scope.filter;
  $scope.question;
  $scope.alternative;

  $scope.load = function() {
    Question.findById($routeParams._questionId).then(function(response) {
      $scope.question = response.data.record;

      if (!$scope.question.alternatives) $scope.question.alternatives = [];
    });
  };

  $scope.set = function(alternative) {
    $scope.alternative = alternative;
  };

  $scope.new = function() {
    $scope.alternative = {};

    $scope.alternative.answer = "";
    $scope.alternative.isCorrect = false;
  };

  $scope.process = function(successMessage) {
    Question.save($scope.question, $scope.token)
      .then(function(response) {
        $scope.message.success(successMessage);

        $scope.load();
      })
      .catch(function(err) {
        if (err.status === 401) {
          $scope.message.unauthorized();
        } else {
          $scope.message.internalServerError();
        }
      });
  };

  $scope.save = function() {
    if (!$scope.alternative._id) $scope.question.alternatives.push($scope.alternative);

    $scope.process("Alternative saved successfully!");
  };

  $scope.remove = function(index) {
    $scope.question.alternatives.splice(index, ++index);

    $scope.process("Alternative successfully removed!");
  };

  $scope.load();
});