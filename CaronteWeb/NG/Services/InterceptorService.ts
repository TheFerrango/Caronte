module Caronte {

    export class interceptorService {
        private authInterceptorServiceFactory: any = {};

        constructor($q: ng.IQService, $location: ng.ILocationService, localStorageService: any) {

            this.authInterceptorServiceFactory.request = (config) => {
                config.headers = config.headers || {};

                config.url += config.url.indexOf("?") > -1 ? "&" : "?";

                config.url += "noCache=" + new Date().getTime().toString();

                
                var authData = localStorageService.get('authorizationData');
                if (authData) {
                    config.headers.Authorization = 'Bearer ' + authData.token;
                }
                return config;
            };

            this.authInterceptorServiceFactory.responseError = (rejection) => {
                if (rejection.status === 401) {
                    $location.path('/Login');
                }
                return $q.reject(rejection);
            };

            return this.authInterceptorServiceFactory;
        }
    }
} 