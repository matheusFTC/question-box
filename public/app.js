"use strict";

var app = angular.module("qbApp", ["ngRoute", "ngCookies", "pascalprecht.translate"]);

app.config(function($routeProvider, $translateProvider) {

  $routeProvider.otherwise({
    redirectTo: "/"
  });

  $translateProvider.translations("en", {
    "ACTIVE": "Active",
    "ANSWERED_QUESTIONS": "Answered questions",
    "AUTHENTICATION": "Authentication",
    "BTN_EXIT": "Exit",
    "BTN_FINISH": "Finish",
    "BTN_HOME": "Home",
    "BTN_PREVIOUS": "Previous",
    "BTN_NEXT": "Next",
    "BTN_REMAKE": "Remake",
    "BTN_REVIEW": "Review",
    "BTN_SAVE": "Save",
    "BTN_START": "Start",
    "ERROR_LOAD_GROUP": "Something went wrong, try again...",
    "ERRORS": "Errors",
    "FINALIZE_MODAL_BODY": "Make sure all questions have been answered before finalizing.",
    "FINALIZE_MODAL_TITLE": "Do you really want to finish?",
    "FULLNAME": "Fullname",
    "GROUP": "Group",
    "GROUP_FILTER": "Do you look for which group?",
    "GROUP_NOT_FOUND": "Group not found.",
    "GROUP_NOT_LOADED": "Group not loaded.",
    "GROUPS": "Groups",
    "HITS": "Hits",
    "INTERNAL_SERVER_ERROR": "This action could not be taken.",
    "LOG_IN": "Log In",
    "LOG_OUT": "Log Out",
    "NO": "No",
    "PASSWORD": "Password",
    "UNANSWERED_QUESTIONS": "Unanswered questions",
    "UNAUTHORIZED": "You are not authorized to perform this action.",
    "REQUIRED_USERNAME_PASSWORD": "Enter the username and password.",
    "UNABLE_AUTHENTICATE": "We were unable to authenticate.",
    "USER": "User",
    "USER_FILTER": "Do you look for which user?",
    "USERNAME": "Username",
    "USERNAME_PASSWORD_INVALID": "Username or password is invalid!",
    "USERS": "Users",
    "YES": "Yes",
    "YOUR_RESULT": "Your result"
  });

  $translateProvider.translations("pt", {
    "ACTIVE": "Ativo",
    "ANSWERED_QUESTIONS": "Questões respondidas",
    "AUTHENTICATION": "Autenticação",
    "BTN_EXIT": "Sair",
    "BTN_FINISH": "Finalizar",
    "BTN_HOME": "Início",
    "BTN_PREVIOUS": "Anterior",
    "BTN_NEXT": "Próximo",
    "BTN_REMAKE": "Refazer",
    "BTN_REVIEW": "Revisar",
    "BTN_SAVE": "Salvar",
    "BTN_START": "Iniciar",
    "ERROR_LOAD_GROUP": "Algo está errado, tente outra vez...",
    "ERRORS": "Erros",
    "FINALIZE_MODAL_BODY": "Verifique se todas as perguntas foram respondidas antes de finalizar.",
    "FINALIZE_MODAL_TITLE": "Deseja realmente finalizar?",
    "FULLNAME": "Nome Completo",
    "GROUP": "Grupo",
    "GROUP_FILTER": "Você procura por qual grupo?",
    "GROUP_NOT_FOUND": "Grupo não encontrado.",
    "GROUP_NOT_LOADED": "Grupo não carregado.",
    "GROUPS": "Grupos",
    "HITS": "Acertos",
    "INTERNAL_SERVER_ERROR": "Não foi possível concluir esta ação.",
    "LOG_IN": "Entrar",
    "LOG_OUT": "Sair",
    "NO": "Não",
    "PASSWORD": "Senha",
    "UNANSWERED_QUESTIONS": "Questões não respondidas",
    "UNAUTHORIZED": "Você não possui permissão para esta ação.",
    "REQUIRED_USERNAME_PASSWORD": "Informe o nome de usuário e senha.",
    "UNABLE_AUTHENTICATE": "Não foi possível autenticar.",
    "USER": "Usuário",
    "USER_FILTER": "Você procura por qual usuário?",
    "USERNAME": "Nome de Usuário",
    "USERNAME_PASSWORD_INVALID": "Usuário e/ou senha inválido(s)!",
    "USERS": "Usuários",
    "YES": "Sim",
    "YOUR_RESULT": "Seu resultado"
  });

  $translateProvider.preferredLanguage("pt");
  $translateProvider.useSanitizeValueStrategy("escape");
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
        $translate("INTERNAL_SERVER_ERROR").then(function(translation) {
          this.text = translation;
        });
      }

      this.isError = true;
    },
    unauthorized: function(text) {
      this.clear();

      if (text) {
        this.text = text;
      } else {
        $translate("UNAUTHORIZED").then(function(translation) {
          this.text = translation;
        });
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