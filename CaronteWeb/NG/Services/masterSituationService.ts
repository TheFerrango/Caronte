module Caronte {
    export class masterSituationService {
		private wc: ng.IHttpService = null;
		private deferrer: ng.IQService;

		constructor($http: ng.IHttpService, $q: ng.IQService) {
			this.wc = $http;
			this.deferrer = $q;

		}

		public getViaggi(soloInCorso: boolean, func: Function) {
			var result = this.deferrer.defer();
			// + soloInCorso ? "?idStato=2" : ""
			this.wc.get("/api/viaggio" + (soloInCorso ? "?idStato=2" : ""))
				.success((data) => {
				func(data);
			});

			console.log(result.promise);
			return result.promise;
		}

		public getPosizioni(IDViaggio: number, func: Function) {
			
			//TODO implementa get dal server
			var res = {};
			func(res, IDViaggio);
			
		}
    }
}