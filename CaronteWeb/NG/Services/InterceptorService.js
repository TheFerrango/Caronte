var Caronte;
(function (Caronte) {
    var interceptorService = (function () {
        function interceptorService($q, $location, localStorageService) {
            this.authInterceptorServiceFactory = {};
            this.authInterceptorServiceFactory.request = function (config) {
                console.log("tama");
                config.headers = config.headers || {};
                var authData = localStorageService.get('authorizationData');
                if (authData) {
                    config.headers.Authorization = 'Bearer ' + authData.token;
                }
                return config;
            };
            this.authInterceptorServiceFactory.responseError = function (rejection) {
                if (rejection.status === 401) {
                    $location.path('/Login');
                }
                return $q.reject(rejection);
            };
            return this.authInterceptorServiceFactory;
        }
        return interceptorService;
    })();
    Caronte.interceptorService = interceptorService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=InterceptorService.js.map