let bits = [];
let target = 0;

const bitContainer = document.getElementById('bits');
const targetDisplay = document.getElementById('target');
const currentDisplay = document.getElementById('current');
const feedback = document.getElementById('feedback');
const recordForm = document.getElementById('record-form');
const recordsList = document.getElementById('records');

function createBits() {
  bitContainer.innerHTML = '';
  bits = [];

  for (let i = 0; i < 8; i++) {
    const bit = document.createElement('div');
    bit.classList.add('bit');
    bit.textContent = '0';
    bit.onclick = () => toggleBit(i);
    bitContainer.appendChild(bit);
    bits.push(0);
  }

  updateDisplay();
}

function toggleBit(index) {
  bits[index] = bits[index] === 0 ? 1 : 0;
  const bitDiv = bitContainer.children[index];
  bitDiv.textContent = bits[index];
  bitDiv.classList.toggle('active', bits[index] === 1);
  updateDisplay();
}

function getCurrentValue() {
  return bits.reduce((acc, bit, i) => {
    return acc + bit * Math.pow(2, 7 - i);
  }, 0);
}

function updateDisplay() {
  const value = getCurrentValue();
  currentDisplay.textContent = value;

  if (value === target) {
    feedback.textContent = "Você acertou!";
    recordForm.classList.remove('hidden');
  } else {
    feedback.textContent = "";
    recordForm.classList.add('hidden');
  }
}

function generateTarget() {
  target = Math.floor(Math.random() * 256);
  targetDisplay.textContent = target;
  resetBits();
}

function resetBits() {
  bits = bits.map(() => 0);
  for (let i = 0; i < 8; i++) {
    const bitDiv = bitContainer.children[i];
    bitDiv.textContent = '0';
    bitDiv.classList.remove('active');
  }
  updateDisplay();
}

function saveRecord() {
  const name = document.getElementById('player-name').value.trim();
  if (name) {
    const value = getCurrentValue();
    const record = { name, value, target };
    const stored = JSON.parse(localStorage.getItem('bitRecords')) || [];
    stored.unshift(record);
    localStorage.setItem('bitRecords', JSON.stringify(stored));
    displayRecords();
    document.getElementById('player-name').value = '';
    recordForm.classList.add('hidden');
  }
}

function displayRecords() {
  const stored = JSON.parse(localStorage.getItem('bitRecords')) || [];
  recordsList.innerHTML = '';
  stored.slice(0, 10).forEach((r) => {
    const li = document.createElement('li');
    li.textContent = `${r.name} acertou ${r.value} (alvo: ${r.target})`;
    recordsList.appendChild(li);
  });
}

createBits();
generateTarget();
displayRecords();

// PWA support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
