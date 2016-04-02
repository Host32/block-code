(function () {
    'use strict';
    angular.module('block-code').controller('PersonagemController', function ($scope) {

        $scope.personagem = {
            posicao: {
                x: 0,
                y: 0
            },
            direcao: ''
        };

        /**
         * Move o personagem um quadro para frente na direção do personagem.
         */
        function andar() {

            switch ($scope.personagem.direcao) {
            case 'frente':
                $scope.personagem.posicao.y += 1;
                break;

            case 'atras':
                $scope.personagem.posicao.y -= 1;
                break;

            case 'direita':
                $scope.personagem.posicao.X += 1;
                break;

            case 'esquerda':
                $scope.personagem.posicao.x -= 1;
                break;
            }
        }

        /**
         * Seta a posoção do personagem para a recebina por parâmetro.
         * @direcao : esquerda ou direita
         */
        function girar(direcao) {
            $scope.personagem.direcao = direcao;
        }


        function processar(blocos) {

            _.each(blocos, function (bloco) {
                switch (bloco.comando) {
                case 'andar':
                    andar();
                    break;

                case 'girarFrente':
                    girar('frente');
                    break;

                case 'girarAtras':
                    girar('atras');
                    break;

                case 'girarDireita':
                    girar('direita');
                    break;

                case 'girarEsquerda':
                    girar('esquerda');
                    break;
                }
            });
        }
    });
}());
