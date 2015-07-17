module Caronte {
	interface IAppCtrlScope extends ng.IScope {
		coops: any;
		config: any;
	}

	export class situationManagerController {
		static $inject = ["$scope", "situationManagerService", "minosseService"];

		constructor(private $scope: IAppCtrlScope, persServ: situationManagerService,minServ: any) {			
			console.log(minServ);
			console.log(JSON.stringify(minServ.authentication()));
			console.log(minServ.login({ "userName": "Admin", "password": "marzosmarzo" }));
			console.log(JSON.stringify(minServ.authentication()));
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