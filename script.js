// Select board size button




// Add the correct picture / text to the game cells here when a player/ai choose a cell


// Create the Game object, with the 'module pattern' which only allows the Game object to be created once.
// (since it has the closed parenthses at the end)
let Game = (() => {

    // Board Size buttons & vars & listeners
    const boardSizeButton = document.querySelector("#boardSize");
    boardSizeButton.addEventListener("change", createBoard);

    // Player Sign buttons & vars & listeners
    const playerSignButton = document.querySelector("#playerSign");
    let playerSign = playerSignButton.value;
    playerSignButton.addEventListener("change", changePlayerSign);

    // Get game/menu areas
    const gameArea = document.querySelector(".game-area");

  

    // Create the gameBoard, which is where the cells are stored
    let gameBoard = [];

    // Create the board for the first time, upon startup. Default size is 3.
    boardSizeButton.dispatchEvent(new Event("change"));

    


    // The createBoard event is triggered when a player changes the board size
    // and also once upon Game object creation
    
    function createBoard() {


        // Delete all previous cells in the game area
        for (let node of Array.from(gameArea.childNodes)) {
            gameArea.removeChild(node);
        }
    
        // Add the correct number of Template Columns to the game-area in CSS
        let numCells = this.value * this.value;
        gameArea.style.gridTemplateColumns = `repeat(${this.value},1fr)`;
        gameArea.style.gridTemplateRows = `repeat(${this.value},1fr)`;

        // Create the 2d Array which will actually contain all game-cell elements
        gameBoard = Array.from(new Array(parseInt(this.value)), (x) => new Array(parseInt(this.value)));
        console.log(this.value);
        console.log(gameBoard);
    
        // Create the cells, add their listeners to them, and  then add cells to the game-area in DOM and gameBoard array
        for (let row = 0; row < this.value; row++) {
            for (let column = 0; column < this.value; column++) {
                // Create the game cell
                let newCell = document.createElement("div");
                // Add event listener
                newCell.addEventListener("click", onCellClicked);
                // Add the appropriate css to cell
                newCell.classList.add("game-cell");
                // Add an 'inUse' property to show if a cell currently has a piece in it
                newCell.inUse = false;
                // Append the cell to our 2d board array
                gameBoard[row][column] = newCell;
                // Append the cell to the dom
                gameArea.appendChild(newCell);
            }
        }
    }

    // What happens when a player clicks on a cell of the game
    function onCellClicked() {
        // Check if cell occupied, if so do nothing
        if (this.inUse === true) {
            return;
        }

        // Make the move 
        makeMove(this);
        // Make it so that this cell is now being used
        this.inUse = true;
        // Check for winner / loser on board. If so, end game
        

        // Check if board is full. If so, end game

        // If no win/draw, wait a second and then AI makes turn
    }

    // Change the sign in a given cell
    function makeMove(cell) {
        if (playerSign === "X") {
            cell.innerText = "X";
        } else if (playerSign === "O") {
            cell.innerText = "O";
        } else if (playerSign === "TICTAC") {
            let tictacImage = document.createElement("img");
            tictacImage.src = "img/tictac.png";
            cell.appendChild(tictacImage);
        } else if (playerSign === "TOE") {
            let toeImage = document.createElement("img");
            toeImage.src = "img/toe.png";
            cell.appendChild(toeImage);
        }
    }

    function changePlayerSign() {
        playerSign = this.value;
    }

})();