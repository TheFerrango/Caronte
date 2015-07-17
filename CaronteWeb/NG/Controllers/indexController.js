var Caronte;
(function (Caronte) {
    var indexController = (function () {
        function indexController($scope, persServ) {
            //persServ.getAnagrafiche((data) => {
            //	this.$scope.coops = data
            this.$scope = $scope;
            //});		
            //$scope.config = {
            //	itemsPerPage: 5,
            //	fillLastPage: true
            //};
        }
        indexController.$inject = ["$scope", "indexService"];
        return indexController;
    })();
    Caronte.indexController = indexController;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=indexController.js.map