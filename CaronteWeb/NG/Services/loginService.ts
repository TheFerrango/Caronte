module Caronte {

	export class loginService {
		private wc: ng.IHttpService = null;
		private deferrer: ng.IQService;
		constructor($http: ng.IHttpService, $q: ng.IQService) {
			this.wc = $http;
			this.deferrer = $q;

		}

		public executeLogin(username: string, password: string) : boolean {
			return true
		}
	}
}