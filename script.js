const bitsTop = document.getElementById("bits-top");
const bitsBottom = document.getElementById("bits-bottom");
const numero = document.getElementById("numero");
const alvo = document.getElementById("alvo");
const mensagem = document.getElementById("mensagem");
const recordeInfo = document.getElementById("recorde-info");

let bits = Array(8).fill(0);
let numeroAlvo = 0;
let tempoInicial = null;
let historicoRecordes = [];

function criarBits() {
  bitsTop.innerHTML = '';
  bitsBottom.innerHTML = '';
  bits = Array(8).fill(0);

  for (let i = 7; i >= 0; i--) {
    const bit = document.createElement("div");
    bit.classList.add("bit");
    bit.dataset.index = i;
    bit.dataset.valor = 2 ** i;
    bit.textContent = "0";
    bit.onclick = () => alternarBit(i);
    if (i >= 4) {
      bitsTop.appendChild(bit);
    } else {
      bitsBottom.appendChild(bit);
    }
  }

  atualizarNumero();
}

function alternarBit(index) {
  bits[index] = bits[index] === 0 ? 1 : 0;
  atualizarNumero();
  verificarAcerto();
}

function atualizarNumero() {
  let total = 0;
  document.querySelectorAll(".bit").forEach((bit) => {
    const index = parseInt(bit.dataset.index);
    const valor = parseInt(bit.dataset.valor);
    bit.textContent = bits[index];
    if (bits[index] === 1) {
      total += valor;
      bit.classList.add("on");
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
  document.querySelectorAll(".bit").forEach((bit) => {
    const index = parseInt(bit.dataset.index);
    bits[index] = 0;
    bit.textContent = "0";
    bit.classList.remove("on");
  });
  atualizarNumero();
}

function verificarAcerto() {
  const total = bits.reduce((soma, bit, i) => soma + bit * 2 ** i, 0);
  if (total === numeroAlvo) {
    const tempoFinal = Date.now();
    const duracao = Math.round((tempoFinal - tempoInicial) / 1000);
    mensagem.textContent = `Você acertou em ${duracao}s!`;

    setTimeout(() => {
      const nome = prompt("Digite seu nome:");
      if (nome) {
        salvarRecorde(nome, duracao);
        atualizarRecordes();
      }
      mensagem.textContent = '';
      novoAlvo();
    }, 2000);
  }
}

function salvarRecorde(nome, tempo) {
  historicoRecordes.push({ nome, tempo });
  historicoRecordes.sort((a, b) => a.tempo - b.tempo);
  historicoRecordes = historicoRecordes.slice(0, 3);
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
