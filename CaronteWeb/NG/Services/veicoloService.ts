module Caronte {

    export class veicoloService {
		private wc: ng.IHttpService = null;
		private deferrer: ng.IQService;
		constructor($http: ng.IHttpService, $q: ng.IQService) {
			this.wc = $http;
			this.deferrer = $q;

		}

		public getVeicoli(onSuccess: Function) {
			var result = this.deferrer.defer();
			this.wc.get("/api/veicolo")
				.success((data) => {
				onSuccess(data);
			});

			console.log(result.promise);
			return result.promise;

		}
    }
}