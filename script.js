// script.js — Neon Quiz (com sons, timer e sliders revisados)

const questions = [
  { q: "Qual era o nome do imperador romano que governava durante o grande incêndio de Roma em 64 d.C.?", choices: ["Nero", "Calígula", "Augusto", "Trajano"], a: 0 },
  { q: "Qual tratado marcou o fim da Primeira Guerra Mundial?", choices: ["Versalhes", "Tordesilhas", "Paz de Paris", "Yalta"], a: 0 },
  { q: "Qual civilização antiga construiu Machu Picchu?", choices: ["Inca", "Maia", "Asteca", "Olmeca"], a: 0 },
  { q: "Qual país africano é conhecido como 'a pérola da África'?", choices: ["Uganda", "Quênia", "Egito", "Nigéria"], a: 0 },
  { q: "Em que ano ocorreu a Revolução Francesa?", choices: ["1789", "1776", "1804", "1815"], a: 0 },
  { q: "Qual cidade foi dividida pelo Muro que caiu em 1989?", choices: ["Berlim", "Varsóvia", "Budapeste", "Praga"], a: 0 },
  { q: "Qual é o rio mais longo da América do Sul?", choices: ["Amazonas", "Paraná", "São Francisco", "Orinoco"], a: 0 },
  { q: "Qual país possui mais fusos horários?", choices: ["França", "Rússia", "Estados Unidos", "China"], a: 0 },
  { q: "Quem foi o primeiro imperador da China unificada?", choices: ["Qin Shi Huang", "Han Wudi", "Kublai Khan", "Li Shimin"], a: 0 },
  { q: "Qual guerra é conhecida como 'A Grande Guerra'?", choices: ["Primeira Guerra Mundial", "Segunda Guerra Mundial", "Guerra Fria", "Guerra do Vietnã"], a: 0 },
  { q: "Qual era o principal produto da Rota da Seda?", choices: ["Seda", "Ouro", "Pimenta", "Prata"], a: 0 },
  { q: "Qual império africano foi famoso por suas universidades e riqueza em ouro?", choices: ["Mali", "Gana", "Songhai", "Egito"], a: 0 },
  { q: "Qual país tem mais ilhas no mundo?", choices: ["Suécia", "Noruega", "Filipinas", "Indonésia"], a: 0 },
  { q: "Qual dinastia chinesa é conhecida pelo início da Grande Muralha?", choices: ["Qin", "Han", "Tang", "Ming"], a: 0 },
  { q: "Qual civilização desenvolveu a escrita cuneiforme?", choices: ["Suméria", "Egito", "Fenícia", "Maias"], a: 0 },
  { q: "Em qual país ocorreu a Revolução dos Cravos em 1974?", choices: ["Portugal", "Espanha", "Itália", "Grécia"], a: 0 },
  { q: "Qual era a capital do Império Bizantino?", choices: ["Constantinopla", "Roma", "Atenas", "Alexandria"], a: 0 },
  { q: "Qual é a maior ilha do Mediterrâneo?", choices: ["Sicília", "Córsega", "Creta", "Chipre"], a: 0 },
  { q: "Qual evento marcou o fim da Idade Média?", choices: ["Queda de Constantinopla", "Revolução Francesa", "Descobrimento da América", "Renascimento"], a: 0 },
  { q: "Qual país da América do Sul nunca foi colonizado por europeus?", choices: ["Guiana", "Brasil", "Chile", "Argentina"], a: 0 },
  { q: "Quem foi o líder da Revolução Russa de 1917?", choices: ["Lenin", "Stalin", "Trotsky", "Kerensky"], a: 0 },
  { q: "Qual cidade italiana é conhecida como 'a cidade das canals'?", choices: ["Veneza", "Florença", "Roma", "Milão"], a: 0 },
  { q: "Qual país asiático foi dividido em Norte e Sul após a Segunda Guerra Mundial?", choices: ["Coreia", "Vietnã", "Alemanha", "Índia"], a: 0 },
  { q: "Em que ano a União Europeia foi oficialmente criada?", choices: ["1993", "1957", "2002", "1986"], a: 0 },
  { q: "Qual era o nome da rota comercial que ligava o Oriente Médio à China?", choices: ["Rota da Seda", "Caminho de Ferro Transiberiano", "Rota do Ouro", "Rota do Chá"], a: 0 },
  { q: "Qual guerra teve início com o ataque a Pearl Harbor?", choices: ["Segunda Guerra Mundial", "Primeira Guerra Mundial", "Guerra do Pacífico", "Guerra Fria"], a: 0 },
  { q: "Qual país europeu colonizou o Brasil?", choices: ["Portugal", "Espanha", "França", "Holanda"], a: 0 },
  { q: "Qual civilização antiga construiu a cidade de Petra?", choices: ["Nabateus", "Fenícios", "Assírios", "Hititas"], a: 0 },
  { q: "Em que país está localizado o deserto de Gobi?", choices: ["China/Mongólia", "Arábia Saudita", "Austrália", "Nigéria"], a: 0 },
  { q: "Qual imperador francês foi exilado na ilha de Santa Helena?", choices: ["Napoleão Bonaparte", "Luís XVI", "Carlos Magno", "Henrique IV"], a: 0 },
  { q: "Qual civilização desenvolveu a escrita hieroglífica?", choices: ["Egípcia", "Suméria", "Fenícia", "Grega"], a: 0 },
  { q: "Qual foi o primeiro país a dar direito de voto às mulheres?", choices: ["Nova Zelândia", "EUA", "Inglaterra", "França"], a: 0 },
  { q: "Qual é o maior deserto quente do mundo?", choices: ["Saara", "Gobi", "Kalahari", "Atacama"], a: 0 },
  { q: "Qual país é conhecido como 'Terra do Sol Nascente'?", choices: ["Japão", "China", "Coreia do Sul", "Tailândia"], a: 0 },
  { q: "Qual foi a civilização que construiu Stonehenge?", choices: ["Britânica antiga", "Celta", "Romana", "Viking"], a: 0 },
  { q: "Qual é a capital da Austrália?", choices: ["Canberra", "Sydney", "Melbourne", "Perth"], a: 0 },
  { q: "Qual é a montanha mais alta da África?", choices: ["Kilimanjaro", "Atlas", "Elbrus", "Rwenzori"], a: 0 },
  { q: "Em que país se encontra a cidade histórica de Timbuktu?", choices: ["Mali", "Nigéria", "Senegal", "Níger"], a: 0 },
  { q: "Qual civilização construiu a Grande Muralha da China?", choices: ["Chinesa", "Mongol", "Han", "Qin"], a: 0 },
  { q: "Qual país europeu tem o maior território?", choices: ["Rússia", "França", "Espanha", "Ucrânia"], a: 0 },
  { q: "Qual foi o maior império do mundo em extensão territorial?", choices: ["Império Britânico", "Mongol", "Russo", "Romano"], a: 0 },
  { q: "Qual é o menor país do mundo em território?", choices: ["Vaticano", "Mônaco", "Nauru", "San Marino"], a: 0 },
  { q: "Qual foi o primeiro país a enviar um homem ao espaço?", choices: ["URSS", "EUA", "China", "Alemanha"], a: 0 },
  { q: "Qual era o nome do primeiro rei da Inglaterra?", choices: ["Egberto", "Alfredo", "Guillermo", "Canuto"], a: 0 },
  { q: "Qual civilização criou os zigurates?", choices: ["Suméria", "Egípcia", "Assíria", "Babilônica"], a: 0 },
  { q: "Qual o país mais alto do mundo em altitude média?", choices: ["Butão", "Nepal", "Suíça", "Quênia"], a: 0 },
  { q: "Qual país africano aboliu a escravidão primeiro?", choices: ["Maurício", "Haiti", "Brasil", "Espanha"], a: 0 },
  { q: "Em que ano a Alemanha se reunificou?", choices: ["1990", "1989", "1991", "1985"], a: 0 },
  { q: "Qual foi a capital do Império Inca?", choices: ["Cusco", "Quito", "Lima", "La Paz"], a: 0 },
  { q: "Qual país é conhecido pelo Mar de Areia do Sahara?", choices: ["Argélia", "Líbia", "Egito", "Níger"], a: 0 },
  { q: "Qual país possui a maior floresta tropical do mundo?", choices: ["Brasil", "Congo", "Indonésia", "Peru"], a: 0 },
  { q: "Qual cidade foi fundada por Roma e é hoje a capital da Itália?", choices: ["Roma", "Milão", "Nápoles", "Florença"], a: 0 },
  { q: "Qual país europeu aboliu a monarquia em 1918?", choices: ["Alemanha", "França", "Itália", "Áustria"], a: 0 },
  { q: "Qual ilha é a maior do mundo?", choices: ["Groenlândia", "Madagascar", "Nova Guiné", "Borneo"], a: 0 },
  { q: "Em que ano começou a Guerra dos Cem Anos?", choices: ["1337", "1415", "1453", "1302"], a: 0 },
  { q: "Qual é a capital da Noruega?", choices: ["Oslo", "Estocolmo", "Helsinque", "Copenhague"], a: 0 },
  { q: "Qual país da América Central possui maior população?", choices: ["Guatemala", "Honduras", "Costa Rica", "Panamá"], a: 0 }];

