var Caronte;
(function (Caronte) {
    var ViagginCorsoHubProxy = (function () {
        function ViagginCorsoHubProxy($q, $rootScope) {
            var _this = this;
            this.ViaggioInCorsoItem = {};
            this.connection = $.hubConnection("/localhost:52274/");
            this.proxy = this.connection.viaggiInCorsoHub;
            this.connection.start().done(function () {
            });
            this.ViaggioInCorsoItem.on = function (eventName, callback) {
                _this.proxy.on(eventName, function (result) {
                    console.log(result);
                    if (callback) {
                        callback(result);
                    }
                });
            };
            this.ViaggioInCorsoItem.invoke = function (methodName, callback) {
                _this.proxy.invoke(methodName).done(function (result) {
                    console.log(result);
                    if (callback) {
                        callback(result);
                    }
                });
            };
        }
        ViagginCorsoHubProxy.prototype.getHub = function () {
            var connection = this.connection;
            var proxy = connection.createHubProxy("viaggiInCorsoHub");
            connection.start().done(function () {
            });
            return {
                on: function (eventName, callback) {
                    proxy.on(eventName, function (result) {
                        console.log(result);
                        if (callback) {
                            callback(result);
                        }
                    });
                },
                invoke: function (methodName, callback) {
                    proxy.invoke(methodName).done(function (result) {
                        console.log(result);
                        if (callback) {
                            callback(result);
                        }
                    });
                }
            };
        };
        return ViagginCorsoHubProxy;
    })();
    Caronte.ViagginCorsoHubProxy = ViagginCorsoHubProxy;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=ViaggiInCorsoHubProxy.js.map