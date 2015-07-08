module Caronte {

    export class veicoloService {
		private wc: ng.IHttpService = null;
		private deferrer: ng.IQService;
		constructor($http: ng.IHttpService, $q: ng.IQService) {
			this.wc = $http;
			this.deferrer = $q;

		}

		public getVeicoli(page: number, howMany: number, onSuccess: Function) {
			var result = this.deferrer.defer();
			this.wc.get("/api/veicolo?page=" + page + "&howMany=" + howMany)
				.success((data) => {
				onSuccess(data);
			});
			return result.promise;
		}

		public createVeicolo(veiObj: any, onSuccess: Function, onError: Function) {
			var result = this.deferrer.defer();
			this.wc.post("/api/veicolo/", veiObj)
				.success((data) => {
				onSuccess(data);
			}).error((data) => {
				onError(data);
			});
			return result.promise;
		}

		public editVeicolo(veiObj: any, onSuccess: Function, onError: Function) {
			var result = this.deferrer.defer();
			this.wc.put("/api/veicolo/", veiObj)
				.success((data) => {
				onSuccess(data);
			}).error((data) => {
				onError(data);
			});
			return result.promise;
		}

		public deleteVeicolo(IDVei: number, onSuccess: Function, onError: Function) {
			var result = this.deferrer.defer();
			this.wc.delete("/api/veicolo/" + IDVei)
				.success((data) => {
				onSuccess(data);
			}).error((data) => {
				onError(data);
			});
			return result.promise;
		}
    }
}