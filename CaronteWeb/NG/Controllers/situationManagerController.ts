module Caronte {
	interface IAppCtrlScope extends ng.IScope {
		logoutUser: Function;
	}

	export class situationManagerController {
		static $inject = ["$scope", "situationManagerService", "minosseService"];
		private scope: IAppCtrlScope;
		private minosseSrv: any;

		constructor(private $scope: IAppCtrlScope, persServ: situationManagerService, miNos: any) {			
			this.scope = $scope;
			this.minosseSrv = miNos;
			this.scope.logoutUser = () => this.logoutUser();
		}

		private logoutUser() {
			this.minosseSrv.logOut();
			location.href = "/";
		}
	}
}