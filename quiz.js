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

// ===== QUIZ INITIALIZATION =====

function initializeQuiz(world) {
  currentQuiz = quizData[world];
  currentQuestionIndex = 0;
  score = 0;
  quizActive = true;
  answered = false;

  // Show quiz modal
  document.getElementById("quizModal").classList.remove("hidden");
  document.getElementById("quizScreen").classList.remove("hidden");
  document.getElementById("resultsScreen").classList.add("hidden");

  // Update theme colors
  updateQuizTheme();

  // Load first question
  loadQuestion();
}

function updateQuizTheme() {
  const modal = document.getElementById("quizModal");
  const container = document.querySelector(".quiz-container");

  // Reset classes
  container.className = "quiz-container";

  // Add theme class
  container.classList.add(`theme-${currentQuiz.theme}`);

  // Update title
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

  // Update counter and progress
  document.getElementById("questionCounter").textContent = `Question ${currentQuestionIndex + 1} of 5`;
  updateProgressBar();

  // Update question
  document.getElementById("questionText").textContent = question.question;

  // Load options
  const container = document.getElementById("optionsContainer");
  container.innerHTML = "";

  question.options.forEach((option, index) => {
    const optionBtn = document.createElement("button");
    optionBtn.className = "option-btn";
    optionBtn.textContent = option;
    optionBtn.addEventListener("click", () => checkAnswer(option, question.correct, question.explanation));
    container.appendChild(optionBtn);
  });

  // Hide feedback and next button
  document.getElementById("feedbackBox").classList.add("hidden");
  document.getElementById("nextBtn").classList.add("hidden");
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / 5) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}

// ===== ANSWER CHECKING =====

function checkAnswer(selected, correct, explanation) {
  if (answered) return;

  answered = true;
  const isCorrect = selected === correct;

  // Update score
  if (isCorrect) {
    score++;
    playCorrectSound();
    showCorrectFeedback(explanation);
  } else {
    playWrongSound();
    showIncorrectFeedback(selected, correct, explanation);
  }

  // Update score display
  const scoreDisplay = document.getElementById("scoreDisplay");
  scoreDisplay.textContent = score;
  
  // Add pulse animation to score
  scoreDisplay.classList.remove("pulse");
  void scoreDisplay.offsetWidth; // Trigger reflow to restart animation
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

  // Show feedback
  document.getElementById("feedbackBox").classList.remove("hidden");

  // Show next button after delay or auto-advance
  setTimeout(() => {
    document.getElementById("nextBtn").classList.remove("hidden");
  }, 500);
}

function showCorrectFeedback(explanation) {
  const feedbackBox = document.getElementById("feedbackBox");
  const content = document.getElementById("feedbackContent");
  const isJungleQuiz = currentQuiz && currentQuiz.theme === "jungle";

  if (feedbackCloseTimer) {
    clearTimeout(feedbackCloseTimer);
    feedbackCloseTimer = null;
  }

  feedbackBox.className = isJungleQuiz
    ? "feedback-box feedback-correct feedback-jungle-popup"
    : "feedback-box feedback-correct";

  content.innerHTML = isJungleQuiz
    ? `
      <div class="feedback-popup-image-wrap">
        <img class="feedback-popup-image" src="download__2_-removebg-preview.png" alt="Happy jungle monkey celebrating a correct answer">
      </div>
    `
    : `
      <div class="feedback-icon">✅</div>
      <div class="feedback-title">Correct!</div>
      <div class="feedback-text">${explanation}</div>
    `;

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
    <div class="feedback-text">${explanation}</div>
  `;
}

// ===== NAVIGATION =====

function nextQuestion() {
  currentQuestionIndex++;
  loadQuestion();
}

function showResults() {
  quizActive = false;

  // Hide quiz screen, show results screen
  document.getElementById("quizScreen").classList.add("hidden");
  document.getElementById("resultsScreen").classList.remove("hidden");

  // Calculate performance
  const percentage = (score / 5) * 100;
  let emoji = "🎉";
  let title = "Awesome Job!";
  let message = "";

  if (score === 5) {
    emoji = "🏆";
    title = "PERFECT SCORE! 🌟";
    message = "You're a quiz champion! You got every single one right! You're incredible!";
    createConfetti();
  } else if (score >= 4) {
    emoji = "🌟";
    title = "Excellent Work!";
    message = "You got 4 out of 5! That's amazing! Keep practicing!";
  } else if (score >= 3) {
    emoji = "😊";
    title = "Great Job!";
    message = "You got 3 out of 5! Good effort! Play again to improve!";
  } else if (score >= 2) {
    emoji = "💪";
    title = "Good Try!";
    message = "You got 2 out of 5. Keep learning and try again!";
  } else {
    emoji = "📚";
    title = "Learning Adventure!";
    message = "You're just getting started! Try again to improve!";
  }

  // Update results screen
  document.getElementById("resultsEmoji").textContent = emoji;
  document.getElementById("resultsTitle").textContent = title;
  document.getElementById("finalScore").textContent = `You got ${score} out of 5 correct!`;
  document.getElementById("resultsMessage").textContent = message;
}

// ===== QUIZ CLOSE AND RESET =====

function closeQuiz() {
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
  if (currentQuiz) {
    initializeQuiz(currentQuiz.theme);
  }
}

function backToWorlds() {
  closeQuiz();
}

// ===== SOUND EFFECTS =====

function playCorrectSound() {
  // Using Web Audio API to create a simple "ding" sound
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.frequency.value = 800;
  oscillator.type = "sine";

  gain.gain.setValueAtTime(0.3, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
}

function playWrongSound() {
  // Simple "whoops" sound
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
  oscillator.frequency.linearRampToValueAtTime(200, audioContext.currentTime + 0.3);
  oscillator.type = "sine";

  gain.gain.setValueAtTime(0.2, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
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

    // Remove after animation
    setTimeout(() => confetti.remove(), 3000);
  }
}

// ===== EVENT LISTENERS =====

document.addEventListener("DOMContentLoaded", function() {
  // Only initialize quiz if quiz modal exists on page
  const quizModal = document.getElementById("quizModal");
  
  if (quizModal) {
    // Quiz navigation listeners for modal pages (jungle.html, space.html, pirate.html)
    const nextBtn = document.getElementById("nextBtn");
    const closeQuizBtn = document.getElementById("closeQuizBtn");
    const playAgainBtn = document.getElementById("playAgainBtn");
    const backToWorldsBtn = document.getElementById("backToWorldsBtn");
    
    if (nextBtn) nextBtn.addEventListener("click", nextQuestion);
    if (closeQuizBtn) closeQuizBtn.addEventListener("click", closeQuiz);
    if (playAgainBtn) playAgainBtn.addEventListener("click", playAgain);
    if (backToWorldsBtn) backToWorldsBtn.addEventListener("click", backToWorlds);
  }

  console.log("✨ Quiz system initialized!");
});
