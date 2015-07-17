var Caronte;
(function (Caronte) {
    var situationManagerController = (function () {
        function situationManagerController($scope, persServ, minServ) {
            this.$scope = $scope;
            console.log(minServ);
            console.log(JSON.stringify(minServ.authentication()));
            console.log(minServ.login({ "userName": "Admin", "password": "marzosmarzo" }));
            console.log(JSON.stringify(minServ.authentication()));
            //persServ.getAnagrafiche((data) => {
            //	this.$scope.coops = data
            //});		
            //$scope.config = {
            //	itemsPerPage: 5,
            //	fillLastPage: true
            //};
        }
        situationManagerController.$inject = ["$scope", "situationManagerService", "minosseService"];
        return situationManagerController;
    })();
    Caronte.situationManagerController = situationManagerController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=situationManagerController.js.map