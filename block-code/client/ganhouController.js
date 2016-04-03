(function () {
    'use strict';

    angular.module('block-code').controller('GanhouController', ['$scope', function ($scope) {

        $scope.personagem = {
            jogadas: '',
            numeroFase: '',
            posicao: {
                x: '',
                y: ''
            }
        };

        $scope.verificaSeGanhou = function () {
            var quadro = Quadros.findOne({
                posicao: {
                    x: $scope.personagem.posicao.x,
                    y: $scope.personagem.posicao.y
                }
            }).fetch();

            if (quadro && quadro.pontoChegada) {
                return true;
            } else return false;
        };

        $scope.verificaNumeroEstrelas = function () {
            var numEstrelas = Tabuleiros.findOne({
                numeroFase: $scope.personagem.numeroFase
            }).fetch();

            if (personagem.jogadas <= numEstrelas.jogadas3Estrela) {
                return numEstrelas.jogadas3Estrela;
            } else if (personagem.jogadas <= numEstrelas.jogadas2Estrela) {
                return numEstrelas.jogadas2Estrela;
            } else return numEstrelas.jogadas1Estrela;

        }



    }]);
}());
