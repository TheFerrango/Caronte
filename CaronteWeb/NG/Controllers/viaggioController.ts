module Caronte {
	interface IAppCtrlScope extends ng.IScope {
		coops: any;
		config: any;
	}

	export class viaggioController {
		static $inject = ["$scope", "viaggioService"];

		constructor(private $scope: IAppCtrlScope, persServ: viaggioService) {			
			
			persServ.getViaggi((data) => {
				this.$scope.coops = data
				
			});		

			$scope.config = {
				itemsPerPage: 5,
				fillLastPage: true
			};
			
		}
	}
}