var Caronte;
(function (Caronte) {
    var masterSituationService = (function () {
        function masterSituationService($http, $q) {
            this.wc = null;
            this.wc = $http;
            this.deferrer = $q;
        }
        masterSituationService.prototype.getViaggi = function (soloInCorso, func) {
            var result = this.deferrer.defer();
            // + soloInCorso ? "?idStato=2" : ""
            this.wc.get("/api/viaggio" + (soloInCorso ? "?idStato=2" : "")).success(function (data) {
                func(data);
            });
            console.log(result.promise);
            return result.promise;
        };
        masterSituationService.prototype.getPosizioni = function (IDViaggio, func) {
            //TODO implementa get dal server
            var res = {};
            func(res, IDViaggio);
        };
        return masterSituationService;
    })();
    Caronte.masterSituationService = masterSituationService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=masterSituationService.js.map