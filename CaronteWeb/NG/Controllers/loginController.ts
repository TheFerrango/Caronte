module Caronte {
	interface IAppCtrlScope extends angular.IScope {
		loginData: Function;
		submittami: Function;
		cancelLogin: Function;
	}

	export class loginController {
		static $inject = ["$scope", "loginService"];
		scope: IAppCtrlScope;
		service: loginService;

		constructor(private $scope: IAppCtrlScope, persServ: loginService) {
			this.scope = $scope;
			this.service = persServ;
			this.initBindMetodi();
		}

		//#region Inizializzazione

		private initBindMetodi() {
			console.log("logga")
		}

		//#endregion
	}
}