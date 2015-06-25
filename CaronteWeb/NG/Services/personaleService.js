var Caronte;
(function (Caronte) {
    var personaleService = (function () {
        function personaleService($http, $q) {
            this.wc = null;
            this.wc = $http;
            this.deferrer = $q;
        }
        personaleService.prototype.getAnagrafiche = function (func) {
            var result = this.deferrer.defer();
            this.wc.get("/api/anagrafica").success(function (data) {
                func(data);
            });
            console.log(result.promise);
            return result.promise;
        };
        return personaleService;
    })();
    Caronte.personaleService = personaleService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=personaleService.js.map