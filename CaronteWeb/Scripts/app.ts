module Caronte
{
	"use strict";

	
	var app = angular.module("Caronte", ["ngRoute", "angularBingMaps"])
		.service("situationManagerService", ["$http", "$q", ($http, $q) => new Caronte.situationManagerService($http, $q)])
		.service("anagraficaService", ["$http", "$q", ($http, $q) => new Caronte.anagraficaService($http, $q)])
		.service("personaleService", ["$http", "$q", ($http, $q) => new Caronte.personaleService($http, $q)])
		.service("veicoloService", ["$http", "$q", ($http, $q) => new Caronte.veicoloService($http, $q)])
		.service("viaggioService", ["$http", "$q", ($http, $q) => new Caronte.viaggioService($http, $q)])
		.service("passeggeroService", ["$http", "$q", ($http, $q) => new Caronte.passeggeroService($http, $q)])
		.controller("situationManagerController", Caronte.situationManagerController)
		.controller("anagraficaController", Caronte.anagraficaController)
		.controller("personaleController", Caronte.personaleController)
		.controller("veicoloController", Caronte.veicoloController)
		.controller("viaggioController", Caronte.viaggioController);


	app.config(function ($routeProvider: ng.route.IRouteProvider) {
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

		$routeProvider.otherwise({
			controller: "situationManagerController",
			templateUrl: "Views/SituationManager.html"
		});
	});

		
}