var Caronte;
(function (Caronte) {
    var personaleService = (function () {
        function personaleService($http, $q) {
            this.wc = null;
            this.wc = $http;
            this.deferrer = $q;
        }
        personaleService.prototype.getPersonale = function (onSuccess) {
            var result = this.deferrer.defer();
            this.wc.get("/api/dipendente").success(function (data) {
                onSuccess(data);
            });
            console.log(result.promise);
            return result.promise;
        };
        return personaleService;
    })();
    Caronte.personaleService = personaleService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=personaleService.js.map