module Caronte
{
	angular.module("Caronte", ["angular-table"])
		.service("anagraficaService", ["$http", "$q", ($http, $q) => new Caronte.anagraficaService($http, $q)])
		.service("personaleService", ["$http", "$q", ($http, $q) => new Caronte.personaleService($http, $q)])
		.service("veicoloService", ["$http", "$q", ($http, $q) => new Caronte.veicoloService($http, $q)])
	
		.controller("anagraficaController", Caronte.anagraficaController)
		.controller("personaleController", Caronte.personaleController)
		.controller("veicoloController", Caronte.veicoloController);
		//.controller("personaleController", ["$scope", "personaleService", ($scope, personaleService) => new Caronte.personaleController($scope, personaleService)]);
		
}