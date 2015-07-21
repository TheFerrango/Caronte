var Caronte;
(function (Caronte) {
    var masterSituationController = (function () {
        function masterSituationController($scope) {
            this.$scope = $scope;
            this.scope = $scope;
            this.initBindMetodi();
        }
        //#region Inizializzazione
        masterSituationController.prototype.initBindMetodi = function () {
        };
        masterSituationController.$inject = ["$scope", "masterSituationService"];
        return masterSituationController;
    })();
    Caronte.masterSituationController = masterSituationController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=masterSituationController.js.map