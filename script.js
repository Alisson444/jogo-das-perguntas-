/* script.js
  Quiz completo: timer, scoring, streak, import/export, ranking localStorage, keyboard controls.
*/

(() => {
  // ---- Elements
  const startBtn = document.getElementById('startBtn');
  const openEditorBtn = document.getElementById('openEditorBtn');
  const openRankingBtn = document.getElementById('openRankingBtn');

  const panelStart = document.getElementById('panel-start');
  const panelQuiz = document.getElementById('panel-quiz');
  const panelResult = document.getElementById('panel-result');
  const panelEditor = document.getElementById('panel-editor');
  const panelRanking = document.getElementById('panel-ranking');

  const numQuestionsEl = document.getElementById('numQuestions');
  const timePerQuestionEl = document.getElementById('timePerQuestion');
  const timeLabel = document.getElementById('timeLabel');
  const shuffleQuestionsEl = document.getElementById('shuffleQuestions');
  const allowSkipEl = document.getElementById('allowSkip');
  const immediateFeedbackEl = document.getElementById('immediateFeedback');

  const currentIndexEl = document.getElementById('currentIndex');
  const totalQuestionsEl = document.getElementById('totalQuestions');
  const progressFill = document.getElementById('progressFill');
  const questionText = document.getElementById('questionText');
  const choicesEl = document.getElementById('choices');
  const timerBar = document.getElementById('timerBar');
  const timeLeftEl = document.getElementById('timeLeft');
  const scoreEl = document.getElementById('score');
  const streakEl = document.getElementById('streak');
  const skipBtn = document.getElementById('skipBtn');
  const nextBtn = document.getElementById('nextBtn');

  const finalScoreEl = document.getElementById('finalScore');
  const summaryCorrect = document.getElementById('summaryCorrect');
  const summaryWrong = document.getElementById('summaryWrong');
  const summaryAvgTime = document.getElementById('summaryAvgTime');
  const summaryMaxStreak = document.getElementById('summaryMaxStreak');
  const playerNameInput = document.getElementById('playerName');
  const saveScoreBtn = document.getElementById('saveScoreBtn');
  const playAgainBtn = document.getElementById('playAgainBtn');
  const backToStartBtn = document.getElementById('backToStartBtn');

  const editorJson = document.getElementById('editorJson');
  const loadEditorBtn = document.getElementById('loadEditorBtn');
  const exportBtn = document.getElementById('exportBtn');
  const fileInput = document.getElementById('fileInput');
  const editorBackBtn = document.getElementById('editorBackBtn');

  const rankingList = document.getElementById('rankingList');
  const clearRankingBtn = document.getElementById('clearRankingBtn');
  const rankingBackBtn = document.getElementById('rankingBackBtn');

  // ---- State
  let questionsPool = []; // default loaded below
  let quiz = [];
  let totalQuestions = 10;
  let timePerQuestion = 20;
  let currentIndex = 0;
  let score = 0;
  let streak = 0;
  let maxStreak = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let times = []; // times per question
  let timerId = null;
  let startedAt = 0;
  let allowSkip = false;
  let immediateFeedback = true;

  // ---- sample questions (you can replace via editor/import)
  questionsPool = [
    { q: "Qual é a capital do Brasil?", choices: ["São Paulo","Brasília","Rio de Janeiro","Salvador"], a: 1 },
    { q: "Em que ano o homem pisou na Lua pela primeira vez?", choices: ["1959","1969","1979","1989"], a: 1 },
    { q: "Qual o maior oceano do planeta?", choices: ["Atlântico","Índico","Ártico","Pacífico"], a: 3 },
    { q: "Quem pintou a Mona Lisa?", choices: ["Michelangelo","Picasso","Leonardo da Vinci","Van Gogh"], a: 2 },
    { q: "Qual é a unidade básica da vida?", choices: ["Órgão","Célula","Molécula","Sistema"], a: 1 },
    { q: "Qual gás é essencial para a respiração humana?", choices: ["Dióxido de carbono","Nitrogênio","Oxigênio","Hélio"], a: 2 },
    { q: "Quem escreveu 'Dom Casmurro'?", choices: ["Machado de Assis","Jorge Amado","Clarice Lispector","Paulo Coelho"], a: 0 },
    { q: "Qual planeta é conhecido como Planeta Vermelho?", choices: ["Vênus","Marte","Júpiter","Mercúrio"], a: 1 },
    { q: "Qual é a capital da França?", choices: ["Lyon","Marseille","Paris","Bordeaux"], a: 2 },
    { q: "O que significa HTTP?", choices: ["HyperText Transfer Protocol","Home Transfer Text Protocol","Hyperlink Text Transfer Program","Hyper Transfer Text Protocol"], a: 0 },
    { q: "Quem compôs 'Für Elise'?", choices: ["Mozart","Bach","Beethoven","Chopin"], a: 2 },
    { q: "Qual metal é líquido à temperatura ambiente?", choices: ["Ferro","Prata","Mercúrio","Ouro"], a: 2 },
    { q: "Qual é o símbolo químico do Oxigênio?", choices: ["O","Ox","Og","Oxg"], a: 0 },
    { q: "Quantos segundos há em uma hora?", choices: ["3600","600","1800","7200"], a: 0 },
    { q: "Em computação, o que significa RAM?", choices: ["Readily Accessible Memory","Random Access Memory","Read Access Module","Remote Access Memory"], a: 1 },
    { q: "Qual continente tem o maior número de países?", choices: ["África","Ásia","Europa","América"], a: 0 },
    { q: "Qual esporte usa raquetes e uma rede central?", choices: ["Futebol","Tênis","Natação","Boxe"], a: 1 },
    { q: "Qual é a capital do Japão?", choices: ["Seul","Tóquio","Pequim","Osaka"], a: 1 },
    { q: "Quem pintou 'A Noite Estrelada'?", choices: ["Van Gogh","Picasso","Monet","Rembrandt"], a: 0 },
    { q: "Qual a fórmula da água?", choices: ["CO2","H2O","NaCl","O2"], a: 1 }
  ];

  // ---- utils
  function show(el){ el.classList.remove('hidden'); }
  function hide(el){ el.classList.add('hidden'); }
  function clamp(v,min,max){ return Math.max(min, Math.min(max, v)); }
  function shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
  }

  // ---- settings listeners
  timePerQuestionEl.addEventListener('input', ()=> {
    timeLabel.textContent = timePerQuestionEl.value + 's';
  });

  // ---- start game
  startBtn.addEventListener('click', ()=> {
    totalQuestions = parseInt(numQuestionsEl.value,10);
    timePerQuestion = parseInt(timePerQuestionEl.value,10);
    allowSkip = allowSkipEl.checked;
    immediateFeedback = immediateFeedbackEl.checked;

    // prepare quiz
    quiz = questionsPool.slice();
    if (shuffleQuestionsEl.checked) shuffle(quiz);
    quiz = quiz.slice(0, totalQuestions);

    // reset stats
    currentIndex = 0; score = 0; streak = 0; maxStreak = 0; correctCount = 0; wrongCount = 0; times = [];
    scoreEl.textContent = score; streakEl.textContent = streak;
    totalQuestionsEl.textContent = totalQuestions;

    // show quiz
    hide(panelStart); hide(panelResult); hide(panelRanking); hide(panelEditor);
    show(panelQuiz);

    renderQuestion();
  });

  // ---- render question
  function renderQuestion(){
    const item = quiz[currentIndex];
    currentIndexEl.textContent = (currentIndex+1);
    // progress
    const perc = Math.round((currentIndex/totalQuestions)*100);
    progressFill.style.width = perc + '%';

    questionText.textContent = item.q || 'Pergunta vazia';
    choicesEl.innerHTML = '';

    // create buttons for choices
    item.choices.forEach((c, idx) => {
      const btn = document.createElement('button');
      btn.className = 'choice';
      btn.dataset.index = idx;
      btn.innerHTML = `<span class="choice-index">${idx+1}.</span><span class="choice-text">${c}</span>`;
      btn.addEventListener('click', ()=> selectChoice(idx));
      choicesEl.appendChild(btn);
    });

    // controls visibility
    skipBtn.style.display = allowSkip ? 'inline-block' : 'none';
    nextBtn.classList.add('hidden');

    // start timer
    startTimer();
  }

  // ---- timer
  function startTimer(){
    clearInterval(timerId);
    let start = Date.now();
    let total = timePerQuestion * 1000;
    timeLeftEl.textContent = Math.ceil(total/1000);
    timerBar.style.width = '100%';
    // smooth tick
    timerId = setInterval(()=>{
      const elapsed = Date.now() - start;
      const remain = clamp(total - elapsed, 0, total);
      const pct = (remain/total)*100;
      timerBar.style.width = pct + '%';
      timeLeftEl.textContent = Math.ceil(remain/1000);

      // pulse when <5s
      if (remain <= 5000) {
        timerBar.classList.add('pulse');
      } else {
        timerBar.classList.remove('pulse');
      }

      if (remain <= 0){
        clearInterval(timerId);
        handleNoAnswer();
      }
    }, 100);
    startedAt = Date.now();
  }

  // ---- when time runs out
  function handleNoAnswer(){
    times.push(timePerQuestion); // max time used
    wrongCount++;
    streak = 0;
    streakEl.textContent = streak;
    showCorrectAnswerVisual(null);
    proceedAfterAnswer();
  }

  // ---- choice selection
  function selectChoice(idx){
    clearInterval(timerId);
    const item = quiz[currentIndex];
    const elapsed = (Date.now() - startedAt)/1000;
    times.push(elapsed);
    const correctIdx = item.a;

    if (idx === correctIdx){
      handleCorrect(elapsed);
    } else {
      handleWrong(idx, correctIdx);
    }
  }

  function handleCorrect(elapsed){
    correctCount++;
    streak++;
    maxStreak = Math.max(maxStreak, streak);
    streakEl.textContent = streak;

    // scoring: base 100 + time bonus (max 400) + streak multiplier (10% per streak)
    const base = 100;
    const timeBonus = Math.round(400 * ((timePerQuestion - elapsed) / timePerQuestion));
    const streakMultiplier = 1 + (0.10 * (streak-1)); // 10% for each combo after the first
    const gained = Math.round((base + Math.max(0, timeBonus)) * streakMultiplier);

    score += gained;
    scoreEl.textContent = score;

    // show feedback
    showCorrectAnswerVisual(true);
    // if immediate feedback, wait then next
    if (immediateFeedback) {
      setTimeout(proceedAfterAnswer, 700);
    } else {
      nextBtn.classList.remove('hidden');
    }
  }

  function handleWrong(chosenIdx, correctIdx){
    wrongCount++;
    streak = 0;
    streakEl.textContent = streak;

    // partial or zero points for wrong
    // show feedback
    showCorrectAnswerVisual(chosenIdx);
    if (immediateFeedback) {
      setTimeout(proceedAfterAnswer, 900);
    } else {
      nextBtn.classList.remove('hidden');
    }
  }

  function showCorrectAnswerVisual(chosenIdxOrBool){
    const item = quiz[currentIndex];
    const buttons = Array.from(choicesEl.querySelectorAll('.choice'));
    buttons.forEach(btn => btn.classList.add('disabled'));
    buttons.forEach(btn => {
      const idx = parseInt(btn.dataset.index,10);
      if (idx === item.a) btn.classList.add('correct');
      if (typeof chosenIdxOrBool === 'number' && idx === chosenIdxOrBool && idx !== item.a) btn.classList.add('wrong');
      if (chosenIdxOrBool === null && idx === item.a) btn.classList.add('correct');
    });
  }

  // ---- proceed to next or finish
  function proceedAfterAnswer(){
    currentIndex++;
    if (currentIndex >= totalQuestions) {
      finishQuiz();
      return;
    }
    renderQuestion();
  }

  function finishQuiz(){
    clearInterval(timerId);
    // progress to 100
    progressFill.style.width = '100%';
    hide(panelQuiz);
    show(panelResult);

    finalScoreEl.textContent = score;
    summaryCorrect.textContent = correctCount;
    summaryWrong.textContent = wrongCount;
    summaryMaxStreak.textContent = maxStreak;
    const avg = times.length ? (times.reduce((a,b)=>a+b,0)/times.length).toFixed(1) : 0;
    summaryAvgTime.textContent = avg;
  }

  // ---- skip button
  skipBtn.addEventListener('click', ()=>{
    if (!allowSkip) return;
    clearInterval(timerId);
    times.push(timePerQuestion);
    wrongCount++;
    streak = 0; streakEl.textContent = streak;
    showCorrectAnswerVisual(null);
    setTimeout(proceedAfterAnswer, 400);
  });

  // ---- next button (when immediateFeedback disabled)
  nextBtn.addEventListener('click', ()=> {
    proceedAfterAnswer();
    nextBtn.classList.add('hidden');
  });

  // ---- keyboard shortcuts 1-4
  window.addEventListener('keydown', (e)=>{
    if (panelQuiz.classList.contains('hidden')) return;
    const key = e.key;
    if (['1','2','3','4'].includes(key)){
      const idx = parseInt(key,10)-1;
      const btn = choicesEl.querySelector(`.choice[data-index="${idx}"]`);
      if (btn && !btn.classList.contains('disabled')) btn.click();
    }
    if (key === ' '){ // space = skip
      if (allowSkip) skipBtn.click();
    }
  });

  // ---- ranking (localStorage)
  function getRanking(){ try { return JSON.parse(localStorage.getItem('quiz-ranking')||'[]'); } catch { return []; } }
  function saveRanking(list){ localStorage.setItem('quiz-ranking', JSON.stringify(list)); }

  saveScoreBtn.addEventListener('click', ()=>{
    const name = (playerNameInput.value || 'Anônimo').trim();
    const list = getRanking();
    list.push({ name, score, date: new Date().toISOString(), correct: correctCount, wrong: wrongCount });
    list.sort((a,b)=> b.score - a.score);
    saveRanking(list.slice(0,10));
    openRankingPanel();
  });

  // ---- editor / import / export
  openEditorBtn.addEventListener('click', ()=> {
    hide(panelStart); hide(panelQuiz); hide(panelResult); hide(panelRanking);
    show(panelEditor);
    // show JSON current pool
    editorJson.value = JSON.stringify(questionsPool, null, 2);
  });

  loadEditorBtn.addEventListener('click', ()=> {
    try {
      const parsed = JSON.parse(editorJson.value);
      if (!Array.isArray(parsed)) throw new Error('JSON deve ser um array');
      // basic validation
      parsed.forEach((it, i) => {
        if (typeof it.q !== 'string' || !Array.isArray(it.choices) || typeof it.a !== 'number') {
          throw new Error(`Item ${i} inválido`);
        }
      });
      questionsPool = parsed;
      alert('Quiz carregado com sucesso! Agora volte e clique em Começar.');
      editorBackBtn.click();
    } catch (err) {
      alert('Erro ao carregar JSON: ' + err.message);
    }
  });

  exportBtn.addEventListener('click', ()=>{
    const data = JSON.stringify(questionsPool, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'quiz.json'; a.click();
    URL.revokeObjectURL(url);
  });

  fileInput.addEventListener('change', (ev)=>{
    const f = ev.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = e => {
      editorJson.value = e.target.result;
      alert('Arquivo carregado no editor. Clique em "Carregar para usar".');
    };
    reader.readAsText(f);
  });

  editorBackBtn.addEventListener('click', ()=> {
    hide(panelEditor); hide(panelQuiz); hide(panelResult); hide(panelRanking);
    show(panelStart);
  });

  // ---- ranking panel
  openRankingBtn.addEventListener('click', openRankingPanel);
  function openRankingPanel(){
    hide(panelStart); hide(panelQuiz); hide(panelResult); hide(panelEditor);
    show(panelRanking);
    renderRanking();
  }
  rankingBackBtn.addEventListener('click', ()=>{
    hide(panelRanking); show(panelStart);
  });

  clearRankingBtn.addEventListener('click', ()=> {
    if (confirm('Limpar ranking?')) {
      localStorage.removeItem('quiz-ranking');
      renderRanking();
    }
  });

  function renderRanking(){
    const list = getRanking();
    rankingList.innerHTML = '';
    if (list.length === 0){
      rankingList.innerHTML = '<li>Nenhum resultado ainda.</li>';
      return;
    }
    list.forEach(entry=>{
      const when = new Date(entry.date);
      const li = document.createElement('li');
      li.textContent = `${entry.name} — ${entry.score} pts — acertos: ${entry.correct || 0} — ${when.toLocaleString()}`;
      rankingList.appendChild(li);
    });
  }

  // ---- play again / back to start
  playAgainBtn.addEventListener('click', ()=>{
    hide(panelResult); show(panelStart);
  });
  backToStartBtn.addEventListener('click', ()=>{
    hide(panelResult); hide(panelQuiz); hide(panelRanking); hide(panelEditor);
    show(panelStart);
  });

  // ---- helper open ranking externally
  function openRankingPanel(){ hide(panelStart); hide(panelQuiz); hide(panelResult); hide(panelEditor); show(panelRanking); renderRanking(); }

  // ---- initial UI
  hide(panelQuiz); hide(panelResult); hide(panelEditor); hide(panelRanking);
  timeLabel.textContent = timePerQuestionEl.value + 's';

})();
