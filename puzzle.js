  var table;
  var size;
var arrayForBoard;
var secound = 0;

  function start() {
    var button = document.getElementById("newGame");
    button.addEventListener("click", startNewGame);
    table = document.getElementById("table");
    textMove = document.getElementById('moves');
    textTime = document.getElementById('time');
    size = 4;
    startNewGame();
  }

  function startNewGame() {
    var arrayOfNumbers = new Array();
    var arrayHasNumberBeenUsed;
    var randomNumber = 0;
    var count = 0;
    moves = 0;
    secound = 0;
    size = document.getElementById("size").value;
    textMove.innerHTML = moves;
    // Create the proper board size.
    arrayForBoard = new Array(size);
    for (var i = 0; i < size; i++) {
      arrayForBoard[i] = new Array(size);
    }
    // Set up a temporary array for
    // allocating unique numbers.
    arrayHasNumberBeenUsed = new Array(size * size);
    for (var i = 0; i < size * size; i++) {
      arrayHasNumberBeenUsed[i] = 0;
    }

    // Assign random numbers to the board.
    for (var i = 0; i < size * size; i++) {
      randomNumber = Math.floor(Math.random() * size * size);
      // If our random numer is unique, add it to the board.
      if (arrayHasNumberBeenUsed[randomNumber] == 0) {
        arrayHasNumberBeenUsed[randomNumber] = 1;
        arrayOfNumbers.push(randomNumber);
      }
      else // Our number is not unique. Try again.
      {
        i--;
      }
    }

    // Assign numbers to the game board.
    count = 0;
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        arrayForBoard[i][j] = arrayOfNumbers[count];

        count++;
      }
    }
    showTable();
  }

  function showTable() {
    var outputString = "";
    for (var i = 0; i < size; i++) {  //create row
      outputString += "<tr>";
      for (var j = 0; j < size; j++) { //create cells
        if (arrayForBoard[i][j] == 0) {  // create empty td
          outputString += "<td class=\"cell empty\"> </td>";
        }
        else {     // create other td
          outputString += "<td class=\"cell\" onclick=\"moveThisTile(" + i + ", " + j + ")\">" + arrayForBoard[i][j] + "</td>";
        }
      } // end for (var j = 0; j < size; j++)
      outputString += "</tr>";
    } // end for (var i = 0; i < size; i++)

    table.innerHTML = outputString;
  }


  function moveThisTile(tableRow, tableColumn) {
    if (checkIfMoveable(tableRow, tableColumn, "up") ||
      checkIfMoveable(tableRow, tableColumn, "down") ||
      checkIfMoveable(tableRow, tableColumn, "left") ||
      checkIfMoveable(tableRow, tableColumn, "right")) {
      incrementMoves();
    }
    else {
      '';
      // swal("ERROR", "Cannot move tile!");
    }
    if (checkIfWinner()) {
      swal("Congrat!", "You solved the puzzle!");
      startNewGame();
    }
  }

  function checkIfMoveable(rowCoordinate, columnCoordinate, direction) {
    // The following variables an if else statements
    // make the function work for all directions.
    rowOffset = 0;
    columnOffset = 0;
    if (direction == "up") {
      rowOffset = -1;
    }
    else if (direction == "down") {
      rowOffset = 1;
    }
    else if (direction == "left") {
      columnOffset = -1;
    }
    else if (direction == "right") {
      columnOffset = 1;
    }

    // Check if the tile can be moved to the spot.
    // If it can, move it and return true.
    if (rowCoordinate + rowOffset >= 0 && columnCoordinate + columnOffset >= 0 &&
      rowCoordinate + rowOffset < size && columnCoordinate + columnOffset < size  //Check that the move of tile is'nt out of the table.


    ) {
      if (arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] == 0) { //Check that the tile is empty?
        arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] = arrayForBoard[rowCoordinate][columnCoordinate];
        arrayForBoard[rowCoordinate][columnCoordinate] = 0;
        showTable();
        return true;
      }
    }
    return false;
  }

  function checkIfWinner() {
    var count = 1;
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        if (arrayForBoard[i][j] != count) {
          if (!(count === size * size && arrayForBoard[i][j] === 0)) {
            return false;
          }
        }
        count++;
      }
    }
    return true;
  }

function incrementMoves() {
  moves++;
  if (textMove) {
    textMove.innerHTML = moves;
  }
}

setInterval(
  function incrementSecounds() {
    secound++;
    textTime.innerHTML = secound;
  },
  1000);


  window.addEventListener("load", start, false);
  // This event listener makes the function start() execute when the window opens.
