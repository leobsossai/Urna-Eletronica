// declaração de variávies de controle de interface
const telaPrincipal = document.querySelector('.d-1');
const telaInferior = document.querySelector('.d-2');
const seuVotoPara = document.querySelector('.d-1-1 span');
const telaTitulo = document.querySelector('.d-1-2 span');
const telaNumeros = document.querySelector('.d-1-3');
const telaDescricao = document.querySelector('.d-1-4');
const telaFotos = document.querySelector('.d-1-right');

//Varáveis de controle de ambiente:
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votoNulo = false;
let votosConfirmados = [];
let etapa = etapas[etapaAtual];
let finalizado = false;
let nomeCandidato = '';

// carrega a etapa da votação se baseando na etapa atual
function carregarEtapa() {
    seuVotoPara.style.display = 'none';
    telaNumeros.style.display = 'flex';
    telaTitulo.innerHTML = etapa.titulo;
    telaDescricao.innerHTML = '';
    telaFotos.innerHTML = '';
    telaInferior.style.display = 'none';

    for(let i = 0; i < etapa.numeros; i++) {
        if (i == 0) {
            telaNumeros.innerHTML = '<div class="numero pisca"></div>';
        } else {
            telaNumeros.innerHTML += '<div class="numero"></div>';
        };
    };
};
// mostra na tela as informações referentes ao numero digitado
function atualizaInterface() {
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        telaInferior.style.display = 'block';
        telaDescricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>`;
        nomeCandidato = candidato.nome;
        fotosHTML = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHTML += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`
            } else {
                fotosHTML += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`
            };
        };
        telaFotos.innerHTML = fotosHTML;
    } else { //voto nulo se os numeros digitados não corresponderem a nenhum candidato ou nenhum numero seja digitado
        seuVotoPara.style.display = 'block';
        telaInferior.style.display = 'block';
        telaDescricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
        votoNulo = true;
    };
};
// adiciona os numeros a tela
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
// define voto em branco ao clicar no botao
function branco() {
    votoBranco = true;
    numero = '';
    telaNumeros.innerHTML = '';
    seuVotoPara.style.display = 'block';
    telaInferior.style.display = 'block';
    telaDescricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
};
// reseta a tela e a votação da etapa atual
function corrige() {
    if (finalizado == false) {
        carregarEtapa();
        numero = '';
    };
};
// confirma o voto, seja ele em branco, nulo ou para um dos candidatos
function confirma() {
    if (etapas[etapaAtual + 1] !== undefined) {
        if (votoBranco && votosConfirmados.length < etapas.length) {
            votosConfirmados.push(`${etapa.titulo}: voto em branco`);
        } else if (votoNulo && votosConfirmados.length < etapas.length) {
            votosConfirmados.push(`${etapa.titulo}: voto nulo`);
        } else if (votosConfirmados.length < etapas.length) {
            votosConfirmados.push(`${etapa.titulo}: ${nomeCandidato}`);
        };
        numero = '';
        etapaAtual++;
        etapa = etapas[etapaAtual];
        carregarEtapa();
    } else {
        numero = '';
        seuVotoPara.style.display = 'none';
        telaNumeros.innerHTML = '';
        telaTitulo.innerHTML = '';
        telaDescricao.innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
        telaFotos.style.display = 'none';
        telaInferior.style.display = 'none';
        if (votoBranco && votosConfirmados.length < etapas.length) {
            votosConfirmados.push(`${etapa.titulo}: voto em branco`);
        } else if (votoNulo && votosConfirmados.length < etapas.length) {
            votosConfirmados.push(`${etapa.titulo}: voto nulo`);
        } else if (votosConfirmados.length < etapas.length) {
            votosConfirmados.push(`${etapa.titulo}: ${nomeCandidato}`);
        };
        finalizado = true;
    };
};
// inicializa a urna!
carregarEtapa();