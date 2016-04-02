(function () {
    'use strict';

    angular.module('block-code').controller('ProgramaController', ['$scope', function ($scope) {
        $scope.selected = null;

        $scope.pecas = [
            {
                label: 'Andar',
                icon: 'fa fa-arrow-up',
                background: '#0792A9',
                badgeBackground: '#138D74',
                comando: 'andar'
            },
            {
                label: 'Girar para direita',
                icon: 'fa fa-rotate-right',
                background: '#D73858',
                badgeBackground: '#7C2C2F',
                comando: 'girarDireita'
            },
            {
                label: 'Girar para esquerda',
                icon: 'fa fa-rotate-left',
                background: '#FBD8A0',
                badgeBackground: '#D4892E',
                comando: 'girarEsquerda'
            }
        ];

        $scope.programa = [];

        $scope.reiniciar = function () {
            $scope.programa = [];
        };

        $scope.executar = function () {

        };
    }]);
}());
