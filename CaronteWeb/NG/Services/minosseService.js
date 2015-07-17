var Caronte;
(function (Caronte) {
    var minosseService = (function () {
        function minosseService($http, $q, localStorageService) {
            var _this = this;
            this.authServiceFactory = {};
            var serviceBase = '/';
            var authentication = {
                isAuth: false,
                userName: ""
            };
            var logOut = function () {
                localStorageService.remove('authorizationData');
                _this.authServiceFactory.authentication.isAuth = false;
                _this.authServiceFactory.authentication.userName = "";
            };
            this.authServiceFactory.login = function (loginData) {
                var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
                var deferred = $q.defer();
                $http.post(serviceBase + 'token', data, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function (response) {
                    localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });
                    authentication.isAuth = true;
                    authentication.userName = loginData.userName;
                    deferred.resolve(response);
                }).error(function (err, status) {
                    logOut();
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            this.authServiceFactory.logOut = logOut;
            this.authServiceFactory.fillAuthData = function () {
                var authData = localStorageService.get('authorizationData');
                if (authData) {
                    authentication.isAuth = true;
                    authentication.userName = authData.userName;
                }
            };
            this.authServiceFactory.authentication = authentication;
            return this.authServiceFactory;
        }
        return minosseService;
    })();
    Caronte.minosseService = minosseService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=minosseService.js.map