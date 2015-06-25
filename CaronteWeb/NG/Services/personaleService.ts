module Caronte {

    export class personaleService {
		wc: ng.IHttpService = null;
		deferrer: ng.IQService;
		constructor($http: ng.IHttpService, $q: ng.IQService) {
			this.wc = $http;
			this.deferrer = $q;

		}

		public getAnagrafiche(func: Function) {
			var result = this.deferrer.defer();
			this.wc.get("/api/anagrafica")
				.success((data) => {
				func(data);
			});

			console.log(result.promise);
			return result.promise;

		}
    }
}