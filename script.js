let alvo = 0;
let inicio;
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

    document.getElementById('numero').textContent = `Acertou! Tempo: ${tempo}s`;
    document.getElementById('alvo').textContent = `Alvo alcançado!`;

    setTimeout(() => {
      salvarRecorde(tempo);
      mostrarRecorde();
      novaRodada();
    }, 1500);
  }
}

function salvarRecorde(tempo) {
  let recordes = JSON.parse(localStorage.getItem('recordes')) || [];
  const nome = prompt("Parabéns! Digite seu nome para registrar o tempo:");
  if (nome) {
    recordes.push({ nome, tempo: parseFloat(tempo) });
    recordes.sort((a, b) => a.tempo - b.tempo);
    recordes = recordes.slice(0, 3);
    localStorage.setItem('recordes', JSON.stringify(recordes));
  }
}

function mostrarRecorde() {
  const r = document.getElementById('recorde-info');
  const recordes = JSON.parse(localStorage.getItem('recordes')) || [];
  if (recordes.length > 0) {
    r.innerHTML = "<strong>Top 3 Recordes:</strong><br>" +
      recordes.map((r, i) => `${i + 1}. ${r.nome} - ${r.tempo}s`).join("<br>");
  } else {
    r.textContent = "Sem recordes ainda.";
  }
}

function novaRodada() {
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

function novoAlvo() {
  novaRodada();
}

criarBits();
novaRodada();
mostrarRecorde();
