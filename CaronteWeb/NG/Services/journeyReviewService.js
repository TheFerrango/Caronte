var Caronte;
(function (Caronte) {
    var journeyReviewService = (function () {
        function journeyReviewService($http, $q) {
            this.wc = null;
            this.wc = $http;
            this.deferrer = $q;
        }
        journeyReviewService.prototype.getViaggio = function (IDViaggio, func) {
            this.wc.get("/api/viaggio/" + IDViaggio).success(function (data) {
                func(data);
            });
        };
        journeyReviewService.prototype.getPosizioni = function (IDViaggio, func) {
            this.wc.get("/api/posizione/getbyviaggio/" + IDViaggio).success(function (data) {
                func(data);
            });
        };
        journeyReviewService.prototype.getPasseggeri = function (IDViaggio, func) {
            this.wc.get("/api/spostamento?idViaggio=" + IDViaggio).success(function (data) {
                func(data);
            });
        };
        return journeyReviewService;
    })();
    Caronte.journeyReviewService = journeyReviewService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=journeyReviewService.js.map