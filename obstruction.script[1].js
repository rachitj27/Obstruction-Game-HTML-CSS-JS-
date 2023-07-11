var squares = document.querySelectorAll(".square")
var turn = "j";
var par = document.getElementById("messageParagraph")

for (var i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", change)
}

function change () {
  
  if (!this.classList.contains("touching") && this.innerHTML == "") {
    setNeighbors(this)
    this.innerHTML = turn

    if (checkWon()) {
      par.innerHTML = `${turn} won`
    } else {
      if (turn == "r") {
        turn = "j"
      }
      else if (turn == "j") {
        turn = "r"
      }
    }
  }
  //par.innerHTML = `${turn}'s turn`
} 
function setNeighbors (square) {
  var below =  getNeighbor(square, 0, 1) // bottom
  var above =  getNeighbor(square, 0, -1) // top
  var right =   getNeighbor(square, 1, 0) // right
  var left =  getNeighbor(square, -1, 0) // left
  var bottomLeft =  getNeighbor(square, -1, 1) // bottom left
  var bottomRight =  getNeighbor(square, 1, 1) // bottom right
  var topRight =  getNeighbor(square,1,-1 )  //top right
  var topLeft =  getNeighbor(square, -1, -1) //top left
 
  square.style.backgroundColor = "skyblue"
  toggleSquare(below)
  toggleSquare(above)
  toggleSquare(left)
  toggleSquare(right)
  toggleSquare(topRight)
  toggleSquare(topLeft)
  toggleSquare(bottomLeft)
  toggleSquare(bottomRight)
}
function toggleSquare(square) {
  if (square != null) {
    square.classList.add("touching")
    
  }
}

function getNeighbor (square, xDiff, yDiff) {
   // array of rows
  let rows = document.getElementsByClassName(`row`)

  let row = square.parentElement // row of square
  let y // y coordinate of square, set below
  let x // x coordinate of square, set below

  // loop through rows to determine y
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] == row) {
      y = i // found matching row, so set y
    }
  }

  // loop through squares in row to determine x
  for (let i = 0; i < row.children.length; i++) {
    if (row.children[i] == square) {
      x = i // found matching square, so set x
    }
  }

  // row of neighbor square
  let neighborRow = rows[y + yDiff]
  square.classList.toggle("touching")
  if (neighborRow == null) {
    // row is beyond edge, so no neighbor square
    return null
  }
  else {
    // if x + xDiff is beyond edge, will be null
    return neighborRow.children[x + xDiff]
  }
  
  
}
function checkWon () {
  var won = true
  for (var i = 0; i < squares.length; i++) {
    if (!squares[i].classList.contains("touching") && squares[i].innerHTML == "") {
      won = false
    }
  }
  return won
}
