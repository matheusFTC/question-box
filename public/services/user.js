"use strict";

var app = angular.module("qbApp");

app.factory("User", function($http) {
  return {
    findAll: function(token) {
      return $http.get("/users" + "?token=" + token);
    },
    findById: function(_id, token) {
      return $http.get("/users/" + _id + "?token=" + token);
    },
    save: function(user, token) {
      var data = $.param({
        username: user.username,
        password: user.password,
        fullname: user.fullname
      });

      var config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": token
        }
      };

      if (user._id) {
        return $http.put("/users/" + user._id, data, config);
      } else {
        return $http.post("/users", data, config);
      }
    },
    remove: function(_id, token) {
      var data = $.param({});

      var config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      return $http.delete("/users/" + _id + "?token=" + token, data, config);
    }
  };
});