// The gameboard represented as a 2D array
const gameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// The current player
let currentPlayer = "X";

// Function to render the contents of the gameboard to the webpage
function render() {
  let html = "";

  for (let row = 0; row < gameboard.length; row++) {
    html += "<tr>";

    for (let col = 0; col < gameboard[row].length; col++) {
      html += `<td id="${row}-${col}" onclick="markSpot(${row}, ${col})">`;
      html += gameboard[row][col] || "";
      html += "</td>";
    }

    html += "</tr>";
  }

  document.getElementById("gameboard").innerHTML = html;
}

// Function to allow players to add marks to a specific spot on the gameboard
function markSpot(row, col) {
  if (gameboard[row][col]) {
    return;
  }

  gameboard[row][col] = currentPlayer;

  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  console.log(checkForEndOfGame(gameboard));

  render();
}

function checkForEndOfGame(gameboard) {
  // Check for a row of 3 matching marks
  for (let i = 0; i < gameboard.length; i++) {
    let row = gameboard[i];
    if (
      row[0] === row[1] &&
      row[1] === row[2] &&
      row[0] !== "" &&
      row[0] !== null
    ) {
      return `Player ${row[0]} won!`;
    }
  }

  // Check for a column of 3 matching marks
  for (let i = 0; i < gameboard.length; i++) {
    if (
      gameboard[0][i] === gameboard[1][i] &&
      gameboard[1][i] === gameboard[2][i] &&
      gameboard[0][i] !== "" &&
      gameboard[0][i] !== null
    ) {
      return `Player ${gameboard[0][i]} won!`;
    }
  }

  // Check for a diagonal of 3 matching marks
  if (
    gameboard[0][0] === gameboard[1][1] &&
    gameboard[1][1] === gameboard[2][2] &&
    gameboard[0][0] !== "" &&
    gameboard[0][0] !== null
  ) {
    return `Player ${gameboard[0][0]} won!`;
  }
  if (
    gameboard[0][2] === gameboard[1][1] &&
    gameboard[1][1] === gameboard[2][0] &&
    gameboard[0][2] !== "" &&
    gameboard[0][2] !== null
  ) {
    return `Player ${gameboard[0][2]} won!`;
  }

  // Check for a tie
  let gameboardIsFull = true;
  for (let i = 0; i < gameboard.length; i++) {
    for (let j = 0; j < gameboard[i].length; j++) {
      if (gameboard[i][j] === "" || gameboard[i][j] === null) {
        gameboardIsFull = false;
      }
    }
  }
  if (gameboardIsFull) {
    return "The game is a tie!";
  }

  // The game is not over yet
  return false;
}

render();
