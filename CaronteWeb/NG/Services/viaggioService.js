var Caronte;
(function (Caronte) {
    var viaggioService = (function () {
        function viaggioService($http, $q) {
            this.wc = null;
            this.wc = $http;
            this.deferrer = $q;
        }
        viaggioService.prototype.getStato = function (onSuccess) {
            var result = this.deferrer.defer();
            this.wc.get("/api/stato").success(function (data) {
                onSuccess(data);
            });
            return result.promise;
        };
        viaggioService.prototype.getDipendentiFilter = function (idRuolo, onSuccess) {
            var result = this.deferrer.defer();
            this.wc.get("/api/dipendente?ruolo=" + idRuolo).success(function (data) {
                onSuccess(data);
            });
            return result.promise;
        };
        viaggioService.prototype.getViaggi = function (page, howMany, onSuccess) {
            var result = this.deferrer.defer();
            this.wc.get("/api/viaggio?page=" + page + "&howMany=" + howMany).success(function (data) {
                onSuccess(data);
            });
            return result.promise;
        };
        viaggioService.prototype.createViaggio = function (viaObj, onSuccess, onError) {
            var result = this.deferrer.defer();
            this.wc.post("/api/viaggio/", viaObj).success(function (data) {
                onSuccess(data);
            }).error(function (data) {
                onError(data);
            });
            return result.promise;
        };
        viaggioService.prototype.editViaggio = function (viaObj, onSuccess, onError) {
            var result = this.deferrer.defer();
            this.wc.put("/api/viaggio/", viaObj).success(function (data) {
                onSuccess(data);
            }).error(function (data) {
                onError(data);
            });
            return result.promise;
        };
        viaggioService.prototype.deleteViaggio = function (IDVei, onSuccess, onError) {
            var result = this.deferrer.defer();
            this.wc.delete("/api/viaggio/" + IDVei).success(function (data) {
                onSuccess(data);
            }).error(function (data) {
                onError(data);
            });
            return result.promise;
        };
        return viaggioService;
    })();
    Caronte.viaggioService = viaggioService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=viaggioService.js.map