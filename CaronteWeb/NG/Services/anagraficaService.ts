module Caronte {

	export class anagraficaService {
		private wc: ng.IHttpService = null;
		private deferrer: ng.IQService;
		constructor($http: ng.IHttpService, $q: ng.IQService) {
			this.wc = $http;
			this.deferrer = $q;

		}

		public getAnagrafiche(onSuccess: Function) {
			var result = this.deferrer.defer();
			this.wc.get("/api/anagrafica")
				.success((data) => {
				onSuccess(data);
				});
			return result.promise;
		}

		public deleteAnagrafica(IDAna: number, onSuccess: Function) {
			var result = this.deferrer.defer();
			this.wc.delete("/api/anagrafica/" + IDAna)
				.success((data) => {
				onSuccess(data);
			});
			return result.promise;
		}
	}
}