const LEADER_KEY = "neonquiz_leaderboard_v1";

let shuffledQuestions = [];
let currentIndex = 0;
let score = 0;
let streak = 0;
let timerDuration = 20;
let timerInterval = null;
let correctCount = 0;
let displayedChoices = [];
let soundEnabled = true;
let audioCtx = null;

const scoreEl = document.getElementById("score");
const streakEl = document.getElementById("streak");
const qCount = document.getElementById("qCount");
const qCountLabel = document.getElementById("qCountLabel");
const timerInput = document.getElementById("timer");
const timerLabel = document.getElementById("timerLabel");
const startBtn = document.getElementById("startBtn");
const gameEl = document.getElementById("game");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const progressBar = document.getElementById("progressBar");
const currentEl = document.getElementById("current");
const totalEl = document.getElementById("total");
const timeDisplay = document.getElementById("timeDisplay");
const timerArc = document.getElementById("timerArc");
const lastPointsEl = document.getElementById("lastPoints");
const soundToggle = document.getElementById("soundToggle");
const bgAudio = document.getElementById("bg-music");

const resultEl = document.getElementById("result");
const finalScoreEl = document.getElementById("finalScore");
const finalCorrectEl = document.getElementById("finalCorrect");
const finalTotalEl = document.getElementById("finalTotal");
const playerNameEl = document.getElementById("playerName");
const saveBtn = document.getElementById("saveBtn");
const playAgainBtn = document.getElementById("playAgain");
const shareBtn = document.getElementById("shareScore");

