(function () {
    'use strict';

    angular.module('block-code').controller('CadastroTabuleiroController', ['$scope', '$log', function ($scope, $log) {

        $scope.tabuleiro = {
            name: '',
            descricao: '',
            quadros: [{
                x: 0,
                y: 0,
                inacessivel: false,
                pontodechegada: false
            }]
        };

        $scope.addQuadro = function () {
            $scope.tabuleiro.quadros.push({});
        };

        $scope.removeQuadro = function ($index) {
            $scope.tabuleiro.quadros.splice($index, 1);
        };

        $scope.insereNovoQuadro = function () {

            Tabuleiros.insert({
                name: $scope.tabuleiro.name,
                descricao: $scope.tabuleiro.descricao
            }, function (err, tabuleiroInserido) {
                Quadros.insert($scope.tabuleiro.quadros.map(function (quadro) {
                    return {
                        tabuleiroId: tabuleiroInserido,
                        x: quadro.x,
                        y: quadro.y,
                        inacessivel: quadro.inacessivel,
                        pontodechegada: quadro.pontodechegada
                    };
                }));

            });
        };

    }]);
}());