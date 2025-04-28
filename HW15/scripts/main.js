// Setup
let level = 1;
let totalCards = 4;
let matchedPairs = 0;
let boardLocked = false;
let actualImages = [];
let matchedCards = [];
let confettiCanvas, confettiCtx, confettiParticles = [], confettiInterval;
let timerInterval, timeLeft;

const availableImages = [
  "images/cat.webp", "images/wolf.webp", "images/dog.webp",
  "images/fox.webp", "images/tiger.webp", "images/bear.webp",
  "images/horse.webp", "images/owl.webp", "images/rabbit.webp", 
  "images/snake.webp", "images/ferret.webp","images/hedgehog.webp",
];

// Game Functions
function createRandomImageArray() {
  actualImages = [];
  const neededPairs = totalCards / 2;

  let shuffledAvailable = [...availableImages];
  shuffle(shuffledAvailable);

  let selectedImages = shuffledAvailable.slice(0, neededPairs);

  for (let img of selectedImages) {
    actualImages.push(img, img);
  }

  shuffle(actualImages);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function setupBoard() {
  boardLocked = true;

  clearInterval(timerInterval);
  removeTimer();

  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";

  createRandomImageArray();

  for (let i = 0; i < totalCards; i++) {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("onclick", `flipImage(${i})`);

    card.innerHTML = `
      <div class="card-inner hidden slide-in delay-${i}">
        <div class="card-front">
          <img src="images/back.jpg">
        </div>
        <div class="card-back">
          <img id="image${i + 1}-back">
        </div>
      </div>
    `;

    gameBoard.appendChild(card);
  }

  printBlanks();

  const maxDelay = 0.5; 
  const animationDuration = 0.3; 
  const totalAnimationTime = (maxDelay + animationDuration) * 1000;

  setTimeout(() => {
    document.querySelectorAll('.card-inner').forEach(inner => {
      inner.classList.remove('hidden');
      inner.classList.remove('slide-in');
      for (let j = 0; j < 18; j++) {
        inner.classList.remove(`delay-${j}`);
      }
    });
    boardLocked = false;
    startTimer();
    showStartMessage();
  }, totalAnimationTime);
}

function printBlanks() {
  for (let i = 0; i < totalCards; i++) {
    document.getElementById(`image${i + 1}-back`).src = actualImages[i];
  }
}

function flipImage(index) {
  if (boardLocked) return;

  const card = document.getElementsByClassName('card')[index];
  if (card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  matchedCards.push(index);

  if (matchedCards.length === 2) {
    boardLocked = true;
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const firstIndex = matchedCards[0];
  const secondIndex = matchedCards[1];

  const firstImage = document.getElementById(`image${firstIndex + 1}-back`).src.split('/').pop();
  const secondImage = document.getElementById(`image${secondIndex + 1}-back`).src.split('/').pop();

  const cards = document.getElementsByClassName('card');

  if (firstImage === secondImage) {
    matchedPairs++;

    cards[firstIndex].classList.add('matched');
    cards[secondIndex].classList.add('matched');

    matchedCards = [];
    boardLocked = false;

  } else {
    boardLocked = true;

    setTimeout(() => {
      cards[firstIndex].classList.remove('flipped');
      cards[secondIndex].classList.remove('flipped');

      matchedCards = [];
      boardLocked = false;
    }, 100);
  }

  if (matchedPairs === totalCards / 2) {
    setTimeout(showVictoryAnimation, 500);
  }
}

function showVictoryAnimation() {
  clearInterval(timerInterval);
  removeTimer();
  startConfetti();

  const victory = document.createElement("div");
  victory.id = "victoryMessage";
  victory.innerHTML = ` Level ${level} Complete! `;
  document.body.appendChild(victory);

  setTimeout(() => {
    document.body.removeChild(victory);
    stopConfetti();
    nextLevel();
  }, 3000);
}

function showGameWinScreen() {
  clearInterval(timerInterval);
  removeTimer();
  startConfetti();

  const resetButton = document.getElementById("resetButton");
  if (resetButton) {
    resetButton.innerText = "Play Again";
    resetButton.onclick = restartGame;
    resetButton.classList.add("pulsing");
  }

  let victoryMessage = document.createElement("div");
  victoryMessage.id = "victoryMessage";
  victoryMessage.classList.add("fade-in");
  victoryMessage.innerHTML = ` YOU BEAT THE GAME! `;

  document.body.appendChild(victoryMessage);
  document.getElementById("gameBoard").innerHTML = "";
}

function nextLevel() {
  level++;
  if (level > 8) {
    showGameWinScreen();
    return;
  }
  totalCards += 2;
  matchedPairs = 0;
  matchedCards = [];
  setupBoard();
}

function restartGame() {
  let oldVictory = document.getElementById("victoryMessage");
  if (oldVictory) oldVictory.remove();

  stopConfetti();
  clearInterval(timerInterval);
  removeTimer();

  const resetButton = document.getElementById("resetButton");
  if (resetButton) {
    resetButton.innerText = "Reset Game";
    resetButton.classList.remove("pulsing");
    resetButton.onclick = restartGame;
  }

  level = 1;
  totalCards = 4;
  matchedPairs = 0;
  matchedCards = [];

  setupBoard();
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);

  timeLeft = level <= 3 ? 60 : level <= 6 ? 45 : 35;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleGameOver();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const timer = document.getElementById("timer");
  if (timer) {
    timer.innerHTML = `Time Left: ${timeLeft}s`;
  }
}

function removeTimer() {
  const timer = document.getElementById("timer");
  if (timer) {
    timer.innerHTML = "Time Left: --"; 
  }
}


function handleGameOver() {
  clearInterval(timerInterval);
  removeTimer();

  let oldVictory = document.getElementById("victoryMessage");
  if (oldVictory) oldVictory.remove();

  const resetButton = document.getElementById("resetButton");
  if (resetButton) {
    resetButton.innerText = "Try Again";
    resetButton.onclick = restartGame;
    resetButton.classList.add("pulsing");
  }

  const timeUpMessage = document.createElement("div");
  timeUpMessage.id = "victoryMessage";
  timeUpMessage.classList.add("fade-in");
  timeUpMessage.style.marginTop = "10px";
  timeUpMessage.style.fontSize = "28px";
  timeUpMessage.style.color = "red";
  timeUpMessage.innerHTML = "TIME'S UP!";

  document.body.appendChild(timeUpMessage);

  boardLocked = true;
}

function startConfetti() {
  if (document.getElementById("confettiCanvas")) return;

  confettiCanvas = document.createElement("canvas");
  confettiCanvas.id = "confettiCanvas";
  confettiCanvas.style.position = "fixed";
  confettiCanvas.style.top = "0";
  confettiCanvas.style.left = "0";
  confettiCanvas.style.width = "100%";
  confettiCanvas.style.height = "100%";
  confettiCanvas.style.pointerEvents = "none";
  document.body.appendChild(confettiCanvas);

  confettiCtx = confettiCanvas.getContext("2d");
  confettiParticles = [];

  for (let i = 0; i < 500; i++) {
    confettiParticles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 4 + 2,
      d: Math.random() * 5 + 2,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      tilt: Math.random() * 15 - 7
    });
  }

  confettiInterval = setInterval(drawConfetti, 20);
}