const leaderList = document.getElementById("leaderList");
const clearBoardBtn = document.getElementById("clearBoard");

// -------------------- FUNÇÕES AUXILIARES --------------------
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function ensureAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playCorrect() {
  if (!soundEnabled) return;
  ensureAudio();
  const now = audioCtx.currentTime;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = "triangle";
  o.frequency.setValueAtTime(660, now);
  g.gain.setValueAtTime(0, now);
  o.connect(g);
  g.connect(audioCtx.destination);
  g.gain.linearRampToValueAtTime(0.12, now + 0.01);
  o.frequency.exponentialRampToValueAtTime(990, now + 0.18);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
  o.start(now);
  o.stop(now + 0.4);
}

function playWrong() {
  if (!soundEnabled) return;
  ensureAudio();
  const now = audioCtx.currentTime;
  const bufferSize = audioCtx.sampleRate * 0.12;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  const band = audioCtx.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.setValueAtTime(200, now);
  band.Q.setValueAtTime(1, now);
  const g = audioCtx.createGain();
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
  noise.connect(band);
  band.connect(g);
  g.connect(audioCtx.destination);
  noise.start(now);
  noise.stop(now + 0.13);
}

function tryPlayBg() {
  if (!soundEnabled || !bgAudio) return;
  bgAudio.volume = 0.12;
  bgAudio.currentTime = 0;
  const p = bgAudio.play();
  if (p && p.catch) p.catch(() => {});
}

