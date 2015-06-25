var Caronte;
(function (Caronte) {
    var personaleController = (function () {
        function personaleController($scope, persServ) {
            var _this = this;
            this.$scope = $scope;
            //console.log(JSON.stringify(persServ.getAnagrafiche(), null, 2));
            persServ.getAnagrafiche(function (data) {
                _this.$scope.coops = data;
            });
            $scope.config = {
                itemsPerPage: 5,
                fillLastPage: true
            };
            //this.$scope.coops = compraCoop;// ["negretto", "negro", "negrone", "baluba",] 
        }
        personaleController.$inject = ["$scope", "personaleService"];
        return personaleController;
    })();
    Caronte.personaleController = personaleController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=personaleController.js.map