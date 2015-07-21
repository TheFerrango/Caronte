var Caronte;
(function (Caronte) {
    var loginController = (function () {
        function loginController($scope, persServ) {
            this.$scope = $scope;
            this.scope = $scope;
            this.service = persServ;
            this.initBindMetodi();
        }
        //#region Inizializzazione
        loginController.prototype.initBindMetodi = function () {
            console.log("logga");
        };
        loginController.$inject = ["$scope", "loginService"];
        return loginController;
    })();
    Caronte.loginController = loginController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=loginController.js.map