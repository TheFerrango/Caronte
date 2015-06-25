module Caronte
{
	angular.module("Caronte", ["angular-table"])
		.service("personaleService", ["$http", "$q" , ($http, $q) => new Caronte.personaleService($http, $q)])
		.controller("personaleController", Caronte.personaleController);

		//.controller("personaleController", ["$scope", "personaleService", ($scope, personaleService) => new Caronte.personaleController($scope, personaleService)]);
		
}