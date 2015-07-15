module Caronte
{
	"use strict";

	angular.module("Caronte", ["angularBingMaps"])
		.service("anagraficaService", ["$http", "$q", ($http, $q) => new Caronte.anagraficaService($http, $q)])
		.service("personaleService", ["$http", "$q", ($http, $q) => new Caronte.personaleService($http, $q)])
		.service("veicoloService", ["$http", "$q", ($http, $q) => new Caronte.veicoloService($http, $q)])
		.service("viaggioService", ["$http", "$q", ($http, $q) => new Caronte.viaggioService($http, $q)])
		.service("passeggeroService", ["$http", "$q", ($http, $q) => new Caronte.passeggeroService($http, $q)])
		.controller("anagraficaController", Caronte.anagraficaController)
		.controller("personaleController", Caronte.personaleController)
		.controller("veicoloController", Caronte.veicoloController)
		.controller("viaggioController", Caronte.viaggioController);
		
}