const bitsTop = document.getElementById("bits-top");
const bitsBottom = document.getElementById("bits-bottom");
const numero = document.getElementById("numero");
const alvo = document.getElementById("alvo");
const mensagem = document.getElementById("mensagem");
const recordeInfo = document.getElementById("recorde-info");

let bits = [];
let numeroAlvo = 0;
let tempoInicial = null;
let historicoRecordes = [];

function criarBits() {
  bitsTop.innerHTML = '';
  bitsBottom.innerHTML = '';
  bits = [];

  for (let i = 7; i >= 0; i--) {
    const bit = document.createElement("div");
    bit.classList.add("bit");
    bit.dataset.valor = 2 ** i;
    bit.textContent = "0";
    bit.onclick = () => alternarBit(i);
    if (i >= 4) {
      bitsTop.appendChild(bit);
    } else {
      bitsBottom.appendChild(bit);
    }
    bits[i] = 0;
  }

  atualizarNumero();
}

function alternarBit(posicao) {
  bits[posicao] = bits[posicao] === 0 ? 1 : 0;
  atualizarNumero();
  verificarAcerto();
}

function atualizarNumero() {
  let total = 0;
  document.querySelectorAll(".bit").forEach((bit, i) => {
    bit.textContent = bits[i];
    if (bits[i] === 1) {
      bit.classList.add("on");
      total += parseInt(bit.dataset.valor);
    } else {
      bit.classList.remove("on");
    }
  });
  numero.textContent = `Seu número: ${total}`;
}

function novoAlvo() {
  numeroAlvo = Math.floor(Math.random() * 256);
  alvo.textContent = `Alvo: ${numeroAlvo}`;
  mensagem.textContent = '';
  tempoInicial = Date.now();
  resetarBits();
}

function resetarBits() {
  bits = Array(8).fill(0);
  document.querySelectorAll(".bit").forEach((bit, i) => {
    bits[i] = 0;
    bit.textContent = "0";
    bit.classList.remove("on");
  });
  atualizarNumero();
}

function verificarAcerto() {
  let valor = bits.reduce((soma, bit, i) => soma + bit * 2 ** i, 0);
  if (valor === numeroAlvo) {
    let tempoFinal = Date.now();
    let duracao = Math.round((tempoFinal - tempoInicial) / 1000);
    mensagem.textContent = `Você acertou em ${duracao}s!`;

    setTimeout(() => {
      const nome = prompt("Novo recorde! Digite seu nome:");
      if (nome) {
        salvarRecorde(nome, duracao);
        atualizarRecordes();
      }
      mensagem.textContent = '';
      novoAlvo();
    }, 1500);
  }
}

function salvarRecorde(nome, tempo) {
  historicoRecordes.push({ nome, tempo });
  historicoRecordes.sort((a, b) => a.tempo - b.tempo);
  historicoRecordes = historicoRecordes.slice(0, 3); // Só mantém os 3 melhores
  localStorage.setItem("bit-a-bit-recordes", JSON.stringify(historicoRecordes));
}

function atualizarRecordes() {
  historicoRecordes = JSON.parse(localStorage.getItem("bit-a-bit-recordes")) || [];
  if (historicoRecordes.length === 0) return;

  recordeInfo.innerHTML = "<strong>Top 3 Recordes:</strong><br/>";
  historicoRecordes.forEach((r, i) => {
    recordeInfo.innerHTML += `${i + 1}. ${r.nome} — ${r.tempo}s<br/>`;
  });
}

window.onload = () => {
  criarBits();
  atualizarRecordes();
  novoAlvo();
};
