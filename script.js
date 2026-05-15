// ===== QUIZ DATA =====

const quizData = {
  jungle: {
    title: "🌿 Jungle Adventure",
    color: "#4cd964",
    theme: "jungle",
    questions: [
      {
        question: "What is 5 + 3?",
        options: ["6", "7", "8", "9"],
        correct: "8",
        explanation: "5 + 3 = 8. Great counting! 🐒"
      },
      {
        question: "If you have 10 bananas and eat 2, how many are left?",
        options: ["8", "10", "12", "7"],
        correct: "8",
        explanation: "10 - 2 = 8. You're a math monkey! 🍌"
      },
      {
        question: "7 + 4 = ?",
        options: ["9", "10", "11", "12"],
        correct: "11",
        explanation: "7 + 4 = 11. Excellent! 🌳"
      },
      {
        question: "Count the monkeys: 2 monkeys + 3 monkeys = ?",
        options: ["4", "5", "6", "7"],
        correct: "5",
        explanation: "2 + 3 = 5 monkeys swinging together! 🐵"
      },
      {
        question: "What is 9 - 4?",
        options: ["4", "5", "6", "7"],
        correct: "5",
        explanation: "9 - 4 = 5. Jungle math champion! 🏆"
      }
    ]
  },
  space: {
    title: "🚀 Space Quest",
    color: "#3b82f6",
    theme: "space",
    questions: [
      {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Mercury", "Mars", "Earth"],
        correct: "Mercury",
        explanation: "Mercury is the closest planet to the Sun! ☀️"
      },
      {
        question: "What is the hottest planet in our solar system?",
        options: ["Mercury", "Venus", "Mars", "Jupiter"],
        correct: "Venus",
        explanation: "Venus is the hottest! Its atmosphere traps extreme heat. 🔥"
      },
      {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Venus", "Jupiter", "Mars", "Saturn"],
        correct: "Mars",
        explanation: "Mars appears red because of rusty soil on its surface! 🔴"
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Saturn", "Neptune", "Jupiter", "Uranus"],
        correct: "Jupiter",
        explanation: "Jupiter is HUGE! It's the king of planets! 👑"
      },
      {
        question: "Which planet has beautiful rings?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        correct: "Saturn",
        explanation: "Saturn's rings are made of ice and rock! They're gorgeous! 💫"
      }
    ]
  },
  pirate: {
    title: "🏴‍☠️ Pirate Island",
    color: "#ff9500",
    theme: "pirate",
    questions: [
      {
        question: "A pirate has 3 gold coins. He finds 4 more. How many total?",
        options: ["5", "6", "7", "8"],
        correct: "7",
        explanation: "3 + 4 = 7 gold coins! Treasure found! 💰"
      },
      {
        question: "What is the opposite of 'land'?",
        options: ["Sky", "Sea", "Ship", "Beach"],
        correct: "Sea",
        explanation: "Sea is the opposite of land! Pirates sail the seas! ⛵"
      },
      {
        question: "If a treasure map says 'walk 5 steps north, then 3 steps south', how many steps from start?",
        options: ["8 steps north", "2 steps north", "5 steps south", "3 steps north"],
        correct: "2 steps north",
        explanation: "5 north - 3 south = 2 steps north! Smart pirate! 🗺️"
      },
      {
        question: "A pirate ship has 8 cannons. 3 are broken. How many work?",
        options: ["4", "5", "6", "8"],
        correct: "5",
        explanation: "8 - 3 = 5 working cannons! Your ship is ready! ⚔️"
      },
      {
        question: "What do pirates say instead of 'hello'?",
        options: ["Yo", "Ahoy", "Shiver me timbers", "Matey"],
        correct: "Ahoy",
        explanation: "Ahoy, matey! Classic pirate greeting! 🏴‍☠️"
      }
    ]
  }
};

// ===== QUIZ STATE =====

let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let quizActive = false;
let answered = false;
let feedbackCloseTimer = null;

