module Caronte {

	export class personaleService {
		private wc: ng.IHttpService = null;
		private deferrer: ng.IQService;
		constructor($http: ng.IHttpService, $q: ng.IQService) {
			this.wc = $http;
			this.deferrer = $q;

		}

		public getAnagraficheFilter(filter: string, onSuccess: Function) {
			if (!filter)
				filter = "";
			var result = this.deferrer.defer();
			this.wc.get("/api/anagrafica?filter=" + filter)
				.success((data) => {
				onSuccess(data);
			});
			return result.promise;
		}

		public getRuolo( onSuccess: Function) {
			var result = this.deferrer.defer();
			this.wc.get("/api/ruolo")
				.success((data) => {
				onSuccess(data);
			});
			return result.promise;
		}

		public getPersonale(page: number, howMany: number, onSuccess: Function) {
			var result = this.deferrer.defer();
			this.wc.get("/api/dipendente?page=" + page + "&howMany=" + howMany)
				.success((data) => {
				onSuccess(data);
			});
			return result.promise;
		}

		public createPersonale(perObj: any, onSuccess: Function, onError: Function) {
			var result = this.deferrer.defer();
			this.wc.post("/api/dipendente/", perObj)
				.success((data) => {
				onSuccess(data);
			}).error((data) => {
				onError(data);
			});
			return result.promise;
		}

		public editPersonale(perObj: any, onSuccess: Function, onError: Function) {
			var result = this.deferrer.defer();
			this.wc.put("/api/dipendente/", perObj)
				.success((data) => {
				onSuccess(data);
			}).error((data) => {
				onError(data);
			});
			return result.promise;
		}

		public deletePersonale(IDPer: number, onSuccess: Function, onError: Function) {
			var result = this.deferrer.defer();
			this.wc.delete("/api/dipendente/" + IDPer)
				.success((data) => {
				onSuccess(data);
			}).error((data) => {
				onError(data);
			});
			return result.promise;
		}
	}
}