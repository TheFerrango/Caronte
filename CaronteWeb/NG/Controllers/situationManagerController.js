var Caronte;
(function (Caronte) {
    var situationManagerController = (function () {
        function situationManagerController($scope, persServ, miNos) {
            var _this = this;
            this.$scope = $scope;
            this.scope = $scope;
            this.minosseSrv = miNos;
            this.scope.logoutUser = function () { return _this.logoutUser(); };
        }
        situationManagerController.prototype.logoutUser = function () {
            this.minosseSrv.logOut();
            location.href = "/";
        };
        situationManagerController.$inject = ["$scope", "situationManagerService", "minosseService"];
        return situationManagerController;
    })();
    Caronte.situationManagerController = situationManagerController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=situationManagerController.js.map