function drawConfetti() {
  confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let p of confettiParticles) {
    confettiCtx.beginPath();
    confettiCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fill();

    p.y += p.d;
    p.x += Math.sin(p.tilt) * 2;
    p.tilt += Math.random() * 0.2 - 0.1;

    if (p.y > window.innerHeight) {
      p.y = -10;
      p.x = Math.random() * window.innerWidth;
    }
  }
}

function stopConfetti() {
  clearInterval(confettiInterval);

  if (confettiCanvas && confettiCanvas.parentNode === document.body) {
    document.body.removeChild(confettiCanvas);
    confettiCanvas = null;
  }
}

function cheatWin() {
  clearInterval(timerInterval);
  removeTimer();

  level = 8;
  totalCards = 18;
  matchedPairs = totalCards / 2;

  showVictoryAnimation();
}
function showStartMessage() {
  const placeholder = document.getElementById("startMessagePlaceholder");

  if (!placeholder) return;

  placeholder.innerHTML = ""; 

  const startMessage = document.createElement("div");
  startMessage.id = "startMessage";
  startMessage.innerText = "GO!";
  startMessage.classList.add("start-message");

  placeholder.appendChild(startMessage);

  setTimeout(() => {
    startMessage.classList.add("visible");
  }, 100);

  setTimeout(() => {
    startMessage.classList.remove("visible");
    setTimeout(() => {
      if (startMessage.parentNode) {
        startMessage.parentNode.removeChild(startMessage);
      }
    }, 500);
  }, 1500);
}
