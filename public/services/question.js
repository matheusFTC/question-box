"use strict";

var app = angular.module("qbApp");

app.factory("Question", function($http) {
  return {
    findByGroup: function(groupId) {
      return $http.get("/questions?group=" + groupId);
    }
  };
});