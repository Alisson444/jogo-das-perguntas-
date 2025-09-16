// ================== Perguntas ==================
const questions = [
  { q: "Qual é a capital do Brasil?", choices: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"], a: 1 },
  { q: "Qual destes planetas é conhecido como o Planeta Vermelho?", choices: ["Vênus", "Marte", "Júpiter", "Mercúrio"], a: 1 },
  { q: "Em que continente fica o Egito?", choices: ["África", "Ásia", "Europa", "América"], a: 0 },
  { q: "Quem foi o primeiro presidente dos EUA?", choices: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"], a: 0 },
  { q: "Qual é o maior oceano do mundo?", choices: ["Atlântico", "Índico", "Pacífico", "Ártico"], a: 2 },
  { q: "Em que ano começou a Segunda Guerra Mundial?", choices: ["1914", "1939", "1945", "1929"], a: 1 },
  { q: "Qual é a capital da França?", choices: ["Paris", "Londres", "Berlim", "Madri"], a: 0 },
  { q: "Onde estão as pirâmides de Gizé?", choices: ["Egito", "México", "Peru", "China"], a: 0 },
  { q: "Qual é o país mais populoso do mundo?", choices: ["Índia", "China", "EUA", "Rússia"], a: 1 },
  { q: "Quem foi o descobridor do Brasil?", choices: ["Pedro Álvares Cabral", "Cristóvão Colombo", "Vasco da Gama", "Fernão de Magalhães"], a: 0 }
];
// =================================================

let shuffledQuestions = [];
let currentIndex = 0;
let score = 0;
let streak = 0;
let timerDuration = 20;
let timerInterval;
let lifelineUsed = false;

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

const resultEl = document.getElementById("result");
const finalScoreEl = document.getElementById("finalScore");
const finalCorrectEl = document.getElementById("finalCorrect");
const finalTotalEl = document.getElementById("finalTotal");
const playerNameEl = document.getElementById("playerName");
const saveBtn = document.getElementById("saveBtn");
const playAgainBtn = document.getElementById("playAgain");
const shareBtn = document.getElementById("shareScore");
const lastPointsEl = document.getElementById("lastPoints");

const leaderList = document.getElementById("leaderList");
const clearBoardBtn = document.getElementById("clearBoard");
const exportBtn = document.getElementById("exportRank");
const importBtn = document.getElementById("importBtn");
const importFile = document.getElementById("importFile");

// ================= Utilitários ==================
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2,"0");
  const s = String(sec % 60).padStart(2,"0");
  return `${m}:${s}`;
}
function updateProgress() {
  progressBar.style.width = `${(currentIndex / shuffledQuestions.length) * 100}%`;
  currentEl.textContent = currentIndex + 1;
  totalEl.textContent = shuffledQuestions.length;
}
function updateScoreDisplay() {
  scoreEl.textContent = score;
  streakEl.textContent = streak;
}
// ================= Timer ==================
function startTimer() {
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
  timerArc.style.stroke = "url(#grad)";
  timerArc.style.strokeDasharray = circumference;
  timerArc.style.strokeDashoffset = circumference * (1 - ratio);
}
// ================= Game Flow ==================
function startGame() {
  shuffledQuestions = shuffle([...questions]).slice(0, parseInt(qCount.value));
  currentIndex = 0;
  score = 0;
  streak = 0;
  lifelineUsed = false;

  updateScoreDisplay();
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
function handleAnswer(i) {
  clearInterval(timerInterval);
  const q = shuffledQuestions[currentIndex];
  const correct = q.a;

  let gained = 0;
  if (i === correct) {
    streak++;
    gained = 100 + (streak * 10);
    score += gained;
    highlightAnswer(correct,"correct");
    lastPointsEl.textContent = `+${gained}`;
  } else {
    streak = 0;
    highlightAnswer(correct,"correct");
    if (i >= 0) highlightAnswer(i,"wrong");
    lastPointsEl.textContent = "0";
  }
  updateScoreDisplay();

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < shuffledQuestions.length) {
      showQuestion();
    } else {
      endGame();
    }
  }, 1200);
}
function highlightAnswer(index, cls) {
  const btns = document.querySelectorAll(".choice-btn");
  if (btns[index]) btns[index].classList.add(cls);
}
function endGame() {
  gameEl.classList.add("hidden");
  resultEl.classList.remove("hidden");

  finalScoreEl.textContent = score;
  finalCorrectEl.textContent = shuffledQuestions.filter((q, i) => q.a === -1 ? false : true).length;
  finalTotalEl.textContent = shuffledQuestions.length;
}
// ================= Ranking ==================
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
  board.slice(0,10).forEach(item=>{
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
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    localStorage.setItem("leaderboard", evt.target.result);
    renderBoard();
  };
  reader.readAsText(file);
}
// ================= Listeners ==================
qCount.addEventListener("input",()=>qCountLabel.textContent=qCount.value);
timerInput.addEventListener("input",()=>{timerLabel.textContent=timerInput.value;timerDuration=parseInt(timerInput.value)});
startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", ()=>clearInterval(timerInterval));
lifeline5050.addEventListener("click", ()=>{
  if(lifelineUsed) return;
  lifelineUsed = true;
  const q = shuffledQuestions[currentIndex];
  const wrong = q.choices.map((_,i)=>i).filter(i=>i!==q.a);
  shuffle(wrong).slice(0,2).forEach(i=>{
    const btns=document.querySelectorAll(".choice-btn");
    if(btns[i]) btns[i].disabled=true;
  });
});
skipBtn.addEventListener("click", ()=>{
  if(score>=200){
    score -= 200;
    updateScoreDisplay();
    currentIndex++;
    if(currentIndex < shuffledQuestions.length){
      showQuestion();
    }else{
      endGame();
    }
  }
});
saveBtn.addEventListener("click", saveScore);
playAgainBtn.addEventListener("click", startGame);
shareBtn.addEventListener("click", ()=>{
  const text = `Fiz ${score} pontos no Neon Quiz!`;
  navigator.clipboard.writeText(text);
  alert("Resultado copiado para compartilhar!");
});
clearBoardBtn.addEventListener("click", clearBoard);
exportBtn.addEventListener("click", exportBoard);
importBtn.addEventListener("click", ()=>importFile.click());
importFile.addEventListener("change", importBoard);

// ================= Init ==================
renderBoard();
