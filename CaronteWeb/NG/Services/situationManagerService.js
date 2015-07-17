var Caronte;
(function (Caronte) {
    var situationManagerService = (function () {
        function situationManagerService($http, $q) {
            this.wc = null;
            this.wc = $http;
            this.deferrer = $q;
        }
        situationManagerService.prototype.getAnagrafiche = function (func) {
            var result = this.deferrer.defer();
            this.wc.get("/api/anagrafica").success(function (data) {
                func(data);
            });
            console.log(result.promise);
            return result.promise;
        };
        return situationManagerService;
    })();
    Caronte.situationManagerService = situationManagerService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=situationManagerService.js.map