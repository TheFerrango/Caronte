var Caronte;
(function (Caronte) {
    var passeggeroService = (function () {
        function passeggeroService($http, $q) {
            this.wc = null;
            this.wc = $http;
            this.deferrer = $q;
        }
        passeggeroService.prototype.getAnagrafiche = function (onSuccess) {
            var result = this.deferrer.defer();
            this.wc.get("/api/anagrafica").success(function (data) {
                onSuccess(data);
            });
            return result.promise;
        };
        passeggeroService.prototype.getPasseggeri = function (page, howMany, idViaggio, onSuccess) {
            var result = this.deferrer.defer();
            this.wc.get("/api/spostamento?page=" + page + "&howMany=" + howMany + "&idViaggio=" + idViaggio).success(function (data) {
                onSuccess(data);
            });
            return result.promise;
        };
        passeggeroService.prototype.createPasseggero = function (pasObj, onSuccess, onError) {
            var result = this.deferrer.defer();
            this.wc.post("/api/spostamento/", pasObj).success(function (data) {
                onSuccess(data);
            }).error(function (data) {
                onError(data);
            });
            return result.promise;
        };
        passeggeroService.prototype.editPasseggero = function (pasObj, onSuccess, onError) {
            var result = this.deferrer.defer();
            this.wc.put("/api/spostamento/", pasObj).success(function (data) {
                onSuccess(data);
            }).error(function (data) {
                onError(data);
            });
            return result.promise;
        };
        passeggeroService.prototype.deletePasseggero = function (IDPas, onSuccess, onError) {
            var result = this.deferrer.defer();
            this.wc.delete("/api/spostamento/" + IDPas).success(function (data) {
                onSuccess(data);
            }).error(function (data) {
                onError(data);
            });
            return result.promise;
        };
        return passeggeroService;
    })();
    Caronte.passeggeroService = passeggeroService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=passeggeroService.js.map