// Shared AudioContext — created once, reused for every sound effect.
// This avoids leaking a new AudioContext on every answer click.
let _audioCtx = null;
function getAudioContext() {
  if (!_audioCtx || _audioCtx.state === 'closed') {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return _audioCtx;
}

// ===== QUIZ INITIALIZATION =====

function initializeQuiz(world) {
  currentQuiz = quizData[world];
  currentQuestionIndex = 0;
  score = 0;
  quizActive = true;
  answered = false;

  document.getElementById("quizModal").classList.remove("hidden");
  document.getElementById("quizScreen").classList.remove("hidden");
  document.getElementById("resultsScreen").classList.add("hidden");

  updateQuizTheme();
  loadQuestion();
}

function updateQuizTheme() {
  const container = document.querySelector(".quiz-container");
  container.className = "quiz-container";
  container.classList.add(`theme-${currentQuiz.theme}`);
  document.getElementById("quizTitle").textContent = currentQuiz.title;
}

// ===== QUESTION LOADING =====

function loadQuestion() {
  if (currentQuestionIndex >= currentQuiz.questions.length) {
    showResults();
    return;
  }

  const question = currentQuiz.questions[currentQuestionIndex];
  answered = false;

  document.getElementById("questionCounter").textContent =
    `Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}`;
  updateProgressBar();

  document.getElementById("questionText").textContent = question.question;

  const container = document.getElementById("optionsContainer");
  container.innerHTML = "";

  question.options.forEach(option => {
    const optionBtn = document.createElement("button");
    optionBtn.className = "option-btn";
    optionBtn.textContent = option;
    optionBtn.addEventListener("click", () =>
      checkAnswer(option, question.correct, question.explanation)
    );
    container.appendChild(optionBtn);
  });

  document.getElementById("feedbackBox").classList.add("hidden");
  document.getElementById("nextBtn").classList.add("hidden");
}

function updateProgressBar() {
  // Use actual question count — not a hardcoded 5 — so this works for any quiz size.
  const total = currentQuiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / total) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}

// ===== ANSWER CHECKING =====

function checkAnswer(selected, correct, explanation) {
  if (answered) return;
  answered = true;

  const isCorrect = selected === correct;

  if (isCorrect) {
    score++;
    playCorrectSound();
    showCorrectFeedback(explanation);
  } else {
    playWrongSound();
    showIncorrectFeedback(selected, correct, explanation);
  }

  // Score display with pulse restart
  const scoreDisplay = document.getElementById("scoreDisplay");
  scoreDisplay.textContent = score;
  scoreDisplay.classList.remove("pulse");
  // Force reflow so the animation restarts cleanly (intentional trick).
  void scoreDisplay.offsetWidth;
  scoreDisplay.classList.add("pulse");

  // Highlight answer buttons
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(btn => {
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    } else if (btn.textContent === selected && !isCorrect) {
      btn.classList.add("incorrect");
    }
    btn.disabled = true;
  });

  document.getElementById("feedbackBox").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("nextBtn").classList.remove("hidden");
  }, 500);
}

function showCorrectFeedback(explanation) {
  const feedbackBox = document.getElementById("feedbackBox");
  const content = document.getElementById("feedbackContent");
  const isJungleQuiz = currentQuiz && currentQuiz.theme === "jungle";

  // Always clear any pending auto-dismiss timer before setting a new state.
  clearFeedbackTimer();

  feedbackBox.className = isJungleQuiz
    ? "feedback-box feedback-correct feedback-jungle-popup"
    : "feedback-box feedback-correct";

  content.innerHTML = isJungleQuiz
    ? `<div class="feedback-popup-image-wrap">
         <img class="feedback-popup-image"
              src="download__2_-removebg-preview.png"
              alt="Happy jungle monkey celebrating a correct answer">
       </div>`
    : `<div class="feedback-icon">✅</div>
       <div class="feedback-title">Correct!</div>
       <div class="feedback-text">${explanation}</div>`;

  if (isJungleQuiz) {
    feedbackCloseTimer = setTimeout(() => {
      feedbackBox.classList.add("hidden");
      feedbackCloseTimer = null;
    }, 1000);
  }
}

function showIncorrectFeedback(selected, correct, explanation) {
  const feedbackBox = document.getElementById("feedbackBox");
  const content = document.getElementById("feedbackContent");

  feedbackBox.className = "feedback-box feedback-incorrect";
  content.innerHTML = `
    <div class="feedback-icon">❌</div>
    <div class="feedback-title">Not quite!</div>
    <div class="feedback-text">The correct answer is: <strong>${correct}</strong></div>
    <div class="feedback-text">${explanation}</div>`;
}

