module Caronte {
	interface IAppCtrlScope extends ng.IScope {
		coops: any;
		config: any;
	}

	export class veicoloController {
		static $inject = ["$scope", "veicoloService"];

		constructor(private $scope: IAppCtrlScope, persServ: veicoloService) {			
			
			persServ.getVeicoli((data) => {
				this.$scope.coops = data
				
			});		

			$scope.config = {
				itemsPerPage: 5,
				fillLastPage: true
			};
			
		}
	}
}