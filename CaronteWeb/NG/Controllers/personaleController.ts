﻿module Caronte {
	interface IAppCtrlScope extends ng.IScope {
		coops: any;
		config: any;
	}

	export class personaleController {
		static $inject = ["$scope", "personaleService"];

		constructor(private $scope: IAppCtrlScope, persServ: personaleService) {
			persServ.getPersonale((data) => {
				this.$scope.coops = data
				
			});		

			$scope.config = {
				itemsPerPage: 5,
				fillLastPage: true
			};
		}
	}
}