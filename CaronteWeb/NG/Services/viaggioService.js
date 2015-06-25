var Caronte;
(function (Caronte) {
    var viaggioService = (function () {
        function viaggioService($http, $q) {
            this.wc = null;
            this.wc = $http;
            this.deferrer = $q;
        }
        viaggioService.prototype.getViaggi = function (onSuccess) {
            var result = this.deferrer.defer();
            this.wc.get("/api/viaggio").success(function (data) {
                onSuccess(data);
            });
            console.log(result.promise);
            return result.promise;
        };
        return viaggioService;
    })();
    Caronte.viaggioService = viaggioService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=viaggioService.js.map