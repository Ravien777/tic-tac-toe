"use strict";

function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const dropMarker = (cell, marker) => {
    let splitCoordinates = cell.split("-");
    let r = splitCoordinates[0],
      c = splitCoordinates[1];

    board[r][c].addmarker(marker);
  };

  const checkForEndGame = () => {
    for (let i = 0; i < board.length; i++) {
      let row = board[i];
      if (
        row[0].getValue() === row[1].getValue() &&
        row[1].getValue() === row[2].getValue() &&
        row[0].getValue() !== "" &&
        row[0].getValue() !== null
      ) {
        return 1;
      }
    }

    // Check for a column of 3 matching marks
    for (let i = 0; i < board.length; i++) {
      if (
        board[0][i].getValue() === board[1][i].getValue() &&
        board[1][i].getValue() === board[2][i].getValue() &&
        board[0][i].getValue() !== "" &&
        board[0][i].getValue() !== null
      ) {
        return 1;
      }
    }

    // Check for a diagonal of 3 matching marks
    if (
      board[0][0].getValue() === board[1][1].getValue() &&
      board[1][1].getValue() === board[2][2].getValue() &&
      board[0][0].getValue() !== "" &&
      board[0][0].getValue() !== null
    ) {
      return 1;
    }
    if (
      board[0][2].getValue() === board[1][1].getValue() &&
      board[1][1].getValue() === board[2][0].getValue() &&
      board[0][2].getValue() !== "" &&
      board[0][2].getValue() !== null
    ) {
      return 1;
    }

    let finished = true;
    board.forEach((row) => {
      row.forEach((col) => {
        if (col.getValue() === "" || col.getValue() === null) {
          finished = false;
        }
      });
    });

    if (finished) {
      return 0;
    }
    return -1;
  };

  return { getBoard, dropMarker, checkForEndGame };
}

function Cell() {
  let value = "";

  const addmarker = (marker) => {
    value = marker;
  };

  const getValue = () => value;

  return {
    addmarker,
    getValue,
  };
}

function GameController(playerOne = "Player One", playerTwo = "Player Two") {
  const board = Gameboard();
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const msg = document.createElement("p");

  const players = [
    {
      name: playerOne,
      marker: "X",
    },
    {
      name: playerTwo,
      marker: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const modalOpen = () => {
    modal.classList.add("active");
    overlay.classList.add("active");
  };

  const modalClose = () => {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  };

  modal.appendChild(msg);

  const playRound = (column) => {
    board.dropMarker(column, getActivePlayer().marker);

    if (board.checkForEndGame() === 0) {
      msg.innerText = "It's a draw!";
      modalOpen();
    } else if (board.checkForEndGame() === 1) {
      msg.innerText = getActivePlayer().name + " won!";
      modalOpen();
    } else {
      switchPlayerTurn();
    }
  };

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.getElementById("gameboard");

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    // Render board squares
    board.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.column = `${rowIndex}-${cellIndex}`;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  };

  // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    if (!selectedColumn) return;

    if (e.target.innerText !== "") return;

    game.playRound(selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  // Initial render
  updateScreen();
}

ScreenController();
