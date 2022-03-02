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
    // Get the number of signs a player needs in a row to win
    let winLen = 3;

    // Create the board for the first time, upon startup. Default size is 3.
    boardSizeButton.dispatchEvent(new Event("change"));

    


    // The createBoard event is triggered when a player changes the board size
    // and also once upon Game object creation
    
    function createBoard() {


        // Delete all previous cells in the game area
        for (let node of Array.from(gameArea.childNodes)) {
            gameArea.removeChild(node);
        }

        // Change the number of signs needed in a row to win.
        if (this.value != '3') {
            winLen = 4;
        }
    
        // Add the correct number of Template Columns to the game-area in CSS
        let numCells = this.value * this.value;
        gameArea.style.gridTemplateColumns = `repeat(${this.value},1fr)`;
        gameArea.style.gridTemplateRows = `repeat(${this.value},1fr)`;

        // Create the 2d Array which will actually contain all game-cell elements
        gameBoard = Array.from(new Array(parseInt(this.value)), (x) => new Array(parseInt(this.value)));
    
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

        console.log(getLines(gameBoard, winLen));
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

    // Takes a line (array from the board) and checks if it counts as a win for player or human
    function checkLine(winLength, line) {
    
        if (winLength > line.length) {
            return "error, the winLength can't be bigger than the board.."
        }
      
        // For each element in the array
        for (let startIndex = 0; startIndex <= line.length-winLength; startIndex++) {
            // set isWin to true
            let isWin = true;
            // if the element === the playerSymbol, we'll go through the following elements
            // and check if they are also equal to the player symbol
            // If one of them isn't, then isWin is set to false and we got to the next
            //starting position (startIndex) with a break statement
            if (line[startIndex] === playerSymbol) {
                for (let endIndex = startIndex; endIndex < startIndex+winLength; endIndex++) {
                    if (line[endIndex] != playerSymbol) {
                        isWin = false;
                        break;
                    }
                }
                // return true if could go over the array without finding a reason to reject it
                if (isWin) {
                    return true;
                }
            } 
            // If the element != the playerSymbol, we can just skip to the next 
            // starting position (startIndex) as well
            else {
                continue;
            }
        }
    
        // If true could never be returned, that means a winning line wasn't found so return false
        return false;
    
    }

    // Get each horizontal, vertical, or diagonal line from the game board so that 
    // We can check if anyone has one
    // returns an array of arrays
    function getLines(board, winLen) {
        lines = []
    
        // Get the rows
        for (let row of board) {
            lines.push(row);
        }
    
        // Get the columns
        for (let column = 0; column < board.length; column++) {
            let newColumn = []
            for (let row = 0; row < board.length; row++) {
                newColumn.push(board[row][column]);
                
            }
            lines.push(newColumn);
        }
    
        // The hard part, get the diagonals. 
        // This is broken into four for loops
        // I could have done it with less code, but with the four loops 
        // I realized it is easier to debug since the lines get pushed 
        // in a more logical order
    
        // First, going up and to the right for the left and bottom sides of the board
        // Left side going up to right
        for (let row = 0; row < board.length; row++) {
            let newDiag = [];
            startCoord = [row,0];
            newDiag.push(board[startCoord[0]][startCoord[1]]);
    
            while (checkInRange(startCoord[0]-1,startCoord[1]+1,board.length)) {
                startCoord[0]--;
                startCoord[1]++;
    
                newDiag.push(board[startCoord[0]][startCoord[1]]);
            }
    
            if (newDiag.length >= winLen) {
                lines.push(newDiag);
            }
            
        }
    
        // Bottom side going up to right
        for (let column = 1; column < board.length; column++) {
            let newDiag = [];
            startCoord = [board.length-1,column];
            newDiag.push(board[startCoord[0]][startCoord[1]]);
    
            while (checkInRange(startCoord[0]-1,startCoord[1]+1,board.length)) {
                startCoord[0]--;
                startCoord[1]++;
    
                newDiag.push(board[startCoord[0]][startCoord[1]]);
            }
    
            if (newDiag.length >= winLen) {
                lines.push(newDiag);
            }
        }
    
        // Left side going down to right
        for (let row = 0; row < board.length; row++) {
            let newDiag = [];
            startCoord = [row,0];
            newDiag.push(board[startCoord[0]][startCoord[1]]);
    
            while (checkInRange(startCoord[0]+1,startCoord[1]+1,board.length)) {
                startCoord[0]++;
                startCoord[1]++;
    
                newDiag.push(board[startCoord[0]][startCoord[1]]);
            }
    
            if (newDiag.length >= winLen) {
                lines.push(newDiag);
            }
        }
    
        // Top side going down right
        for (let column = 1; column < board.length; column++) {
            let newDiag = [];
            startCoord = [0,column];
            newDiag.push(board[startCoord[0]][startCoord[1]]);
    
            while (checkInRange(startCoord[0]+1,startCoord[1]+1,board.length)) {
                startCoord[0]++;
                startCoord[1]++;
    
                newDiag.push(board[startCoord[0]][startCoord[1]]);
            }
    
            if (newDiag.length >= winLen) {
                lines.push(newDiag);
            }
        }
    

        return lines;
    }

    // Check if a pair of coordinates is a valid location on the board
    // Used for getting diagonals in function getLines
    function checkInRange(row, column, boardSize) {  
        if (row >= boardSize || column >= boardSize) {
            return false;
        }
        else if (row < 0 || column < 0) {
            return false;
        }
        
        return true;
    }

    // return 'player' if player wins, 'ai' if AI wins.
    function checkWinner() {
        let allLines = getLines(gameBoard, winLen);
        for (let l of allLines) {
            console.log(l, checkLine(winLen, l));
        }
    }


    

})();