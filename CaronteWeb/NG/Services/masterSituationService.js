var Caronte;
(function (Caronte) {
    var masterSituationService = (function () {
        function masterSituationService($http, $q) {
            this.wc = null;
            this.wc = $http;
            this.deferrer = $q;
        }
        masterSituationService.prototype.getAnagrafiche = function (func) {
            var result = this.deferrer.defer();
            this.wc.get("/api/anagrafica").success(function (data) {
                func(data);
            });
            console.log(result.promise);
            return result.promise;
        };
        return masterSituationService;
    })();
    Caronte.masterSituationService = masterSituationService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=masterSituationService.js.map