"use strict";

var app = angular.module("qbApp", ["ngRoute", "ngCookies", "pascalprecht.translate"]);

app.config(function($routeProvider, $translateProvider) {

  $routeProvider.otherwise({
    redirectTo: "/"
  });
  
  $translateProvider.translations("en", {
    "BTN_EXIT": "Exit",
    "BTN_FINISH": "Finish",
    "BTN_HOME": "Home",
    "BTN_PREVIOUS": "Previous",
    "BTN_NEXT": "Next",
    "BTN_REMAKE": "Remake",
    "BTN_REVIEW": "Review",
    "BTN_START": "Start",
    "ERROR_LOAD_GROUP": "Something went wrong, try again...",
    "INTERNAL_SERVER_ERROR": "This action could not be taken.",
    "GROUP_FILTER": "Do you look for which group?",
    "TITLE": "Question Box",
    "UNAUTHORIZED": "You are not authorized to perform this action."
  });
 
  $translateProvider.translations("pt", {
    "BTN_EXIT": "Sair",
    "BTN_FINISH": "Finalizar",
    "BTN_HOME": "Início",
    "BTN_PREVIOUS": "Anterior",
    "BTN_NEXT": "Próximo",
    "BTN_REMAKE": "Refazer",
    "BTN_REVIEW": "Revisar",
    "BTN_START": "Iniciar",
    "ERROR_LOAD_GROUP": "Algo está errado, tente outra vez...",
    "INTERNAL_SERVER_ERROR": "Não foi possível concluir esta ação.",
    "GROUP_FILTER": "Você procura por qual grupo?",
    "TITLE": "Caixa de Questões",
    "UNAUTHORIZED": "Você não possui permissão para esta ação."
  });
 
  $translateProvider.preferredLanguage("pt");
});

app.run(function($rootScope, $translate) {

  $rootScope.message = {
    text: null,
    isSuccess: false,
    isError: false,
    success: function(text) {
      this.clear();

      this.text = text;
      this.isSuccess = true;
    },
    error: function(text) {
      this.clear();

      this.text = text;
      this.isError = true;
    },
    internalServerError: function(text) {
      this.clear();

      if (text) {
        this.text = text;
      } else {
        this.text = $translate("INTERNAL_SERVER_ERROR");
      }

      this.isError = true;
    },
    unauthorized: function(text) {
      this.clear();

      if (text) {
        this.text = text;
      } else {
        this.text = $translate("UNAUTHORIZED");
      }

      this.isError = true;
    },
    close: function() {
      this.clear();
    },
    clear: function() {
      this.text = null;
      this.isSuccess = false;
      this.isError = false;
    }
  };
  
  $rootScope.language = {
    change: function(key) {
      $translate.use(key);
    }
  };
});