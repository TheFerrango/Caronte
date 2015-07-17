module Caronte {

	export class minosseService {

		

		authServiceFactory: any = {};

		constructor($http: ng.IHttpService, $q: ng.IQService, localStorageService: any) {

			var serviceBase = '/';
			var authentication = {
				isAuth: false,
				userName: ""
			};

			var logOut = () => {
				localStorageService.remove('authorizationData');

			};

			this.authServiceFactory.login = (loginData) => {

				var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
				var deferred = $q.defer();

				$http.post(serviceBase + 'token', data, {
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function (response: any) {
					localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });					
					deferred.resolve(response);
				}).error(function (err, status) {
					logOut();
					deferred.reject(err);
				});

				return deferred.promise;

			};

			this.authServiceFactory.logOut = logOut;

			this.authServiceFactory.fillAuthData = () => {

				var authData = localStorageService.get('authorizationData');
				
			};

			this.authServiceFactory.authentication = () => {

				var authData = localStorageService.get('authorizationData');
				return authData;

			};

			return this.authServiceFactory;
		}
	}
} 