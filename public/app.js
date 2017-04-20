"use strict";

var app = angular.module("qbApp", ["ngRoute", "ngCookies", "pascalprecht.translate"]);

app.config(function($routeProvider, $translateProvider) {

  $routeProvider.otherwise({
    redirectTo: "/"
  });

  $translateProvider.translations("en", {
    "ANSWERED_QUESTIONS": "Answered questions",
    "BTN_EXIT": "Exit",
    "BTN_FINISH": "Finish",
    "BTN_HOME": "Home",
    "BTN_PREVIOUS": "Previous",
    "BTN_NEXT": "Next",
    "BTN_REMAKE": "Remake",
    "BTN_REVIEW": "Review",
    "BTN_START": "Start",
    "ERROR_LOAD_GROUP": "Something went wrong, try again...",
    "ERRORS": "Errors",
    "FINALIZE_MODAL_BODY": "Make sure all questions have been answered before finalizing.",
    "FINALIZE_MODAL_TITLE": "Do you really want to finish?",
    "GROUP_FILTER": "Do you look for which group?",
    "HITS": "Hits",
    "INTERNAL_SERVER_ERROR": "This action could not be taken.",
    "TITLE": "Question Box",
    "UNANSWERED_QUESTIONS": "Unanswered questions",
    "UNAUTHORIZED": "You are not authorized to perform this action.",
    "YOUR_RESULT": "Your result"
  });

  $translateProvider.translations("pt", {
    "ANSWERED_QUESTIONS": "Questões respondidas",
    "BTN_EXIT": "Sair",
    "BTN_FINISH": "Finalizar",
    "BTN_HOME": "Início",
    "BTN_PREVIOUS": "Anterior",
    "BTN_NEXT": "Próximo",
    "BTN_REMAKE": "Refazer",
    "BTN_REVIEW": "Revisar",
    "BTN_START": "Iniciar",
    "ERROR_LOAD_GROUP": "Algo está errado, tente outra vez...",
    "ERRORS": "Erros",
    "FINALIZE_MODAL_BODY": "Verifique se todas as perguntas foram respondidas antes de finalizar.",
    "FINALIZE_MODAL_TITLE": "Deseja realmente finalizar?",
    "GROUP_FILTER": "Você procura por qual grupo?",
    "HITS": "Acertos",
    "INTERNAL_SERVER_ERROR": "Não foi possível concluir esta ação.",
    "TITLE": "Caixa de Questões",
    "UNANSWERED_QUESTIONS": "Questões não respondidas",
    "UNAUTHORIZED": "Você não possui permissão para esta ação.",
    "YOUR_RESULT": "Seu resultado"
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