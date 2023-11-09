document.addEventListener('contextmenu', event => event.preventDefault());
var grid = document.getElementById("grid")
var tableGridValue = parseInt(document.getElementById("gridSize").value);
var numBooms = parseFloat(document.getElementById("numBoom").value);
var winStatus = document.getElementById("winStatus");
var gameButton = document.getElementById("gameButton");

var numCellsCols = 15;
var numCellsRows = 15;
var Cells;

function changeGridSize() {
    tableGridValue = parseInt(document.getElementById("gridSize").value);
    if (tableGridValue !== 30) {
        numCellsCols = tableGridValue
        numCellsRows = tableGridValue
    } else {
        numCellsCols = 30
        numCellsRows = 25
    }
    setUpTableGrid()
}

function changeNumBooms() {
    numBooms = parseFloat(document.getElementById("numBoom").value);
    setUpTableGrid()
}

function setUpTableGrid() {
    winStatus.style.display = "none"
    gameButton.innerText = "Restart Game"
    grid.innerHTML = ""
    var gridTable = document.createElement('table')
    Cells = new Array(numCellsRows)

    for (let i = 0; i < numCellsRows; i++) {
        Cells[i] = new Array(numCellsCols)
    }

    for (let i = 0; i < numCellsRows; i++) {
        var gridTableRecord = document.createElement("tr")
        for (let j = 0; j < numCellsCols; j++) {
            let cell = new Cell(numCellsCols, numCellsRows, numBooms)
            Cells[i][j] = cell
            let tableData = createTdElement(i, j)
            gridTableRecord.appendChild(tableData)
        }
        gridTable.appendChild(gridTableRecord)
    }
    grid.appendChild(gridTable)

    for (let i = 0; i < numCellsRows; i++) {
        for (let j = 0; j < numCellsCols; j++) {
            Cells[i][j].countBee(i, j)
        }
    }
}

function createTdElement(i, j) {
    let td = document.createElement("td");
    td.id = i + "&" + j

    td.setAttribute('onclick', "clickCell(" + i + "," + j + ")");
    td.setAttribute('oncontextmenu', "setFlag(" + i + "," + j + ")");

    switch (tableGridValue) {
        case 15:
            td.style = "width: 5vh; height: 5vh; font-size: larger"
            break;
        case 20:
            td.style = "width: 4vh; height: 4vh"
            break;
        case 25:
            td.style = "width: 3.2vh; height: 3.2vh"
            break;
        case 30:
            td.style = "width: 3.2vh; height: 3.2vh"
            break;
    }
    return td;
}

function restart() {
    setUpTableGrid()
}

function clickCell(i, j) {
    Cells[i][j].showCell(i, j)
    if (Cells[i][j].bee) {
        gameOver()
    }

    if (checkIsWin()) {
        winGame()
    }
}

function setFlag(i, j) {
    Cells[i][j].pinFlag(i, j)
}

function gameOver() {
    winStatus.style.display = ""
    winStatus.innerText = "THUA RỒI\n╭∩╮( •̀_•́ )╭∩╮"
    winStatus.style.color = "red"

    gameButton.innerText = "Try Again"
}

function winGame() {
    winStatus.style.display = ""
    winStatus.innerText = "THẮNG RỒI\n( ๑ ˃̵ᴗ˂̵)و ♡"
    winStatus.style.color = "darkgreen"

    gameButton.innerText = "New Game"
}

function checkIsWin() {
    for (let i = 0; i < numCellsRows; i++) {
        for (let j = 0; j < numCellsCols; j++) {
            if (Cells[i][j].bee) continue
            else {
                if (!Cells[i][j].reveal) return false
            }
        }
    }
    return true;
}
