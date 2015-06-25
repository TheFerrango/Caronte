var Caronte;
(function (Caronte) {
    var veicoloService = (function () {
        function veicoloService($http, $q) {
            this.wc = null;
            this.wc = $http;
            this.deferrer = $q;
        }
        veicoloService.prototype.getVeicoli = function (onSuccess) {
            var result = this.deferrer.defer();
            this.wc.get("/api/veicolo").success(function (data) {
                onSuccess(data);
            });
            console.log(result.promise);
            return result.promise;
        };
        return veicoloService;
    })();
    Caronte.veicoloService = veicoloService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=veicoloService.js.map