(function () {
    'use strict';

    angular.module('block-code').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enable: true,
            requireBase: false
        });
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'client/views/home.ng.html'
            })
            .state('cadastro', {
                url: '/cadastro',
                templateUrl: 'client/views/cadastrotabuleiro.ng.html'
            });
    }]);
}());