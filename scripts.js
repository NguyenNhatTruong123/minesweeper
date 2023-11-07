// import { Cell } from "./cell";
document.addEventListener('contextmenu', event => event.preventDefault());
var grid = document.getElementById("grid")

var gridHTML = "<table>";
var numCells = 15;
var Cells = new Array(numCells)

for (let i = 0; i < numCells; i++) {
    Cells[i] = new Array(numCells)
}

for (let i = 0; i < numCells; i++) {
    gridHTML = gridHTML + "<tr>";
    for (let j = 0; j < numCells; j++) {
        let id = i + "&" + j
        let cell = new Cell(i, j, numCells)
        Cells[i][j] = cell
        gridHTML = gridHTML + "<td id=" + id + " onclick=clickCell(" + i + "," + j + ") oncontextmenu=setFlag(" + i + "," + j + ")> <br></td>";
    }
    gridHTML = gridHTML + "</tr>";
}
gridHTML = gridHTML + "</table>";
grid.innerHTML = gridHTML;

for (let i = 0; i < numCells; i++) {
    for (let j = 0; j < numCells; j++) {
        Cells[i][j].countBee(i, j)
    }
}

function clickCell(i, j) {
    Cells[i][j].showCell(i, j)
}

function setFlag(i, j) {
    Cells[i][j].pinFlag(i, j)
}