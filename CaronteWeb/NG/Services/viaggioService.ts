module Caronte {

    export class viaggioService {
		private wc: ng.IHttpService = null;
		private deferrer: ng.IQService;
		constructor($http: ng.IHttpService, $q: ng.IQService) {
			this.wc = $http;
			this.deferrer = $q;

		}

		public getStato(onSuccess: Function) {
			var result = this.deferrer.defer();
			this.wc.get("/api/stato")
				.success((data) => {
				onSuccess(data);
			});
			return result.promise;
		}

		public getDipendentiFilter(idRuolo: number, onSuccess: Function) {
			var result = this.deferrer.defer();
			this.wc.get("/api/dipendente?ruolo=" + idRuolo)
				.success((data) => {
				onSuccess(data);
			});
			return result.promise;
		}

		public getViaggi(page: number, howMany: number, onSuccess: Function) {
			var result = this.deferrer.defer();
			this.wc.get("/api/viaggio?page=" + page + "&howMany=" + howMany)
				.success((data) => {
				onSuccess(data);
			});
			return result.promise;
		}

		public createViaggio(viaObj: any, onSuccess: Function, onError: Function) {
			var result = this.deferrer.defer();
			this.wc.post("/api/viaggio/", viaObj)
				.success((data) => {
				onSuccess(data);
			}).error((data) => {
				onError(data);
			});
			return result.promise;
		}

		public editViaggio(viaObj: any, onSuccess: Function, onError: Function) {
			var result = this.deferrer.defer();
			this.wc.put("/api/viaggio/", viaObj)
				.success((data) => {
				onSuccess(data);
			}).error((data) => {
				onError(data);
			});
			return result.promise;
		}

		public deleteViaggio(IDVei: number, onSuccess: Function, onError: Function) {
			var result = this.deferrer.defer();
			this.wc.delete("/api/viaggio/" + IDVei)
				.success((data) => {
				onSuccess(data);
			}).error((data) => {
				onError(data);
			});
			return result.promise;
		}
    }
}