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

    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "I", "J", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Z"];

    $scope.questions.forEach(function(question, index) {
      question.order = ++index;
      question.isAnswered = false;

      question.alternatives.forEach(function(alternative, index) {
        alternative.order = alphabet[index];
        alternative.isMarcked = false;
      });
    });
  });

  $scope.getNextQuestion = function() {
    return $scope.questions.find(function(question) {
      return question.isAnswered === false;
    });
  };
  
  $scope.start = function() {
    $scope.started = true;
    $scope.question = $scope.getNextQuestion();
  };

  $scope.mark = function(alternative) {
    alternative.isMarcked = !alternative.isMarcked;
  };
  
  $scope.next = function() {
    
  };
});