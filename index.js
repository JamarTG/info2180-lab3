const squares = document.querySelectorAll("#board div");
const statusSquare = document.getElementById("status");
const resetButton = document.querySelector(".controls .btn");

let initialGameState = {
  currentPlayerLetter: "X",
  gameOver: false,
};

let gameState = { ...initialGameState };

const displayWinnerMessage = () => {
  const { currentPlayerLetter } = gameState;
  statusSquare.classList.add("you-won");
  statusSquare.textContent = `Congratulations! ${currentPlayerLetter === "X" ? "O" : "X"} is the Winner!`;
};

const resetGame = () => {
  // clears the squares
  squares.forEach((square) => {
    square.className = "square";
    square.textContent = "";
  });

  // resets the game state
  gameState = { ...initialGameState };

  statusSquare.classList.remove("you-won");
  statusSquare.textContent =
    "Move your mouse over a square and click to play an X or an O.";
};

const checkSquareEquality = (idxOne, idxTwo, idxThree) => {
  const squareOne = squares[idxOne].textContent;
  const squareTwo = squares[idxTwo].textContent;
  const squareThree = squares[idxThree].textContent;

  return squareOne === squareTwo && squareTwo === squareThree && squareOne;
};

const play = (square) => {
  const { currentPlayerLetter } = gameState;

  if (square.classList.contains("X") || square.classList.contains("O")) {
    alert("Square already occupied");
    return;
  }

  square.textContent = currentPlayerLetter;
  square.classList.add(currentPlayerLetter);

  gameState = {
    ...gameState,
    currentPlayerLetter: currentPlayerLetter === "X" ? "O" : "X",
  };
};

const startGame = () => {
  squares.forEach((square) => {
    square.classList.add("square");

    square.addEventListener("click", () => {
      !gameState.gameOver && play(square);

      gameState.gameOver =
        checkSquareEquality(0, 1, 2) ||
        checkSquareEquality(3, 4, 5) ||
        checkSquareEquality(6, 7, 8) ||
        checkSquareEquality(0, 3, 6) ||
        checkSquareEquality(1, 4, 7) ||
        checkSquareEquality(2, 5, 8) ||
        checkSquareEquality(0, 4, 8) ||
        checkSquareEquality(2, 4, 6);

      if (gameState.gameOver) {
        displayWinnerMessage();
        return;
      }
    });
    square.addEventListener("mouseover", () => {
      square.classList.add("hover");
    });
    square.addEventListener("mouseout", () => {
      square.classList.remove("hover");
    });
    resetButton.addEventListener("click", () => {
      resetGame();
    });
  });
};

window.onload = () => {
  startGame();
};
