var Caronte;
(function (Caronte) {
    angular.module("Caronte", []).service("anagraficaService", ["$http", "$q", function ($http, $q) { return new Caronte.anagraficaService($http, $q); }]).service("personaleService", ["$http", "$q", function ($http, $q) { return new Caronte.personaleService($http, $q); }]).service("veicoloService", ["$http", "$q", function ($http, $q) { return new Caronte.veicoloService($http, $q); }]).controller("anagraficaController", Caronte.anagraficaController).controller("personaleController", Caronte.personaleController).controller("veicoloController", Caronte.veicoloController);
})(Caronte || (Caronte = {}));
//# sourceMappingURL=app.js.map