﻿module Caronte {

    export class personaleService {
		private wc: ng.IHttpService = null;
		private deferrer: ng.IQService;
		constructor($http: ng.IHttpService, $q: ng.IQService) {
			this.wc = $http;
			this.deferrer = $q;

		}

		public getPersonale(onSuccess: Function) {
			var result = this.deferrer.defer();
			this.wc.get("/api/dipendente")
				.success((data) => {
				onSuccess(data);
			});

			console.log(result.promise);
			return result.promise;

		}
    }
}