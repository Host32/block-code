(function () {
    'use strict';

    angular.module('block-code').controller('ProgramaController', ['$scope', function ($scope) {
        $scope.selected = null;

        $scope.tabuleiro = {
            tamanho: {
                x: 10,
                y: 10
            }
        };

        $scope.personagem = {
            direcao: 'cima',
            posicao: {
                x: 0,
                y: 0
            }
        };

        $scope.direcaoToIcon = function direcaoToIcon() {
            /*jslint white:true*/
            switch ($scope.personagem.direcao) {
                case 'cima':
                    return 'fa fa-arrow-circle-o-up';
                case 'baixo':
                    return 'fa fa-arrow-circle-o-down';
                case 'direita':
                    return 'fa fa-arrow-circle-o-right';
                case 'esquerda':
                    return 'fa fa-arrow-circle-o-left';
            }
        };

        $scope.quadros = [];

        var x, y, quadro;
        for (x = 0; x < $scope.tabuleiro.tamanho.x; x += 1) {
            $scope.quadros.push([]);
            for (y = 0; y < $scope.tabuleiro.tamanho.y; y += 1) {
                quadro = {
                    personagem: false
                };

                if ($scope.personagem.posicao.x === x && $scope.personagem.posicao.y === y) {
                    quadro.personagem = true;
                }

                $scope.quadros[x].push(quadro);
            }
        }

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

        $scope.discarte = [];

        $scope.resetDiscarte = function () {
            $scope.discarte = [];
        };


        $scope.programa = [];


        $scope.reiniciar = function () {
            $scope.programa = [];
        };

        $scope.executar = function () {

        };

        $scope.panzoomConfig = {};
        $scope.panzoomModel = {};
    }]);
}());
