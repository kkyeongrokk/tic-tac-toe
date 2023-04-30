/*----- constants -----*/
const COLORS = {
  0: "black",
  1: "tomato",
  "-1": "pink",
};

/*----- state variables -----*/
let board; // array of 7 column arrays
let turn; // 1 or -1
let winner; // null = no winner; 1 or -1 = winner; 'T' = Tie game

/*----- cached elements  -----*/
const messageEl = document.querySelector("h1");
const resetGameBtn = document.querySelector("button");
const boardEls = [...document.querySelectorAll("#board > div")];

/*----- event listeners -----*/
document.getElementById("board").addEventListener("click", handleClick);
resetGameBtn.addEventListener("click, init");

/*----- functions -----*/
