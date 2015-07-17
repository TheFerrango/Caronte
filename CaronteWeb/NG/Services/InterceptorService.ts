﻿module Caronte {

	export class interceptorService {
		private authInterceptorServiceFactory: any = {};

		constructor($q: ng.IQService, $location: ng.ILocationService, localStorageService: any) {

			this.authInterceptorServiceFactory.request = (config) => {
				console.log("tama")
				config.headers = config.headers || {};

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