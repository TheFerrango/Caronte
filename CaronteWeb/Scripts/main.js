require.config({
    baseUrl: "Scripts",
    paths: {
        'angular': 'angular.min',
        'angular-route': 'angular-route.min',
        'angularAMD': 'angularAMD.min'
    },
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'angular': {
            exports: 'angular'
        }
    },
    deps: ['Caronte']
});
//# sourceMappingURL=main.js.map