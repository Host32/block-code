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
         * Verifica se a posição passada nos parâmetros é valida.
         * @posicaoX : Posição x do tabuleiro.
         * @posicaoY : Posição y do tabuleiro.
         */
        function validaPosicao(posicaoX, posicaoY) {

            var inacessiveis = Quadros.findOne({
                tabuleiroId: 5, // COLOCAR O ID CORRETo, QUE DEVE VIR EXTERNO
                posicao: {
                    x: posicaoX,
                    y: posicaoY
                },
                inacessivels: true
            }).fetch();

            if (inacessiveis) {

                return false;
            } else {

                // COLOCAR O NOME CORRETO DO TABULEIRO
                return (posicaoX <= tabuleiro.tamanho.x && posicaoX >= 0 && tabuleiro.tamanho.Y <= posicaoY && posicaoY >= 0);
            }
        }


        /**
         * Move o personagem um quadro para frente na direção do personagem.
         */
        function andar() {

            switch ($scope.personagem.direcao) {
            case 'cima':
                if (validaPosicao($scope.personagem.posicao.x, $scope.personagem.posicao.y + 1)) {
                    $scope.personagem.posicao.y += 1;
                }
                break;

            case 'baixo':
                if (validaPosicao($scope.personagem.posicao.x, $scope.personagem.posicao.y - 1)) {
                    $scope.personagem.posicao.y -= 1;
                }
                break;

            case 'direita':
                if (validaPosicao($scope.personagem.posicao.x += 1, $scope.personagem.posicao.y)) {
                    $scope.personagem.posicao.x += 1;
                }
                break;

            case 'esquerda':
                if (validaPosicao($scope.personagem.posicao.x - 1, $scope.personagem.posicao.y)) {
                    $scope.personagem.posicao.x -= 1;
                }
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

                case 'girarCima':
                    girar('cima');
                    break;

                case 'girarBaixo':
                    girar('baixo');
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
