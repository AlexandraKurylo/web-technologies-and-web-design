"use strict";
/*
ЗАДАЧА:
Створити гру "Склади англійський алфавіт"

*/

const letters = document.querySelectorAll(".boxes__box");
const audioClick = new Audio("audio/Mountain Audio - Menu Click.mp3");
const audioWin = new Audio("audio/win.mp3");
let newLetters;

for (let i = 0; i < letters.length; i++) {
  letters[i].addEventListener("click", function () {
    if (letters[i].previousElementSibling != null) {
      letters[i].previousElementSibling.before(letters[i]);
      audioClick.play();
      newLetters = document.querySelectorAll(".boxes__box");

      console.log(letters);
    } else if (letters[i].nextElementSibling != null) {
      letters[i].nextElementSibling.after(letters[i]);
      audioClick.play();
      newLetters = document.querySelectorAll(".boxes__box");
    }
    if (
      newLetters[0].classList.contains("box_a") &&
      newLetters[1].classList.contains("box_b") &&
      newLetters[2].classList.contains("box_c") &&
      newLetters[3].classList.contains("box_d") &&
      newLetters[4].classList.contains("box_e") &&
      newLetters[5].classList.contains("box_f") &&
      newLetters[6].classList.contains("box_g") &&
      newLetters[7].classList.contains("box_h") &&
      newLetters[8].classList.contains("box_i") &&
      newLetters[9].classList.contains("box_j") &&
      newLetters[10].classList.contains("box_k") &&
      newLetters[11].classList.contains("box_l") &&
      newLetters[12].classList.contains("box_m") &&
      newLetters[13].classList.contains("box_n") &&
      newLetters[14].classList.contains("box_o") &&
      newLetters[15].classList.contains("box_p") &&
      newLetters[16].classList.contains("box_q") &&
      newLetters[17].classList.contains("box_r") &&
      newLetters[18].classList.contains("box_s") &&
      newLetters[19].classList.contains("box_t") &&
      newLetters[20].classList.contains("box_u") &&
      newLetters[21].classList.contains("box_v") &&
      newLetters[22].classList.contains("box_w") &&
      newLetters[23].classList.contains("box_x") &&
      newLetters[24].classList.contains("box_y") &&
      newLetters[25].classList.contains("box_z") 
    ) {
      audioWin.play();
      document.querySelector("body").style.background = "green";
    }
  });
}

//
