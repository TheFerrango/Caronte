module Caronte {

	export class passeggeroService {
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

		public getPasseggeri(page: number, howMany: number, idViaggio: number, onSuccess: Function) {
			var result = this.deferrer.defer();
			this.wc.get("/api/spostamento?page=" + page + "&howMany=" + howMany + "&idViaggio=" + idViaggio)
				.success((data) => {
				onSuccess(data);
			});
			return result.promise;
		}

		public createPasseggero(pasObj: any, onSuccess: Function, onError: Function) {
			var result = this.deferrer.defer();
			this.wc.post("/api/spostamento/", pasObj)
				.success((data) => {
				onSuccess(data);
			}).error((data) => {
				onError(data);
			});
			return result.promise;
		}

		public editPasseggero(pasObj: any, onSuccess: Function, onError: Function) {
			var result = this.deferrer.defer();
			this.wc.put("/api/spostamento/", pasObj)
				.success((data) => {
				onSuccess(data);
			}).error((data) => {
				onError(data);
			});
			return result.promise;
		}

		public deletePasseggero(IDPas: number, onSuccess: Function, onError: Function) {
			var result = this.deferrer.defer();
			this.wc.delete("/api/spostamento/" + IDPas)
				.success((data) => {
				onSuccess(data);
			}).error((data) => {
				onError(data);
			});
			return result.promise;
		}
	}
}