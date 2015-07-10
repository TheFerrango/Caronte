var Caronte;
(function (Caronte) {
    "use strict";
    angular.module("Caronte", ["angularBingMaps"]).service("anagraficaService", ["$http", "$q", function ($http, $q) { return new Caronte.anagraficaService($http, $q); }]).service("personaleService", ["$http", "$q", function ($http, $q) { return new Caronte.personaleService($http, $q); }]).service("veicoloService", ["$http", "$q", function ($http, $q) { return new Caronte.veicoloService($http, $q); }]).service("viaggioService", ["$http", "$q", function ($http, $q) { return new Caronte.viaggioService($http, $q); }]).controller("anagraficaController", Caronte.anagraficaController).controller("personaleController", Caronte.personaleController).controller("veicoloController", Caronte.veicoloController).controller("viaggioController", Caronte.viaggioController);
})(Caronte || (Caronte = {}));
//# sourceMappingURL=app.js.map