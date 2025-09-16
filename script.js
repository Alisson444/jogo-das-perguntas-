
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
  { q: "Qual país da América Central possui maior população?", choices: ["Guatemala", "Honduras", "Costa Rica", "Panamá"], a: 0 }
]; 

// ================== Variáveis Globais ==================
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const shuffledQuestions = questions.map(q => {
    const choices = [...q.choices]; // copia as opções
    const correctAnswer = choices[q.a]; // guarda a resposta correta original
    shuffleArray(choices); // embaralha as alternativas
    const newCorrectIndex = choices.indexOf(correctAnswer); // atualiza o índice correto
    return { q: q.q, choices: choices, a: newCorrectIndex };
});

console.log(shuffledQuestions);

let currentIndex = 0;
let score = 0;
let streak = 0;
let timerDuration = 20;
let timerInterval = null;
let lifelineUsed = false;

// ================== Seleção de Elementos ==================
const scoreEl = document.getElementById("score");
const streakEl = document.getElementById("streak");
const qCount = document.getElementById("qCount");
const qCountLabel = document.getElementById("qCountLabel");
const timerInput = document.getElementById("timer");
const timerLabel = document.getElementById("timerLabel");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const gameEl = document.getElementById("game");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const progressBar = document.getElementById("progressBar");
const currentEl = document.getElementById("current");
const totalEl = document.getElementById("total");
const timeDisplay = document.getElementById("timeDisplay");
const timerArc = document.getElementById("timerArc");
const lifeline5050 = document.getElementById("lifeline5050");
const skipBtn = document.getElementById("skipBtn");
const lastPointsEl = document.getElementById("lastPoints");

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
const exportBtn = document.getElementById("exportRank");
const importBtn = document.getElementById("importBtn");
const importFile = document.getElementById("importFile");


// ================== Utilitários ==================
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2,"0");
  const s = String(sec % 60).padStart(2,"0");
  return `${m}:${s}`;
}

function updateProgress() {
  progressBar.style.width = `${((currentIndex) / shuffledQuestions.length) * 100}%`;
  currentEl.textContent = currentIndex + 1;
  totalEl.textContent = shuffledQuestions.length;
}

function updateScoreDisplay() {
  scoreEl.textContent = score;
  streakEl.textContent = streak;
}

// ================== Timer ==================
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

// ================== Game Flow ==================
function startGame() {
  shuffledQuestions = shuffle([...questions]).slice(0, parseInt(qCount.value));
  currentIndex = 0;
  score = 0;
  streak = 0;
  lifelineUsed = false;

  updateScoreDisplay();
  lastPointsEl.textContent = "0";

  resultEl.classList.add("hidden");
  gameEl.classList.remove("hidden");

  showQuestion();
}

function showQuestion() {
  clearInterval(timerInterval);
  const q = shuffledQuestions[currentIndex];
  questionEl.textContent = q.q;
  choicesEl.innerHTML = "";

  q.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.onclick = () => handleAnswer(i);
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
  const btns = document.querySelectorAll(".choice-btn");

  if (selected === correct) {
    streak++;
    gained = 100 + (streak * 10);
    score += gained;
    btns[correct].classList.add("correct");
    lastPointsEl.textContent = `+${gained}`;
  } else {
    streak = 0;
    if(selected >= 0) btns[selected].classList.add("wrong");
    btns[correct].classList.add("correct");
    lastPointsEl.textContent = "0";
  }

  updateScoreDisplay();

  setTimeout(() => {
    currentIndex++;
    if(currentIndex < shuffledQuestions.length){
      showQuestion();
    } else {
      endGame();
    }
  }, 1200);
}

function endGame() {
  gameEl.classList.add("hidden");
  resultEl.classList.remove("hidden");

  finalScoreEl.textContent = score;
  finalCorrectEl.textContent = shuffledQuestions.filter(q => q.a >= 0).length;
  finalTotalEl.textContent = shuffledQuestions.length;
}

// ================== Lifelines ==================
lifeline5050.addEventListener("click", () => {
  if(lifelineUsed) return;
  lifelineUsed = true;

  const q = shuffledQuestions[currentIndex];
  const wrongIndices = q.choices.map((_,i) => i).filter(i => i !== q.a);
  shuffle(wrongIndices).slice(0,2).forEach(i => {
    const btns = document.querySelectorAll(".choice-btn");
    if(btns[i]) btns[i].disabled = true;
  });
});

skipBtn.addEventListener("click", () => {
  if(score >= 200){
    score -= 200;
    updateScoreDisplay();
    currentIndex++;
    if(currentIndex < shuffledQuestions.length){
      showQuestion();
    } else {
      endGame();
    }
  }
});

// ================== Ranking ==================
function saveScore() {
  const name = playerNameEl.value.trim() || "Jogador";
  const board = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  board.push({ name, score });
  board.sort((a,b)=>b.score-a.score);
  localStorage.setItem("leaderboard", JSON.stringify(board));
  renderBoard();
}

function renderBoard() {
  const board = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  leaderList.innerHTML = "";
  board.slice(0,10).forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.score} pts`;
    leaderList.appendChild(li);
  });
}

function clearBoard() {
  localStorage.removeItem("leaderboard");
  renderBoard();
}

function exportBoard() {
  const data = localStorage.getItem("leaderboard") || "[]";
  const blob = new Blob([data],{type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ranking.json";
  a.click();
}

function importBoard(e) {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(evt){
    localStorage.setItem("leaderboard", evt.target.result);
    renderBoard();
  };
  reader.readAsText(file);
}

// ================== Event Listeners ==================
qCount.addEventListener("input", ()=> qCountLabel.textContent = qCount.value);
timerInput.addEventListener("input", ()=>{
  timerLabel.textContent = timerInput.value;
  timerDuration = parseInt(timerInput.value);
});

startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", ()=> clearInterval(timerInterval));
saveBtn.addEventListener("click", saveScore);
playAgainBtn.addEventListener("click", startGame);

shareBtn.addEventListener("click", ()=>{
  const text = `Fiz ${score} pontos no Neon Quiz!`;
  navigator.clipboard.writeText(text);
  alert("Resultado copiado para compartilhar!");
});

clearBoardBtn.addEventListener("click", clearBoard);
exportBtn.addEventListener("click", exportBoard);
importBtn.addEventListener("click", ()=> importFile.click());
importFile.addEventListener("change", importBoard);

// ================== Init ==================
renderBoard();
