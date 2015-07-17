var Caronte;
(function (Caronte) {
    var indexService = (function () {
        function indexService($http, $q) {
            this.wc = null;
            this.wc = $http;
            this.deferrer = $q;
        }
        indexService.prototype.getAnagrafiche = function (func) {
            var result = this.deferrer.defer();
            this.wc.get("/api/anagrafica").success(function (data) {
                func(data);
            });
            console.log(result.promise);
            return result.promise;
        };
        return indexService;
    })();
    Caronte.indexService = indexService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=indexService.js.map