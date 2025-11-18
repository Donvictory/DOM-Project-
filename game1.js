document.title = "DOM Project";

// =======================
// GLOBAL VARIABLES & SETUP
// =======================
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
let isAutoPlaying = false;
let intervalId;

// New variable to store the move during the countdown
let playerMoveStorage = null; 
let countdownValue = 3; 

// --- ELEMENT REFERENCES ---
const countdownDisplay = document.getElementById('countdown-display');
// IMPORTANT: This ID MUST match the container holding your R/P/S buttons in the HTML
const movesContainer = document.getElementById('moves-container'); 
const autoplayButton = document.querySelector(".Auto-play-btn");
const resetButton = document.querySelector(".reset-btn");

// Initial score display update (Must be defined and called once)
updateScoreDisplay(); 

// =======================
// CORE FUNCTIONS
// =======================

function computerMove() {
  let randomNumber = Math.random();
  let computerGuess = "";
  if (randomNumber < 1 / 3) {
    computerGuess = "rock";
  } else if (randomNumber < 2 / 3) {
    computerGuess = "paper";
  } else {
    computerGuess = "scissors";
  }
  return computerGuess;
}

// 🚨 Main game logic function (renamed from 'playGame')
function playGameLogic(playerMove) {
  const computerGuess = computerMove();  
  let result = "";

  if (playerMove === "paper") {
    if (computerGuess === "rock") {
      result = "You win!";
    } else if (computerGuess === "paper") {
      result = "Tie!";
    } else if (computerGuess === "scissors") {
      result = "You lose!";
    }
  } else if (playerMove === "rock") {
    if (computerGuess === "rock") {
      result = "Tie!";
    } else if (computerGuess === "paper") {
      result = "You lose!";
    } else if (computerGuess === "scissors") {
      result = "You win!";
    }
  } else if (playerMove === "scissors") {
    if (computerGuess === "rock") {
      result = "You lose!";
    } else if (computerGuess === "paper") {
      result = "You win!";
    } else if (computerGuess === "scissors") {
      result = "Tie!";
    }
  }

  // Update score
  if (result === "You win!") {
    score.wins += 1;
  } else if (result === "You lose!") {
    score.losses += 1;
  } else if (result === "Tie!") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateScoreDisplay(result, playerMove, computerGuess);
}

function updateScoreDisplay(result = '', playerMove = '', computerGuess = '') {
    document.querySelector(".js-score").innerHTML = `${result}`;
    document.querySelector(
      ".js-score1"
    ).innerHTML = `You: <img src="${playerMove}-emoji.png" alt=""> - Computer: <img src="${computerGuess}-emoji.png" alt="">`;
    document.querySelector(
      ".js-score2"
    ).innerHTML = ` Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// =======================
// COUNTDOWN & MOVE HANDLERS
// =======================

// 🚨 NEW function to store the move and start the timer (called by R/P/S buttons)
function handlePlayerMove(move) {
    if (isAutoPlaying) return; 

    // 1. Store the selected move
    playerMoveStorage = move;
    
    // 2. Hide the move buttons container
    if (movesContainer) {
        movesContainer.style.display = 'none';
    }

    // 3. Start the countdown
    startCountdownInterval();
}

function startCountdownInterval() {
    countdownValue = 3;
    
    // Show the countdown display with styling
    countdownDisplay.textContent = countdownValue;
    countdownDisplay.style.display = 'block';
    countdownDisplay.style.fontSize = '48px';
    countdownDisplay.style.fontWeight = 'bold';
    countdownDisplay.style.textAlign = 'center';
    countdownDisplay.style.margin = '20px auto';

    const currentIntervalId = setInterval(() => {
        countdownValue--;
        
        if (countdownValue >= 0) {
            countdownDisplay.textContent = countdownValue === 0 ? 'GO!' : countdownValue;
        }

        if (countdownValue < 0) { 
            clearInterval(currentIntervalId); 
            countdownDisplay.style.display = 'none'; 

            // 🚨 Execute Game Logic
            if (playerMoveStorage) {
                playGameLogic(playerMoveStorage);
                playerMoveStorage = null; 
            }
            
            // Re-show the move buttons container for the next round
            if (movesContainer) {
                movesContainer.style.display = 'block';
            }
        }
    }, 1000); 
}

// =======================
// EVENT LISTENERS
// =======================

// 🚨 Updated listeners to use the new handler
document.getElementById("rock").addEventListener("click", () => handlePlayerMove("rock"));
document.getElementById("paper").addEventListener("click", () => handlePlayerMove("paper"));
document.getElementById("scissors").addEventListener("click", () => handlePlayerMove("scissors"));

// --- Autoplay Logic ---
autoplayButton.addEventListener("click", autoplay);

function autoplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = computerMove();
      // Autoplay can call the logic directly since it bypasses the manual countdown
      playGameLogic(playerMove); 
      autoplayButton.textContent = "Stop Playing";
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoplayButton.textContent = "Auto Play";
  }
}

// --- Reset Button Logic ---
resetButton.addEventListener("click", () => {
  let div = document.querySelector(".div");
  div.classList.add("reset-div");
  
  let Yes = document.createElement("button");
  Yes.textContent = `Yes`;
  Yes.classList.add("yes-btn");
  let No = document.createElement("button");
  No.textContent = `No`;
  No.classList.add("no-btn");

  div.textContent = `Are you sure you want to reset the score?  `;
  div.appendChild(Yes);
  div.appendChild(No);

  Yes.addEventListener("click", () => {
    // Reset score data and storage
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.setItem("score", JSON.stringify(score));
    updateScoreDisplay(); // Reset display fields
    
    div.textContent = "";
    div.classList.remove("reset-div");
    
    if (isAutoPlaying) {
      clearInterval(intervalId);
      isAutoPlaying = false;
      autoplayButton.textContent = "Auto Play";
    }
  });

  No.addEventListener("click", () => {
    div.textContent = "";
    div.classList.remove("reset-div");
  });
});

// --- Keyboard Logic ---
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    handlePlayerMove("rock");
  } else if (event.key === "p") {
    handlePlayerMove("paper");
  } else if (event.key === "s") {
    handlePlayerMove("scissors");
  } else if (event.key === "enter") {
    resetButton.click(); // Programmatically click the reset button to start the confirmation flow
  } else if (event.key === "a") {
    autoplay();
  }
});