var Caronte;
(function (Caronte) {
    var personaleController = (function () {
        function personaleController($scope, persServ) {
            var _this = this;
            this.$scope = $scope;
            persServ.getPersonale(function (data) {
                _this.$scope.coops = data;
            });
            $scope.config = {
                itemsPerPage: 5,
                fillLastPage: true
            };
        }
        personaleController.$inject = ["$scope", "personaleService"];
        return personaleController;
    })();
    Caronte.personaleController = personaleController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=personaleController.js.map