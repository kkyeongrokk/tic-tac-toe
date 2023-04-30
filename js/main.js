/*----- constants -----*/
const COLORS = {
  0: "black",
  1: "tomato",
  "-1": "pink",
};
const TOP_ROW_IDX = 0;
const BOT_ROW_IDX = 2;
const RIGHT_COLUMN_IDX = 2;
const LEFT_COLUMN_IDX = 0;

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
resetGameBtn.addEventListener("click", init);

/*----- functions -----*/
init();

// Initialize all state, then call render()
function init() {
  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  turn = 1;
  winner = null;

  render();
}

function handleClick(evt) {
  const pos = boardEls.indexOf(evt.target);
  let colIdx;
  let rowIdx;

  switch (pos) {
    case 0:
      colIdx = 0;
      rowIdx = 2;
      break;
    case 1:
      colIdx = 1;
      rowIdx = 2;
      break;
    case 2:
      colIdx = 2;
      rowIdx = 2;
      break;
    case 3:
      colIdx = 0;
      rowIdx = 1;
      break;
    case 4:
      colIdx = 1;
      rowIdx = 1;
      break;
    case 5:
      colIdx = 2;
      rowIdx = 1;
      break;
    case 6:
      colIdx = 0;
      rowIdx = 0;
      break;
    case 7:
      colIdx = 1;
      rowIdx = 0;
      break;
    case 8:
      colIdx = 2;
      rowIdx = 0;
      break;
  }

  if (colIdx === -1 || rowIdx === -1 || board[colIdx][rowIdx] !== 0) return;

  board[colIdx][rowIdx] = turn;

  turn *= -1;
  winner = getWinner(colIdx, rowIdx);
  console.log(winner);

  render();
}

function getWinner(colIdx, rowIdx) {
  return (
    checkVerticalWin(colIdx, rowIdx) ||
    checkHorizontalWin(colIdx, rowIdx) ||
    checkDiagonalNESW(colIdx, rowIdx) ||
    checkDiagonalNWSE(colIdx, rowIdx)
  );
}

function checkDiagonalNWSE(colIdx, rowIdx) {
  if (board[1][1] === 0) return null;
  return board[0][0] === board[1][1] && board[1][1] === board[2][2]
    ? board[colIdx][rowIdx]
    : null;
}

function checkDiagonalNESW(colIdx, rowIdx) {
  if (board[1][1] === 0) return null;
  return board[0][2] === board[1][1] && board[1][1] === board[2][0]
    ? board[colIdx][rowIdx]
    : null;
}

function checkHorizontalWin(colIdx, rowIdx) {
  return countAdjacent(RIGHT_COLUMN_IDX, rowIdx, -1, 0) === 2
    ? board[colIdx][rowIdx]
    : null;
}

function checkVerticalWin(colIdx, rowIdx) {
  return countAdjacent(colIdx, BOT_ROW_IDX, 0, -1) === 2
    ? board[colIdx][rowIdx]
    : null;
}

function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
  const player = board[colIdx][rowIdx];
  let count = 0;
  colIdx += colOffset;
  rowIdx += rowOffset;

  while (
    board[colIdx] !== undefined &&
    board[colIdx][rowIdx] !== undefined &&
    board[colIdx][rowIdx] === player
  ) {
    count++;
    colIdx += colOffset;
    rowIdx += rowOffset;
  }

  return count;
}

function render() {
  renderBoard();
  renderMessage();
  renderControls();
}

function renderBoard() {
  let count = 0;

  board.forEach(function (colArr, colIdx) {
    colArr.forEach(function (cellVal, rowIdx) {
      if (colArr[rowIdx] === 0) count++;
      const cellId = `c${colIdx}r${rowIdx}`;
      const cellEl = document.getElementById(cellId);
      cellEl.style.backgroundColor = COLORS[cellVal];
    });
  });

  if (count === 0) winner = "T";
}

function renderMessage() {
  if (winner === "T") {
    messageEl.innerText = "It's a Tie";
  } else if (winner) {
    messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[
      winner
    ].toUpperCase()}</span> Wins!!`;
  } else {
    messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[
      turn
    ].toUpperCase()}</span>'s turn!`;
  }
}

function renderControls() {
  resetGameBtn.style.visibility = winner ? "visible" : "hidden";
}
