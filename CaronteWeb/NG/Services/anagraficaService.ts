module Caronte {

	export class anagraficaService {
		private wc: ng.IHttpService = null;
		private deferrer: ng.IQService;
		constructor($http: ng.IHttpService, $q: ng.IQService) {
			this.wc = $http;
			this.deferrer = $q;

		}

		public getAnagrafiche(page: number, howMany: number, onSuccess: Function) {
			var result = this.deferrer.defer();
			this.wc.get("/api/anagrafica?page=" + page + "&howMany=" + howMany)
				.success((data) => {
				onSuccess(data);
			});
			return result.promise;
		}

		public editAnagrafica(anaObj: any, onSuccess: Function, onError: Function) {
			var result = this.deferrer.defer();
			this.wc.put("/api/anagrafica/", anaObj)
				.success((data) => {
				onSuccess(data);
			}).error((data) => {
				onError(data);
			});
			return result.promise;
		}

		public deleteAnagrafica(IDAna: number, onSuccess: Function, onError: Function) {
			var result = this.deferrer.defer();
			this.wc.delete("/api/anagrafica/" + IDAna)
				.success((data) => {
				onSuccess(data);
				}).error((data) => {
				onError(data);
			});
			return result.promise;
		}


	}
}