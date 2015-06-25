module Caronte {
	export interface IAppCtrlScope extends ng.IScope {
		coops: any;
		config: any;
	}

	export class personaleController {
		static $inject = ["$scope", "personaleService"];

		constructor(private $scope: IAppCtrlScope, persServ: personaleService) {
			
			//console.log(JSON.stringify(persServ.getAnagrafiche(), null, 2));
			persServ.getAnagrafiche((data) => {
				this.$scope.coops = data
				
			});		

			$scope.config = {
				itemsPerPage: 5,
				fillLastPage: true
			};
			
			//this.$scope.coops = compraCoop;// ["negretto", "negro", "negrone", "baluba",] 
		}
	}
}