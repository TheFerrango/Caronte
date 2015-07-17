module Caronte {
	interface IAppCtrlScope extends ng.IScope {
		coops: any;
		config: any;
	}

	export class situationManagerController {
		static $inject = ["$scope", "situationManagerService"];

		constructor(private $scope: IAppCtrlScope, persServ: situationManagerService) {			
			
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