function tryPauseBg() {
  if (!bgAudio) return;
  try { bgAudio.pause(); } catch {}
}

// -------------------- GAMEPLAY --------------------
function updateProgress() {
  const total = shuffledQuestions.length || 1;
  progressBar.style.width = `${(currentIndex / total) * 100}%`;
  currentEl.textContent = Math.min(currentIndex + 1, shuffledQuestions.length);
  totalEl.textContent = shuffledQuestions.length;
}

function updateScoreDisplay() {
  scoreEl.textContent = score;
  streakEl.textContent = streak;
}

function startTimer() {
  clearInterval(timerInterval);
  let timeLeft = timerDuration;
  timeDisplay.textContent = formatTime(timeLeft);
  updateTimerArc(1);
  timerInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = formatTime(timeLeft);
    updateTimerArc(timeLeft / timerDuration);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleAnswer(-1);
    }
  }, 1000);
}

function updateTimerArc(ratio) {
  const circumference = 2 * Math.PI * 16;
  timerArc.setAttribute("d", "M18 2a16 16 0 1 1 0 32a16 16 0 1 1 0-32");
  timerArc.style.stroke = "#00cfff";
  timerArc.style.strokeDasharray = circumference;
  timerArc.style.strokeDashoffset = circumference * (1 - ratio);
}

function startGame() {
  timerDuration = parseInt(timerInput.value, 10) || 20;
  shuffledQuestions = shuffle([...questions]).slice(0, parseInt(qCount.value, 10));
  currentIndex = 0;
  score = 0;
  streak = 0;
  correctCount = 0;
  displayedChoices = [];
  updateScoreDisplay();
  lastPointsEl.textContent = "0";
  resultEl.classList.add("hidden");
  gameEl.classList.remove("hidden");
  if (soundEnabled) {
    try { if (audioCtx && audioCtx.state === "suspended") audioCtx.resume(); } catch {}
    tryPlayBg();
  }
  showQuestion();
}

function showQuestion() {
  clearInterval(timerInterval);
  choicesEl.innerHTML = "";
  displayedChoices = [];
  const q = shuffledQuestions[currentIndex];
  if (!q) { endGame(); return; }
  questionEl.textContent = q.q;
  const pairs = q.choices.map((text, idx) => ({ text, orig: idx }));
  const shuffledPairs = shuffle(pairs);
  displayedChoices = shuffledPairs;
  shuffledPairs.forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.dataset.orig = item.orig;
    btn.textContent = item.text;
    btn.onclick = () => {
      try { if (audioCtx && audioCtx.state === "suspended") audioCtx.resume(); } catch {}
      handleAnswer(parseInt(btn.dataset.orig, 10));
    };
    choicesEl.appendChild(btn);
  });
  updateProgress();
  startTimer();
}

