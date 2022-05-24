let randomNum = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guessesNum");
const lastResult = document.querySelector(".lastResult");
const loworHigh = document.querySelector(".loworHigh");

const guessInput = document.getElementById("numberVal");
const submitBtn = document.querySelector(".submitGuess");
const congrats = document.getElementById("congrats");
const attempt = document.querySelector(".leftAttempt");
const resultCon = document.querySelector(".result");

let guessCount = 1;
let resetBtn;
let leftAttempt = 10;

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  checkGuessNum();
});

function checkGuessNum() {
  const userGuess = Number(guessInput.value);
  guesses.style.backgroundColor = "rgba(25, 25, 112, 0.521)";
  attempt.style.backgroundColor = "rgba(25, 25, 112, 0.521)";
  loworHigh.style.backgroundColor = "rgba(25, 25, 112, 0.521)";

  if (guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
  }
  guesses.textContent += userGuess + " ";

  if (userGuess === randomNum) {
    congrats.play();
    lastResult.textContent = "Congratulation!!! You Win!";
    lastResult.style.backgroundColor = "green";
    loworHigh.textContent = "values are equal";
    loworHigh.style.backgroundColor = "rgba(25, 25, 112, 0.521)";
    gameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = "Game Over !!!";
    loworHigh.style.display = "none";
    loworHigh.textContent = "";
    leftAttempt = 0;
    attempt.textContent = "left attempt: " + leftAttempt;
    gameOver();
  } else {
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "rgb(230, 2, 2)";
    if (userGuess < randomNum) {
      loworHigh.textContent = "Last guess was too LOW!";
    } else if (userGuess > randomNum) {
      loworHigh.textContent = "Last guess was too HIGH!";
    }
  }

  guessCount++;

  guessInput.value = "";
  guessInput.focus();

  if (leftAttempt != 0) {
    leftAttempt = leftAttempt - 1;
    attempt.textContent = "left attempt: " + leftAttempt;
  }
}

function gameOver() {
  guessInput.disabled = true;
  submitBtn.disabled = true;
  resetBtn = document.createElement("button");
  resetBtn.textContent = "Start New Game";
  resetBtn.classList.add("reset-btn");
  resultCon.append(resetBtn);
  resetBtn.addEventListener("click", resetGame);
}

function resetGame() {
  guessCount = 1;

  const resultPara = document.querySelectorAll(".result p");
  for (const para of resultPara) {
    para.textContent = "";
    para.style.backgroundColor = "transparent";
  }

  resetBtn.parentNode.removeChild(resetBtn);

  guessInput.disabled = false;
  submitBtn.disabled = false;
  guessInput.value = "";
  guessInput.focus();
  leftAttempt = 10;
  loworHigh.style.display = "block";

  // randomNum = Math.floor(Math.random() * 100) + 1;
  console.log(randomNum);
}