function clearFeedbackTimer() {
  if (feedbackCloseTimer !== null) {
    clearTimeout(feedbackCloseTimer);
    feedbackCloseTimer = null;
  }
}

// ===== NAVIGATION =====

function nextQuestion() {
  // Cancel any jungle auto-dismiss timer so it doesn't fire on the new question's feedback.
  clearFeedbackTimer();
  currentQuestionIndex++;
  loadQuestion();
}

function showResults() {
  quizActive = false;

  document.getElementById("quizScreen").classList.add("hidden");
  document.getElementById("resultsScreen").classList.remove("hidden");

  const total = currentQuiz.questions.length;
  const percentage = (score / total) * 100;
  let emoji, title, message;

  if (score === total) {
    emoji = "🏆"; title = "PERFECT SCORE! 🌟";
    message = "You're a quiz champion! You got every single one right! You're incredible!";
    createConfetti();
  } else if (percentage >= 80) {
    emoji = "🌟"; title = "Excellent Work!";
    message = `You got ${score} out of ${total}! That's amazing! Keep practising!`;
  } else if (percentage >= 60) {
    emoji = "😊"; title = "Great Job!";
    message = `You got ${score} out of ${total}! Good effort! Play again to improve!`;
  } else if (percentage >= 40) {
    emoji = "💪"; title = "Good Try!";
    message = `You got ${score} out of ${total}. Keep learning and try again!`;
  } else {
    emoji = "📚"; title = "Learning Adventure!";
    message = "You're just getting started! Try again to improve!";
  }

  document.getElementById("resultsEmoji").textContent = emoji;
  document.getElementById("resultsTitle").textContent = title;
  document.getElementById("finalScore").textContent = `You got ${score} out of ${total} correct!`;
  document.getElementById("resultsMessage").textContent = message;
}

// ===== QUIZ CLOSE AND RESET =====

function closeQuiz() {
  clearFeedbackTimer();
  document.getElementById("quizModal").classList.add("hidden");
  resetQuiz();
}

function resetQuiz() {
  currentQuiz = null;
  currentQuestionIndex = 0;
  score = 0;
  quizActive = false;
  answered = false;
}

function playAgain() {
  if (!currentQuiz) return;
  const theme = currentQuiz.theme; // capture before initializeQuiz resets state
  initializeQuiz(theme);
}

function backToWorlds() {
  closeQuiz();
}

// ===== SOUND EFFECTS =====

function playCorrectSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = 800;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    // Audio blocked (e.g. browser policy) — silently ignore.
  }
}

function playWrongSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.3);
    osc.type = "sine";
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    // Audio blocked — silently ignore.
  }
}

// ===== CONFETTI ANIMATION =====

function createConfetti() {
  const container = document.getElementById("confetti-container");
  container.innerHTML = "";

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.textContent = ["🎉", "⭐", "🎊", "🏆", "🌟"][Math.floor(Math.random() * 5)];
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.animationDelay = Math.random() * 0.5 + "s";
    container.appendChild(confetti);

    // Guard: only remove the node if it's still in the DOM
    // (the results screen may have been closed before the 3 s timer fires).
    setTimeout(() => {
      if (confetti.parentNode) confetti.remove();
    }, 3000);
  }
}

// ===== EVENT LISTENERS =====

document.addEventListener("DOMContentLoaded", function () {
  const quizModal = document.getElementById("quizModal");
  if (!quizModal) return;

  const nextBtn        = document.getElementById("nextBtn");
  const closeQuizBtn   = document.getElementById("closeQuizBtn");
  const playAgainBtn   = document.getElementById("playAgainBtn");
  const backToWorldsBtn = document.getElementById("backToWorldsBtn");

  if (nextBtn)         nextBtn.addEventListener("click", nextQuestion);
  if (closeQuizBtn)    closeQuizBtn.addEventListener("click", closeQuiz);
  if (playAgainBtn)    playAgainBtn.addEventListener("click", playAgain);
  if (backToWorldsBtn) backToWorldsBtn.addEventListener("click", backToWorlds);

  console.log("✨ Quiz system initialized!");
});