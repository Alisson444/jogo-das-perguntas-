/* script.js
   Jogo de quiz com:
   - perguntas em array (conhecimentos gerais)
   - temporizador por pergunta
   - pontuação baseada em rapidez
   - ranking localStorage (top 10)
*/

(() => {
  // ELEMENTOS
  const startScreen = document.getElementById('start-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const resultScreen = document.getElementById('result-screen');
  const rankingScreen = document.getElementById('ranking-screen');

  const startBtn = document.getElementById('startBtn');
  const numQuestionsEl = document.getElementById('numQuestions');
  const timePerQuestionEl = document.getElementById('timePerQuestion');
  const timeLabel = document.getElementById('timeLabel');
  const shuffleQuestionsEl = document.getElementById('shuffleQuestions');

  const questionText = document.getElementById('questionText');
  const choicesEl = document.getElementById('choices');
  const currentIndexEl = document.getElementById('currentIndex');
  const totalQuestionsEl = document.getElementById('totalQuestions');
  const scoreEl = document.getElementById('score');

  const timerFill = document.getElementById('timerFill');
  const timeLeftEl = document.getElementById('timeLeft');

  const finalScoreEl = document.getElementById('finalScore');
  const playerNameInput = document.getElementById('playerName');
  const saveScoreBtn = document.getElementById('saveScoreBtn');
  const retryBtn = document.getElementById('retryBtn');
  const viewRankingBtn = document.getElementById('viewRankingBtn');

  const rankingList = document.getElementById('rankingList');
  const backToStartBtn = document.getElementById('backToStartBtn');
  const clearRankingBtn = document.getElementById('clearRankingBtn');

  // CONFIG
  let questionsPool = []; // preenchido abaixo
  let currentQuiz = [];
  let currentIndex = 0;
  let totalQuestions = 10;
  let timePerQuestion = 20;
  let timerInterval = null;
  let timeLeft = 0;
  let score = 0;
  let allowAnswer = true;

  // ====== Perguntas (Conhecimentos gerais) ======
  // Cada item: { q: "Pergunta", choices: [...], a: indexCorrect }
  // Você pode editar/adicionar perguntas aqui.
  questionsPool = [
    { q: "Qual é a capital do Brasil?", choices: ["São Paulo","Brasília","Rio de Janeiro","Salvador"], a: 1 },
    { q: "Qual planeta é conhecido como Planeta Vermelho?", choices: ["Vênus","Marte","Júpiter","Mercúrio"], a: 1 },
    { q: "Quem pintou a Mona Lisa?", choices: ["Michelangelo","Pablo Picasso","Leonardo da Vinci","Van Gogh"], a: 2 },
    { q: "Qual o maior oceano do planeta?", choices: ["Atlântico","Índico","Ártico","Pacífico"], a: 3 },
    { q: "Em que ano o homem pisou na Lua pela primeira vez?", choices: ["1959","1969","1979","1989"], a: 1 },
    { q: "Qual a unidade básica da vida?", choices: ["Órgão","Célula","Molécula","Sistema"], a: 1 },
    { q: "Quem escreveu 'Dom Casmurro'?", choices: ["Machado de Assis","Jorge Amado","Clarice Lispector","Paulo Coelho"], a: 0 },
    { q: "Qual é a língua mais falada no mundo (número de falantes nativos)?", choices: ["Inglês","Mandarim","Espanhol","Hindi"], a: 1 },
    { q: "Qual metal é líquido à temperatura ambiente?", choices: ["Ferro","Prata","Mercúrio","Ouro"], a: 2 },
    { q: "Qual é o símbolo químico do Oxigênio?", choices: ["O","Ox","Og","Oxg"], a: 0 },
    { q: "Qual país tem a maior população do mundo (2025)?", choices: ["Estados Unidos","Índia","China","Indonésia"], a: 2 },
    { q: "Quem compôs 'Fur Elise'?", choices: ["Mozart","Bach","Beethoven","Chopin"], a: 2 },
    { q: "Qual é a capital da França?", choices: ["Lyon","Marseille","Paris","Bordeaux"], a: 2 },
    { q: "O que significa 'HTTP' na web?", choices: ["HyperText Transfer Protocol","Home Transfer Text Protocol","Hyperlink Text Transfer Program","Hyper Transfer Text Protocol"], a: 0 },
    { q: "Qual esportista tem mais títulos de Grand Slam (simples) na história (masculino)?", choices: ["Roger Federer","Novak Djokovic","Rafael Nadal","Pete Sampras"], a: 1 },
    { q: "Qual gás é essencial para a respiração humana?", choices: ["Dióxido de carbono","Nitrogênio","Oxigênio","Helio"], a: 2 },
    { q: "Qual invento é atribuído a Alexander Graham Bell?", choices: ["Lâmpada","Telefone","Automóvel","Avião"], a: 1 },
    { q: "Quantos segundos há em uma hora?", choices: ["3600","600","1800","7200"], a: 0 },
    { q: "Em computação, o que significa 'RAM'?", choices: ["Readily Accessible Memory","Random Access Memory","Read Access Module","Remote Access Memory"], a: 1 },
    { q: "Qual continente tem o maior número de países?", choices: ["África","Ásia","Europa","América"], a: 0 },
    // você pode adicionar mais perguntas aqui
  ];

  // ===== util =====
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // ===== UI helpers =====
  function show(el) { el.classList.remove('hidden'); }
  function hide(el) { el.classList.add('hidden'); }

  // Atualiza label do slider
  timePerQuestionEl.addEventListener('input', () => {
    timeLabel.textContent = timePerQuestionEl.value + 's';
  });

  // Start quiz
  startBtn.addEventListener('click', () => {
    totalQuestions = parseInt(numQuestionsEl.value, 10);
    timePerQuestion = parseInt(timePerQuestionEl.value, 10);
    const shuffleOn = shuffleQuestionsEl.checked;

    // preparar perguntas
    currentQuiz = questionsPool.slice(); // copia
    if (shuffleOn) shuffle(currentQuiz);
    currentQuiz = currentQuiz.slice(0, totalQuestions);

    // reset
    currentIndex = 0;
    score = 0;
    scoreEl.textContent = score;
    totalQuestionsEl.textContent = totalQuestions;

    hide(startScreen);
    hide(resultScreen);
    hide(rankingScreen);
    show(quizScreen);

    showQuestion();
  });

  function showQuestion() {
    allowAnswer = true;
    const item = currentQuiz[currentIndex];
    currentIndexEl.textContent = currentIndex + 1;
    questionText.textContent = item.q;

    // montar escolhas
    choicesEl.innerHTML = '';
    item.choices.forEach((c, idx) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerText = c;
      btn.dataset.index = idx;
      btn.addEventListener('click', handleChoice);
      choicesEl.appendChild(btn);
    });

    // timer
    startTimer(timePerQuestion);
  }

  function startTimer(total) {
    clearInterval(timerInterval);
    timeLeft = total;
    updateTimerUI();
    const start = Date.now();

    timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      timeLeft = Math.max(0, total - elapsed);
      updateTimerUI();

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        // marcar como sem resposta (erro)
        lockChoices(null);
        setTimeout(nextOrFinish, 900);
      }
    }, 200); // atualização mais suave
  }

  function updateTimerUI() {
    const percent = (timeLeft / timePerQuestion) * 100;
    timerFill.style.width = percent + '%';
    timeLeftEl.textContent = timeLeft;
  }

  function handleChoice(e) {
    if (!allowAnswer) return;
    allowAnswer = false;
    clearInterval(timerInterval);

    const chosen = parseInt(e.currentTarget.dataset.index, 10);
    lockChoices(chosen);
    setTimeout(nextOrFinish, 900);
  }

  function lockChoices(chosenIndex) {
    const item = currentQuiz[currentIndex];
    const buttons = Array.from(choicesEl.querySelectorAll('.choice-btn'));

    buttons.forEach(btn => {
      btn.classList.add('disabled');
      const idx = parseInt(btn.dataset.index, 10);
      if (idx === item.a) {
        btn.classList.add('correct');
      }
      if (chosenIndex !== null && idx === chosenIndex && idx !== item.a) {
        btn.classList.add('wrong');
      }
    });

    // pontuação: se acertou, soma pontos com bônus de rapidez
    if (chosenIndex === item.a) {
      // Fórmula simples: base 200 + bônus proporcional ao tempo restante (max 800) => total up to 1000
      const bonus = Math.round(800 * (timeLeft / timePerQuestion));
      const gained = 200 + bonus;
      score += gained;
      scoreEl.textContent = score;
    }
  }

  function nextOrFinish() {
    currentIndex++;
    if (currentIndex >= totalQuestions) {
      finishQuiz();
    } else {
      showQuestion();
    }
  }

  function finishQuiz() {
    clearInterval(timerInterval);
    hide(quizScreen);
    show(resultScreen);
    finalScoreEl.textContent = score;
    playerNameInput.value = '';
  }

  // ranking (localStorage)
  function getRanking() {
    const raw = localStorage.getItem('quiz-ranking');
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  function saveRanking(list) {
    localStorage.setItem('quiz-ranking', JSON.stringify(list));
  }

  saveScoreBtn.addEventListener('click', () => {
    const name = (playerNameInput.value || 'Anônimo').trim();
    const list = getRanking();
    list.push({ name, score, date: new Date().toISOString() });
    // ordenar desc e pegar top 10
    list.sort((a,b) => b.score - a.score);
    const top = list.slice(0, 10);
    saveRanking(top);
    showRankingScreen();
  });

  retryBtn.addEventListener('click', () => {
    // voltar para início (mantém configurações)
    hide(resultScreen);
    show(startScreen);
  });

  viewRankingBtn.addEventListener('click', showRankingScreen);

  function showRankingScreen() {
    hide(startScreen);
    hide(quizScreen);
    hide(resultScreen);
    show(rankingScreen);
    renderRanking();
  }

  backToStartBtn.addEventListener('click', () => {
    hide(rankingScreen);
    show(startScreen);
  });

  clearRankingBtn.addEventListener('click', () => {
    if (confirm('Limpar todo o ranking?')) {
      localStorage.removeItem('quiz-ranking');
      renderRanking();
    }
  });

  function renderRanking() {
    const list = getRanking();
    rankingList.innerHTML = '';
    if (list.length === 0) {
      const li = document.createElement('li');
      li.innerText = 'Nenhum resultado salvo ainda.';
      rankingList.appendChild(li);
      return;
    }

    list.forEach(item => {
      const li = document.createElement('li');
      const when = new Date(item.date);
      li.innerText = `${item.name} — ${item.score} pts (${when.toLocaleString()})`;
      rankingList.appendChild(li);
    });
  }

  // Inicialização: mostrar start screen
  hide(quizScreen);
  hide(resultScreen);
  hide(rankingScreen);
  timeLabel.textContent = timePerQuestionEl.value + 's';

})();
