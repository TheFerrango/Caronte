module Caronte {

    export class viaggioService {
		private wc: ng.IHttpService = null;
		private deferrer: ng.IQService;
		constructor($http: ng.IHttpService, $q: ng.IQService) {
			this.wc = $http;
			this.deferrer = $q;

		}

		public getViaggi(onSuccess: Function) {
			var result = this.deferrer.defer();
			this.wc.get("/api/viaggio")
				.success((data) => {
				onSuccess(data);
			});

			console.log(result.promise);
			return result.promise;

		}
    }
}