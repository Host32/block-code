/*jslint white:true*/
(function () {
    'use strict';

    angular.module('block-code').controller('ProgramaController', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.selected = null;

        $scope.tabuleiro = {
            jogadas3Estrela: 20,
            jogadas2Estrela: 21,
            tamanho: {
                x: 10,
                y: 10
            },
            posicaoInicial: {
                x: 0,
                y: 0
            },
            direcaoInicial: 'baixo'
        };

        $scope.quadrosBanco = [
            {
                pontoChegada: true,
                inacessivel: false,
                posicao: {
                    x: 9,
                    y: 9
                }
            }, {
                pontoChegada: false,
                inacessivel: true,
                posicao: {
                    x: 8,
                    y: 9
                }
            }, {
                pontoChegada: false,
                inacessivel: true,
                posicao: {
                    x: 7,
                    y: 9
                }
            }, {
                pontoChegada: false,
                inacessivel: true,
                posicao: {
                    x: 6,
                    y: 9
                }
            }, {
                pontoChegada: false,
                inacessivel: true,
                posicao: {
                    x: 0,
                    y: 1
                }
            }
        ];

        $scope.personagem = {
            direcao: $scope.tabuleiro.direcaoInicial,
            posicao: {
                x: $scope.tabuleiro.posicaoInicial.x,
                y: $scope.tabuleiro.posicaoInicial.y
            }
        };

        $scope.personagemNoQuadro = function (quadro) {
            return ($scope.personagem.posicao.x === quadro.x && $scope.personagem.posicao.y === quadro.y);
        };

        $scope.direcaoToIcon = function direcaoToIcon() {
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

        function buscaQuadro(x, y) {
            return _.find($scope.quadrosBanco, function (quadro) {
                return quadro.posicao.x === x && quadro.posicao.y === y;
            });
        }

        var x, y, quadro;
        for (y = 0; y < $scope.tabuleiro.tamanho.y; y += 1) {
            $scope.quadros.push([]);
            for (x = 0; x < $scope.tabuleiro.tamanho.x; x += 1) {
                quadro = buscaQuadro(x, y);

                $scope.quadros[y].push({
                    x: x,
                    y: y,
                    cssClass: '',
                    chegada: quadro && quadro.pontoChegada,
                    inacessivel: quadro && quadro.inacessivel
                });
            }
        }

        $scope.pecas = [
            {
                label: 'Andar',
                icon: 'fa fa-male',
                background: '#0792A9',
                badgeBackground: '#138D74',
                comando: 'andar'
            },
            {
                label: 'Virar para direita',
                icon: 'fa fa-arrow-right',
                background: '#D73858',
                badgeBackground: '#7C2C2F',
                comando: 'girarDireita'
            },
            {
                label: 'Virar para esquerda',
                icon: 'fa fa-arrow-left',
                background: '#FBD8A0',
                badgeBackground: '#D4892E',
                comando: 'girarEsquerda'
            },
            {
                label: 'Virar para cima',
                icon: 'fa fa-arrow-up',
                background: '#b238d7',
                badgeBackground: '#452c7c',
                comando: 'girarCima'
            },
            {
                label: 'Virar para baixo',
                icon: 'fa fa-arrow-down',
                background: '#a7fba0',
                badgeBackground: '#2ed441',
                comando: 'girarBaixo'
            }
        ];

        $scope.discarte = [];

        $scope.resetDiscarte = function () {
            $scope.discarte = [];
        };


        $scope.programa = [];

        $scope.reiniciar = function () {
            $scope.programa = [];
            $scope.personagem.posicao.x = $scope.tabuleiro.posicaoInicial.x;
            $scope.personagem.posicao.y = $scope.tabuleiro.posicaoInicial.y;
            $scope.personagem.direcao = $scope.tabuleiro.direcaoInicial;

            var x, y;

            for (x = 0; x < $scope.tabuleiro.tamanho.x; x += 1) {
                for (y = 0; y < $scope.tabuleiro.tamanho.y; y += 1) {
                    $scope.quadros[y][x].cssClass = '';
                }
            }
        };

        function ganhou() {
            $('#modal-venceu').modal();
        }

        function perdeu() {
            $('#modal-perdeu').modal();
        }

        function verificaSeGanhou() {
            var quadro = buscaQuadro($scope.personagem.posicao.x, $scope.personagem.posicao.y);

            return (quadro && quadro.pontoChegada);
        }

        function calculaEstrelas() {
            if ($scope.programa.length <= $scope.tabuleiro.jogadas3Estrela) {
                return 3;
            } else if ($scope.programa.length <= $scope.tabuleiro.jogadas2Estrela) {
                return 2;
            } else {
                return 1;
            }
        }

        /**
         * Verifica se a posição passada nos parâmetros é valida.
         * @posicaoX : Posição x do tabuleiro.
         * @posicaoY : Posição y do tabuleiro.
         */
        function validaPosicao(posicaoX, posicaoY) {

            var quadro = buscaQuadro(posicaoX, posicaoY),
                posicaoOk = true;

            if (quadro && quadro.inacessivel) {
                posicaoOk = false;
                $scope.quadros[posicaoY][posicaoX].cssClass = 'animated tada';
            } else {
                posicaoOk = (posicaoX < $scope.tabuleiro.tamanho.x && posicaoX >= 0 && posicaoY < $scope.tabuleiro.tamanho.y && posicaoY >= 0);
            }

            if (!posicaoOk) {
                $scope.programa.splice(1, $scope.programa.length);
            }

            return posicaoOk;
        }


        /**
         * Move o personagem um quadro para frente na direção do personagem.
         */
        function andar() {

            switch ($scope.personagem.direcao) {
                case 'cima':
                    if (validaPosicao($scope.personagem.posicao.x, $scope.personagem.posicao.y - 1)) {
                        $scope.personagem.posicao.y -= 1;
                    }
                    break;

                case 'baixo':
                    if (validaPosicao($scope.personagem.posicao.x, $scope.personagem.posicao.y + 1)) {
                        $scope.personagem.posicao.y += 1;
                    }
                    break;

                case 'direita':
                    if (validaPosicao($scope.personagem.posicao.x + 1, $scope.personagem.posicao.y)) {
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

        function processar(bloco) {
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
        }

        function reduzPrograma() {
            $scope.programa.shift();
        }

        function hideFirstPrograma() {
            $('#execution-list .peca').first().addClass('animated rotateOutUpRight');

            if ($scope.programa.length) {
                processar($scope.programa[0]);

                $timeout(reduzPrograma, 1000);
                $timeout(hideFirstPrograma, 1200);
            } else {
                $scope.processando = false;

                if (verificaSeGanhou()) {
                    ganhou();
                } else {
                    perdeu();
                }
            }
        }

        $scope.processando = false;
        $scope.estrelasAGanhar = 0;
        $scope.executar = function () {
            $scope.processando = true;

            $scope.estrelasAGanhar = calculaEstrelas();

            hideFirstPrograma();
        };

        $scope.panzoomConfig = {};
        $scope.panzoomModel = {};
    }]);
}());
