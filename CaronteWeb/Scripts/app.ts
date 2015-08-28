module Caronte {
	"use strict";

	var app = angular.module("Caronte", ["ngRoute", "LocalStorageModule", "angularBingMaps"])
		.service("summaryService", ["$http", "$q", ($http, $q) => new Caronte.summaryService($http, $q)])
		.service("anagraficaService", ["$http", "$q", ($http, $q) => new Caronte.anagraficaService($http, $q)])
		.service("personaleService", ["$http", "$q", ($http, $q) => new Caronte.personaleService($http, $q)])
		.service("veicoloService", ["$http", "$q", ($http, $q) => new Caronte.veicoloService($http, $q)])
		.service("viaggioService", ["$http", "$q", ($http, $q) => new Caronte.viaggioService($http, $q)])
		.service("passeggeroService", ["$http", "$q", ($http, $q) => new Caronte.passeggeroService($http, $q)])
		.service("masterSituationService", ["$http", "$q", ($http, $q) => new Caronte.masterSituationService($http, $q)])
		.controller("summaryController", Caronte.summaryController)
		.controller("anagraficaController", Caronte.anagraficaController)
		.controller("personaleController", Caronte.personaleController)
		.controller("veicoloController", Caronte.veicoloController)
		.controller("viaggioController", Caronte.viaggioController)
		.controller("indexController", Caronte.indexController)
		.controller("masterSituationController", Caronte.masterSituationController)
		.factory("minosseService", ["$http", "$q", "localStorageService", ($http, $q, localStorageService) => new Caronte.minosseService($http, $q, localStorageService)])
		.factory("interceptorService", ["$q", "$location", "localStorageService", ($q, $location, localStorageService) => new Caronte.interceptorService($q, $location, localStorageService)])
		.factory("hubProxy", ["$q", "$rootScope", ($q, $rootScope) => new Caronte.ViagginCorsoHubProxy($q, $rootScope)]);
	
	app.config(($routeProvider: ng.route.IRouteProvider) => {	
			
		

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

		$routeProvider.when("/Login", {
			controller: "loginController",
			templateUrl: "Views/Login.html"
		});

		$routeProvider.otherwise({
			controller: "summaryController",
			templateUrl: "Views/Summary.html"
		});
	});


	app.config(($httpProvider: ng.IHttpProvider) => {
		$httpProvider.interceptors.push('interceptorService');
	});

 

}