let listaDeNumerosSorteados = [];
let numeroLimite = 2000;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if('speechSynthesis' in window){
        let utterance = new SpeechSynthesisUtterance (texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } 
    else{
        console.log('Web Speech API não suportada neste navegador.');
    }
    
    /*este trecho aqui, é para nosso jogo ser narrado, então escolhi o idioma português Brasil, e a parte do rate é a velocidade com que a voz irá narrar*/
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
exibirMensagemInicial();


//função sem retorno e sem parametro
function verificarChute() {
    let chute = document.querySelector ('input').value;

    if(chute == numeroSecreto){
        exibirTextoNaTela ('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela ('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');//habilitando o botão 'novo jogo'
    }
    else{
        if(chute > numeroSecreto){
            exibirTextoNaTela ('p','O número secreto é menor');
        }
        else{
            exibirTextoNaTela ('p','O número secreto é maior');
        }
        tentativas++;
        limparCampo();

    
    }
}
len
//função com retorno e sem parametro
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite ){
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio(); //pedindo que um novo numero seja gerado caso já possua algum numero na lista, para evitar repetição
    }
    else{
        listaDeNumerosSorteados.push(numeroEscolhido);//colocando o numero randomico dentro da lista "listaDeNumerosSorteados", o push adiciona
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo (){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
    /*aqui estou desabilitando o botão de novo jovo, para que só seja clicável quando for acertado o número secreto, assim da para gerar um novo jovo. Mas enquanto não for acertado o número, o botão fica desabilitado para criar um novo jovo*/
}

