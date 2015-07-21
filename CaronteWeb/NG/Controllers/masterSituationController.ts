module Caronte {
	interface IAppCtrlScope extends angular.IScope {
			
	
	}

	export class masterSituationController {
		static $inject = ["$scope", "masterSituationService"];
		scope: IAppCtrlScope;
		service: any;
	

		constructor(private $scope: IAppCtrlScope) {
			this.scope = $scope;
		
			this.initBindMetodi();
		}

		//#region Inizializzazione

	

		private initBindMetodi() {
		
		}

		//#endregion	
	}
}