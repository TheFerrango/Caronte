var Caronte;
(function (Caronte) {
    var summaryController = (function () {
        function summaryController($scope, persServ, miNos) {
            var _this = this;
            this.$scope = $scope;
            this.scope = $scope;
            this.minosseSrv = miNos;
            this.scope.logoutUser = function () { return _this.logoutUser(); };
        }
        summaryController.prototype.logoutUser = function () {
            this.minosseSrv.logOut();
            location.href = "/";
        };
        summaryController.$inject = ["$scope", "summaryService", "minosseService"];
        return summaryController;
    })();
    Caronte.summaryController = summaryController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=summaryController.js.map