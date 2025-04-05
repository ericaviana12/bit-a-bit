const bitsContainer = document.getElementById("bits");
const alvoEl = document.getElementById("alvo");
const numeroEl = document.getElementById("numero");
const recordeBox = document.getElementById("recordeBox");

let alvo = 0;
let bits = [];
let tempoInicial = 0;
let tempoFinal = 0;

function criarBits() {
  bitsContainer.innerHTML = "";
  bits = [];
  for (let i = 7; i >= 0; i--) {
    const bit = document.createElement("div");
    bit.classList.add("bit");
    bit.textContent = "0";
    bit.dataset.valor = i;
    bit.onclick = () => {
      bit.textContent = bit.textContent === "0" ? "1" : "0";
      bit.classList.toggle("on");
      atualizarNumero();
    };
    bits.push(bit);
    bitsContainer.appendChild(bit);
  }
}

function atualizarNumero() {
  const binario = bits.map(b => b.textContent).join("");
  const decimal = parseInt(binario, 2);
  numeroEl.textContent = "Seu número: " + decimal;
  if (decimal === alvo) {
    tempoFinal = performance.now();
    const tempo = ((tempoFinal - tempoInicial) / 1000).toFixed(2);
    const recorde = JSON.parse(localStorage.getItem("recordeTempo")) || { tempo: Infinity, nome: "" };
    if (tempo < recorde.tempo) {
      const nome = prompt("Parabéns! Novo recorde! Digite seu nome:");
      localStorage.setItem("recordeTempo", JSON.stringify({ tempo, nome }));
    }
    mostrarRecorde();
  }
}

function novoAlvo() {
  alvo = Math.floor(Math.random() * 256);
  alvoEl.textContent = "Alvo: " + alvo;
  resetarBits();
  tempoInicial = performance.now();
}

function resetarBits() {
  bits.forEach(b => {
    b.textContent = "0";
    b.classList.remove("on");
  });
  atualizarNumero();
}

function mostrarRecorde() {
  const recorde = JSON.parse(localStorage.getItem("recordeTempo"));
  if (recorde && recorde.tempo !== Infinity) {
    recordeBox.textContent = `Recorde: ${recorde.nome} - ${recorde.tempo}s`;
  }
}

criarBits();
novoAlvo();
mostrarRecorde();
