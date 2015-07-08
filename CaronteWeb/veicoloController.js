var Caronte;
(function (Caronte) {
    var veicoloController = (function () {
        function veicoloController($scope, persServ) {
            var _this = this;
            this.$scope = $scope;
            persServ.getVeicoli(function (data) {
                _this.$scope.coops = data;
            });
            $scope.config = {
                itemsPerPage: 5,
                fillLastPage: true
            };
        }
        veicoloController.$inject = ["$scope", "veicoloService"];
        return veicoloController;
    })();
    Caronte.veicoloController = veicoloController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=veicoloController.js.map