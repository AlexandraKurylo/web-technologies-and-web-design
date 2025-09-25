"use strict";

/* 
ЗАДАЧА: 
Створіть гру "Вгадай число".
*/

let secreNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secreNumber);
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(typeof guess);
  // Коли не ввели число
  if (!guess) {
    displayMessage("Ви не ввели число!");
    /// Коли вгадали
  } else if (guess === secreNumber) {
    displayMessage("Ви перемогли!");
    document.querySelector("body").style.background = "green";
    document.querySelector(".number").textContent = guess;
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
    //Коли не вгадали
  } else if (guess !== secreNumber) {
    if (score > 1) {
      if (guess > secreNumber) {
        displayMessage("Число більше загаданого");
        score--;
        document.querySelector(".score").textContent = score;
      } else if (guess < secreNumber) {
        displayMessage("Число менше загаданого");
        score--;
        document.querySelector(".score").textContent = score;
      }
    } else {
      displayMessage("Ви програли!");
      document.querySelector(".score").textContent = 0;
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secreNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage("Почніть вгадувати");
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.background = "black";
});
