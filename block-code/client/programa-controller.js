(function () {
    'use strict';

    angular.module('block-code').controller('ProgramaController', ['$scope', function ($scope) {
        $scope.selected = null;

        $scope.pecas = [
            {
                label: 'Andar',
                comando: 'andar'
            },
            {
                label: 'Girar para direita',
                comando: 'girarDireita'
            },
            {
                label: 'Girar para esquerda',
                comando: 'girarEsquerda'
            }
        ];

        $scope.programa = [];
    }]);
}());
