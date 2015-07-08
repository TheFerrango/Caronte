var Caronte;
(function (Caronte) {
    var personaleService = (function () {
        function personaleService($http, $q) {
            this.wc = null;
            this.wc = $http;
            this.deferrer = $q;
        }
        personaleService.prototype.getAnagraficheFilter = function (filter, onSuccess) {
            if (!filter)
                filter = "";
            var result = this.deferrer.defer();
            this.wc.get("/api/anagrafica?filter=" + filter).success(function (data) {
                onSuccess(data);
            });
            return result.promise;
        };
        personaleService.prototype.getRuolo = function (onSuccess) {
            var result = this.deferrer.defer();
            this.wc.get("/api/ruolo").success(function (data) {
                onSuccess(data);
            });
            return result.promise;
        };
        personaleService.prototype.getPersonale = function (page, howMany, onSuccess) {
            var result = this.deferrer.defer();
            this.wc.get("/api/dipendente?page=" + page + "&howMany=" + howMany).success(function (data) {
                onSuccess(data);
            });
            return result.promise;
        };
        personaleService.prototype.createPersonale = function (perObj, onSuccess, onError) {
            var result = this.deferrer.defer();
            this.wc.post("/api/dipendente/", perObj).success(function (data) {
                onSuccess(data);
            }).error(function (data) {
                onError(data);
            });
            return result.promise;
        };
        personaleService.prototype.editPersonale = function (perObj, onSuccess, onError) {
            var result = this.deferrer.defer();
            this.wc.put("/api/dipendente/", perObj).success(function (data) {
                onSuccess(data);
            }).error(function (data) {
                onError(data);
            });
            return result.promise;
        };
        personaleService.prototype.deletePersonale = function (IDPer, onSuccess, onError) {
            var result = this.deferrer.defer();
            this.wc.delete("/api/dipendente/" + IDPer).success(function (data) {
                onSuccess(data);
            }).error(function (data) {
                onError(data);
            });
            return result.promise;
        };
        return personaleService;
    })();
    Caronte.personaleService = personaleService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=personaleService.js.map