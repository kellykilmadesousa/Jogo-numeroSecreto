let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAlearotiro(); 
let tentativas = 1;


function exibirTextoTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
  exibirTextoTela("h1", "Jogo do número secreto");
  exibirTextoTela("p", "Escolha um número entre 1 e 10");
}

exibirMensagemInicial();

function verificarChute() {
  let chute = document.querySelector("input").value;
  if (chute == numeroSecreto) {
    exibirTextoTela("h1", "Acertou!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoTela("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoTela("p", "O número secreto é menor!");
    } else {
      exibirTextoTela("p", "O número secreto é maior!");
    }
    // tentativas = tentativas + 1;
    tentativas++;
    limparCampo(); /*O limparCampo está dentro do else porque queremos que o campo de texto seja limpo apenas quando o chute estiver errado. */
  }
}

function gerarNumeroAlearotiro() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeElementosLista = listaNumerosSorteados.length;

  if (quantidadeElementosLista == numeroLimite) {
    listaNumerosSorteados = [];
  }

  if (listaNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAlearotiro();
  } else {
    listaNumerosSorteados.push(numeroEscolhido);
    console.log(listaNumerosSorteados);
    return numeroEscolhido;
  }
}

function limparCampo() {
  let chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAlearotiro();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document
    .getElementById("reiniciar")
    .setAttribute(
      "disabled",
      true
    ); /*esse setatribute é para ajustar se queremos que o botão continue ativiado ou não no novo jogo*/
}