function handleAnswer(selected) {
  clearInterval(timerInterval);
  const q = shuffledQuestions[currentIndex];
  const correct = q.a;
  let gained = 0;
  const btns = Array.from(document.querySelectorAll(".choice-btn"));

  if (selected === correct) {
    streak++;
    gained = 100 + (streak * 10);
    score += gained;
    correctCount++;
    const targetBtn = btns.find(b => parseInt(b.dataset.orig, 10) === correct);
    if (targetBtn) targetBtn.classList.add("correct");
    lastPointsEl.textContent = `+${gained}`;
    playCorrect();
  } else {
    streak = 0;
    if (selected >= 0) {
      const selBtn = btns.find(b => parseInt(b.dataset.orig, 10) === selected);
      if (selBtn) selBtn.classList.add("wrong");
    }
    const correctBtn = btns.find(b => parseInt(b.dataset.orig, 10) === correct);
    if (correctBtn) correctBtn.classList.add("correct");
    lastPointsEl.textContent = "0";
    playWrong();
  }

  btns.forEach(b => b.disabled = true);
  updateScoreDisplay();
  setTimeout(() => {
    currentIndex++;
    if (currentIndex < shuffledQuestions.length) {
      showQuestion();
    } else {
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  finalScoreEl.textContent = score;
  finalCorrectEl.textContent = correctCount;
  finalTotalEl.textContent = shuffledQuestions.length;
  tryPauseBg();
}

// -------------------- RANKING --------------------
function loadBoard() {
  try {
    const raw = localStorage.getItem(LEADER_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) { localStorage.removeItem(LEADER_KEY); return []; }
}

function saveBoard(board) {
  try { localStorage.setItem(LEADER_KEY, JSON.stringify(board)); } catch (err) { console.error(err); }
}

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function renderBoard() {
  const board = loadBoard();
  leaderList.innerHTML = "";
  if (!board.length) {
    const p = document.createElement("p");
    p.style.color = "var(--muted)";
    p.style.margin = "8px 0";
    p.textContent = "Sem registros ainda — jogue e salve seu primeiro placar!";
    leaderList.appendChild(p);
    return;
  }
  board.slice(0, 10).forEach((item, index) => {
    const li = document.createElement("li");
    const date = item.date ? new Date(item.date) : null;
    li.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div><strong>${index + 1}. ${escapeHtml(item.name)}</strong> — ${item.score} pts</div>
        <div style="opacity:0.8;font-size:0.9em">${date ? date.toLocaleDateString() : ""}</div>
      </div>`;
    leaderList.appendChild(li);
  });
}

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

function playCorrect() {
  if (!soundEnabled) return;
  correctSound.currentTime = 0;
  correctSound.play();
}

function playWrong() {
  if (!soundEnabled) return;
  wrongSound.currentTime = 0;
  wrongSound.play();
}
function handleAnswer(selected) {
  clearInterval(timerInterval);
  const q = shuffledQuestions[currentIndex];
  const correct = q.a;
  const btns = Array.from(document.querySelectorAll(".choice-btn"));
  let gained = 0;

  if (selected === correct) {
    streak++;
    gained = 100 + streak * 10;
    score += gained;
    correctCount++;
    const targetBtn = btns.find(b => parseInt(b.dataset.orig, 10) === correct);
    if (targetBtn) targetBtn.classList.add("correct");
    lastPointsEl.textContent = `+${gained}`;
    playCorrect(); // <-- som de acerto
  } else {
    streak = 0;
    if (selected >= 0) {
      const selBtn = btns.find(b => parseInt(b.dataset.orig, 10) === selected);
      if (selBtn) selBtn.classList.add("wrong");
    }
    const correctBtn = btns.find(b => parseInt(b.dataset.orig, 10) === correct);
    if (correctBtn) correctBtn.classList.add("correct");
    lastPointsEl.textContent = "0";
    playWrong(); // <-- som de erro
  }

  btns.forEach(b => b.disabled = true);
  updateScoreDisplay();

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < shuffledQuestions.length) {
      showQuestion();
    } else {
      endGame();
    }
  }, 1000);
}


// -------------------- EVENTOS --------------------
startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);
saveBtn.addEventListener("click", () => {
  const name = playerNameEl.value.trim() || "Anon";
  const board = loadBoard();
  board.push({ name, score, date: new Date().toISOString() });
  board.sort((a, b) => b.score - a.score);
  saveBoard(board);
  renderBoard();
});

clearBoardBtn.addEventListener("click", () => {
  localStorage.removeItem(LEADER_KEY);
  renderBoard();
});

soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundToggle.textContent = soundEnabled ? "🔊 Som: ON" : "🔇 Som: OFF";
  if (!soundEnabled) tryPauseBg();
});

qCount.addEventListener("input", () => { qCountLabel.textContent = qCount.value; });
timerInput.addEventListener("input", () => { timerLabel.textContent = timerInput.value; });

// iniciar leaderboard
renderBoard();
