var Caronte;
(function (Caronte) {
    var ViagginCorsoHubProxy = (function () {
        function ViagginCorsoHubProxy($q) {
            this.ViaggioInCorsoItem = {};
            var connection = $.hubConnection("/");
            var proxy = connection.createHubProxy("ViaggioInCorsoHub");
            connection.start().done(function () {
            });
            this.ViaggioInCorsoItem.on = function (eventName, callback) {
                proxy.on(eventName, function (result) {
                    console.log(result);
                    $q.apply(function () {
                        if (callback) {
                            callback(result);
                        }
                    });
                });
            };
            this.ViaggioInCorsoItem.invoke = function (methodName, callback) {
                proxy.invoke(methodName).done(function (result) {
                    console.log(result);
                    $q.apply(function () {
                        if (callback) {
                            callback(result);
                        }
                    });
                });
            };
        }
        return ViagginCorsoHubProxy;
    })();
    Caronte.ViagginCorsoHubProxy = ViagginCorsoHubProxy;
})(Caronte || (Caronte = {}));
//# sourceMappingURL=ViagginCorsoHubProxy.js.map