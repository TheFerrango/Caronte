var Caronte;
(function (Caronte) {
    "use strict";
    var app = angular.module("Caronte", ["ngRoute", "LocalStorageModule", "angularBingMaps", "SignalR"]).service("summaryService", ["$http", "$q", function ($http, $q) { return new Caronte.summaryService($http, $q); }]).service("anagraficaService", ["$http", "$q", function ($http, $q) { return new Caronte.anagraficaService($http, $q); }]).service("personaleService", ["$http", "$q", function ($http, $q) { return new Caronte.personaleService($http, $q); }]).service("veicoloService", ["$http", "$q", function ($http, $q) { return new Caronte.veicoloService($http, $q); }]).service("viaggioService", ["$http", "$q", function ($http, $q) { return new Caronte.viaggioService($http, $q); }]).service("passeggeroService", ["$http", "$q", function ($http, $q) { return new Caronte.passeggeroService($http, $q); }]).service("masterSituationService", ["$http", "$q", function ($http, $q) { return new Caronte.masterSituationService($http, $q); }]).service("journeyReviewService", ["$http", "$q", function ($http, $q) { return new Caronte.journeyReviewService($http, $q); }]).controller("summaryController", Caronte.summaryController).controller("anagraficaController", Caronte.anagraficaController).controller("personaleController", Caronte.personaleController).controller("veicoloController", Caronte.veicoloController).controller("viaggioController", Caronte.viaggioController).controller("indexController", Caronte.indexController).controller("masterSituationController", Caronte.masterSituationController).controller("journeyReviewController", Caronte.journeyReviewController).factory("minosseService", ["$http", "$q", "localStorageService", function ($http, $q, localStorageService) { return new Caronte.minosseService($http, $q, localStorageService); }]).factory("interceptorService", ["$q", "$location", "localStorageService", function ($q, $location, localStorageService) { return new Caronte.interceptorService($q, $location, localStorageService); }]);
    app.config(function ($routeProvider) {
        $routeProvider.when("/Anagrafica", {
            controller: "anagraficaController",
            templateUrl: "Views/Anagrafica.html"
        });
        $routeProvider.when("/Personale", {
            controller: "personaleController",
            templateUrl: "Views/Personale.html"
        });
        $routeProvider.when("/Veicoli", {
            controller: "veicoloController",
            templateUrl: "Views/Veicoli.html"
        });
        $routeProvider.when("/Viaggi", {
            controller: "viaggioController",
            templateUrl: "Views/Viaggi.html"
        });
        $routeProvider.when("/MasterSituation", {
            controller: "masterSituationController",
            templateUrl: "Views/MasterSituation.html"
        });
        $routeProvider.when("/JourneyReview", {
            controller: "journeyReviewController",
            templateUrl: "Views/JourneyReview.html"
        });
        $routeProvider.when("/Login", {
            controller: "loginController",
            templateUrl: "Views/Login.html"
        });
        $routeProvider.otherwise({
            controller: "summaryController",
            templateUrl: "Views/Summary.html"
        });
    });
    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('interceptorService');
    });
})(Caronte || (Caronte = {}));
//# sourceMappingURL=app.js.map