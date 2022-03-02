// Select board size button
const boardSizeButton = document.querySelector("#boardSize");
const gameArea = document.querySelector(".game-area");
boardSizeButton.addEventListener("change", createBoard);


function createBoard() {

    // Delete all previous cells in the game area
    for (let node of Array.from(gameArea.childNodes)) {
        console.log(node);
        gameArea.removeChild(node);
    }

    // Add the correct number of Template Columns to the game-area in CSS
    let numCells = this.value * this.value;
    gameArea.style.gridTemplateColumns = `repeat(${this.value},1fr)`;
    gameArea.style.gridTemplateRows = `repeat(${this.value},1fr)`;

    // Create the cells, add their listeners to them, and  then add cells to the game-area
    for (let cellsCreated = 0; cellsCreated < numCells; cellsCreated++) {
        let newCell = document.createElement("div");
        newCell.addEventListener("click", onCellClicked);

        newCell.classList.add("game-cell");
        gameArea.appendChild(newCell);
    }
}

function onCellClicked() {
    // Add the correct picture / text to the game cells here when a player/ai choose a cell
    this.innerText = "X";
}