module Caronte {
	interface IAppCtrlScope extends Caronte.ICaronteBaseScope {
		logoutUser: Function;
	}

	export class summaryController {
		static $inject = ["$scope", "summaryService", "minosseService"];
		private scope: IAppCtrlScope;
		private minosseSrv: any;

		constructor(private $scope: IAppCtrlScope, persServ: summaryService, miNos: any) {			
			this.scope = $scope;
			this.minosseSrv = miNos;

			this.scope.SetArrowVisibility(false);
			this.scope.SetTitle("Welcome to Project Caronte!");

			this.scope.logoutUser = () => this.logoutUser();
		}

		private logoutUser() {
			this.minosseSrv.logOut();
			location.href = "/";
		}
	}
}