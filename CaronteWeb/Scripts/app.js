var Caronte;
(function (Caronte) {
    angular.module("Caronte", ["angular-table"]).service("personaleService", ["$http", "$q", function ($http, $q) { return new Caronte.personaleService($http, $q); }]).controller("personaleController", Caronte.personaleController);
})(Caronte || (Caronte = {}));
//# sourceMappingURL=app.js.map