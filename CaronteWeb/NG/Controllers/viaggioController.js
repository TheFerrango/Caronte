var Caronte;
(function (Caronte) {
    var viaggioController = (function () {
        function viaggioController($scope, persServ) {
            var _this = this;
            this.$scope = $scope;
            persServ.getViaggi(function (data) {
                _this.$scope.coops = data;
            });
            $scope.config = {
                itemsPerPage: 5,
                fillLastPage: true
            };
        }
        viaggioController.$inject = ["$scope", "viaggioService"];
        return viaggioController;
    })();
    Caronte.viaggioController = viaggioController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=viaggioController.js.map