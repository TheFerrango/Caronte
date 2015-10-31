module Caronte {
    export class journeyReviewService {
        private wc: ng.IHttpService = null;
        private deferrer: ng.IQService;

        constructor($http: ng.IHttpService, $q: ng.IQService) {
            this.wc = $http;
            this.deferrer = $q;
        }

        public getViaggio(IDViaggio: number, func: Function) {
            this.wc.get("/api/viaggio/" + IDViaggio)
                .success((data) => {
                func(data);
            });
        }

        public getPosizioni(IDViaggio: number, func: Function) {
            this.wc.get("/api/posizione/getbyviaggio/" + IDViaggio)
                .success((data) => {
                func(data);
            });
        }

        public getPasseggeri(IDViaggio: number, func: Function) {
            this.wc.get("/api/spostamento?idViaggio=" + IDViaggio)
                .success((data) => {
                func(data);
            });

        }
    }
}