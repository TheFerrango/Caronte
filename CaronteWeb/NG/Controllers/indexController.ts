module Caronte {
	interface IAppCtrlScope extends ng.IScope {
		coops: any;
		config: any;
	}

	export class indexController {
		static $inject = ["$scope", "indexService"];

		constructor(private $scope: IAppCtrlScope, persServ: indexService) {			
			
			//persServ.getAnagrafiche((data) => {
			//	this.$scope.coops = data
				
			//});		

			//$scope.config = {
			//	itemsPerPage: 5,
			//	fillLastPage: true
			//};
			
		}
	}
}