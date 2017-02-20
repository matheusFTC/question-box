"use strict";

var app = angular.module("qbApp");

app.controller("questionController", function($scope, $routeParams, Group, Question) {

  $scope.group;
  $scope.questions;
  $scope.question;
  $scope.started = false;

  Group.findById($routeParams._groupId).then(function(response) {
    $scope.group = response.data.record;
  });

  Question.findByGroup($routeParams._groupId).then(function(response) {
    $scope.questions = response.data;

    $scope.questions.forEach(function(question, index) {
      question.order = ++index;
      question.isAnswered = false;
    });
  });

  $scope.start = function() {
    $scope.started = true;
    $scope.question = $scope.getNextQuestion();
  };

  $scope.getNextQuestion = function() {
    return $scope.questions.find(function(question) {
      return question.isAnswered === false;
    });
  };
});