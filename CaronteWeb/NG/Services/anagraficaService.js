var Caronte;
(function (Caronte) {
    var anagraficaService = (function () {
        function anagraficaService($http, $q) {
            this.wc = null;
            this.wc = $http;
            this.deferrer = $q;
        }
        anagraficaService.prototype.getAnagrafiche = function (onSuccess) {
            var result = this.deferrer.defer();
            this.wc.get("/api/anagrafica").success(function (data) {
                onSuccess(data);
            });
            return result.promise;
        };
        anagraficaService.prototype.editAnagrafica = function (anaObj, onSuccess, onError) {
            var result = this.deferrer.defer();
            this.wc.put("/api/anagrafica/", anaObj).success(function (data) {
                onSuccess(data);
            }).error(function (data) {
                onError(data);
            });
            return result.promise;
        };
        anagraficaService.prototype.deleteAnagrafica = function (IDAna, onSuccess) {
            var result = this.deferrer.defer();
            this.wc.delete("/api/anagrafica/" + IDAna).success(function (data) {
                onSuccess(data);
            });
            return result.promise;
        };
        return anagraficaService;
    })();
    Caronte.anagraficaService = anagraficaService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=anagraficaService.js.map