var Caronte;
(function (Caronte) {
    var summaryService = (function () {
        function summaryService($http, $q) {
            this.wc = null;
            this.wc = $http;
            this.deferrer = $q;
        }
        summaryService.prototype.getAnagrafiche = function (func) {
            var result = this.deferrer.defer();
            this.wc.get("/api/anagrafica").success(function (data) {
                func(data);
            });
            console.log(result.promise);
            return result.promise;
        };
        return summaryService;
    })();
    Caronte.summaryService = summaryService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=summaryService.js.map