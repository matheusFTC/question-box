"use strict";

var app = angular.module("qbApp");

app.factory("Question", function($http) {
  return {
    findByGroup: function(groupId) {
      return $http.get("/questions?group=" + groupId);
    },
    findById: function(_id) {
      return $http.get("/questions/" + _id);
    },
    save: function(question, token) {
      var data = $.param({
        enunciation: question.enunciation,
        alternatives: question.alternatives,
        group: question.group,
        isActive: question.isActive
      });

      var config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": token
        }
      };

      if (question._id) {
        return $http.put("/questions/" + question._id, data, config);
      } else {
        return $http.post("/questions", data, config);
      }
    },
    remove: function(_id, token) {
      var data = $.param({});

      var config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      return $http.delete("/questions/" + _id + "?token=" + token, data, config);
    }
  };
});