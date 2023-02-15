const telaPrincipal = document.querySelector('.d-1');
const telaInferior = document.querySelector('.d-2');
const seuVotoPara = document.querySelector('.d-1-1 span');
const telaTitulo = document.querySelector('.d-1-2 span');
const telaNumeros = document.querySelector('.d-1-3');
const telaDescricao = document.querySelector('.d-1-4');
const telaFotos = document.querySelector('.d-1-right');

let etapaAtual = 0;
let numero = '';

function carregarEtapa() {
    let etapa = etapas[etapaAtual];

    seuVotoPara.innerHTML = '';
    telaTitulo.innerHTML = etapa.titulo;
    telaDescricao.innerHTML = '';
    telaFotos.style.display = 'none';
    telaInferior.style.display = 'none';

    for(let i = 0; i < etapa.numeros; i++) {
        if (i == 0) {
            telaNumeros.innerHTML = '<div class="numero pisca"></div>';
        } else {
            telaNumeros.innerHTML += '<div class="numero"></div>';
        };
    };
};

function atualizaInterface() {
    alert('votou');
}

function clicou(n) {
    let telaNumero = document.querySelector('.d-1-3 .numero.pisca');
    if (telaNumero !== null) {
        telaNumero.innerHTML = n;
        numero = `${numero}${n}`;

        telaNumero.classList.remove('pisca');
        if (telaNumero.nextElementSibling !== null) {
            telaNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        };
    };
};
function branco() {
    alert('branco');
};
function corrige() {
    alert('corrige');
};
function confirma() {
    alert('confirma');
};

carregarEtapa();