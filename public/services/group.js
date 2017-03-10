"use strict";

var app = angular.module("qbApp");

app.factory("Group", function($http) {
  return {
    findAll: function() {
      return $http.get("/groups");
    },
    findById: function(_id) {
      return $http.get("/groups/" + _id);
    },
    save: function(group, token) {
      var data = $.param({
        name: group.name,
        description: group.description,
        isActive: group.isActive
      });

      var config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": token
        }
      };

      if (group._id) {
        return $http.put("/groups/" + group._id, data, config);
      } else {
        return $http.post("/groups", data, config);
      }
    },
    remove: function(_id, token) {
      var data = $.param({});

      var config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      return $http.delete("/groups/" + _id + "?token=" + token, data, config);
    }
  };
});