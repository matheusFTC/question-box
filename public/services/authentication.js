"use strict";

var app = angular.module("qbApp");

app.factory("Authentication", function($http) {
  return {
    authenticate: function(username, password) {
      var data = $.param({
        username: username,
        password: password
      });

      var config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      return $http.post("/authentication", data, config);
    }
  };
});