var Caronte;
(function (Caronte) {
    var loginService = (function () {
        function loginService($http, $q) {
            this.wc = null;
            this.wc = $http;
            this.deferrer = $q;
        }
        loginService.prototype.executeLogin = function (username, password) {
            return true;
        };
        return loginService;
    })();
    Caronte.loginService = loginService;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=loginService.js.map