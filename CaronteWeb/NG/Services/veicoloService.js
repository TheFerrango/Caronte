var Caronte;
(function (Caronte) {
    var veicoloService = (function () {
        function veicoloService($http, $q) {
            this.wc = null;
            this.wc = $http;
            this.deferrer = $q;
        }
        veicoloService.prototype.getVeicoli = function (page, howMany, onSuccess) {
            var result = this.deferrer.defer();
            this.wc.get("/api/veicolo?page=" + page + "&howMany=" + howMany).success(function (data) {
                onSuccess(data);
            });
            return result.promise;
        };
        veicoloService.prototype.createVeicolo = function (veiObj, onSuccess, onError) {
            var result = this.deferrer.defer();
            this.wc.post("/api/veicolo/", veiObj).success(function (data) {
                onSuccess(data);
            }).error(function (data) {
                onError(data);
            });
            return result.promise;
        };
        veicoloService.prototype.editVeicolo = function (veiObj, onSuccess, onError) {
            var result = this.deferrer.defer();
            this.wc.put("/api/veicolo/", veiObj).success(function (data) {
                onSuccess(data);
            }).error(function (data) {
                onError(data);
            });
            return result.promise;
        };
        veicoloService.prototype.deleteVeicolo = function (IDVei, onSuccess, onError) {
            var result = this.deferrer.defer();
            this.wc.delete("/api/veicolo/" + IDVei).success(function (data) {
                onSuccess(data);
            }).error(function (data) {
                onError(data);
            });
            return result.promise;
        };
        return veicoloService;
    })();
    Caronte.veicoloService = veicoloService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=veicoloService.js.map