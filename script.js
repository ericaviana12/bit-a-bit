let alvo = 0;
let inicio;
let melhorTempo = localStorage.getItem('melhorTempo') || null;
let melhorJogador = localStorage.getItem('melhorJogador') || null;
const bitsEl = document.getElementById('bits-container');

function criarBits() {
  bitsEl.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const bit = document.createElement('div');
    bit.classList.add('bit');
    bit.textContent = "0";
    bit.onclick = () => {
      bit.textContent = bit.textContent === "0" ? "1" : "0";
      bit.classList.toggle("on");
      atualizarNumero();
    };
    bitsEl.appendChild(bit);
  }
}

function binarioParaDecimal(bin) {
  return parseInt(bin, 2);
}

function atualizarNumero() {
  const bin = Array.from(document.querySelectorAll('.bit')).map(b => b.textContent).join('');
  const num = binarioParaDecimal(bin);
  document.getElementById('numero').textContent = "Seu número: " + num;

  if (num === alvo) {
    const tempo = ((Date.now() - inicio) / 1000).toFixed(2);
    if (!melhorTempo || tempo < melhorTempo) {
      const nome = prompt("Parabéns! Novo recorde! Digite seu nome:");
      if (nome) {
        melhorTempo = tempo;
        melhorJogador = nome;
        localStorage.setItem('melhorTempo', tempo);
        localStorage.setItem('melhorJogador', nome);
      }
    }
    mostrarRecorde();
  }
}

function mostrarRecorde() {
  const r = document.getElementById('recorde-info');
  if (melhorTempo && melhorJogador) {
    r.innerHTML = `Recorde: ${melhorTempo}s por ${melhorJogador}`;
  } else {
    r.textContent = "";
  }
}

function novoAlvo() {
  alvo = Math.floor(Math.random() * 256);
  document.getElementById('alvo').textContent = "Alvo: " + alvo;
  resetarBits();
  inicio = Date.now();
}

function resetarBits() {
  const bits = document.querySelectorAll('.bit');
  bits.forEach(bit => {
    bit.textContent = "0";
    bit.classList.remove("on");
  });
  atualizarNumero();
}

criarBits();
novoAlvo();
mostrarRecorde();
