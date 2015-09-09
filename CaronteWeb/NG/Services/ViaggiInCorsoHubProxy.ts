module Caronte {

	export class ViagginCorsoHubProxy {
		public ViaggioInCorsoItem: any = {};
		private connection;
		private proxy;
		public getHub() {
			var connection = this.connection;
			var proxy = connection.createHubProxy("viaggiInCorsoHub");

			connection.start().done(() => { });
			
			return {
				on : (eventName, callback) => {
					proxy.on(eventName, function (result) {
						console.log(result);
						if (callback) {
							callback(result);
						}

					});
				},
				invoke : (methodName, callback) => {
					proxy.invoke(methodName)
						.done(function (result) {
						console.log(result);

						if (callback) {
							callback(result);
						}
						 
					});
				}

			}
		}

		constructor($q: ng.IQService, $rootScope: any) {
            this.connection = (<any>$).hubConnection("/localhost:52274/");
			this.proxy = this.connection.viaggiInCorsoHub;

			this.connection.start().done(() => { }); 

			this.ViaggioInCorsoItem.on = (eventName, callback) => {
				this.proxy.on(eventName, function (result) {
					console.log(result);
					if (callback) {
						callback(result);
					}

				});
			};

			this.ViaggioInCorsoItem.invoke = (methodName, callback) => {
				this.proxy.invoke(methodName)
					.done(function (result) {
					console.log(result);

					if (callback) {
						callback(result);
					}

				});
			};
		}
	}
}