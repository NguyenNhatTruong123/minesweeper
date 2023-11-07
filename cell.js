class Cell {
    constructor(i, j, numCells) {
        this.i = i
        this.j = j
        if (Math.random(1) > 0.75) {
            this.bee = true
        } else {
            this.bee = false
        }
        this.reveal = false
        this.neighborBee = -1
        this.numCells = numCells
    }

    countBee(thisI, thisJ) {
        if (this.bee) return -1;
        let count = 0
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let row = thisI + i
                let col = thisJ + j
                if (row > -1 && row < this.numCells && col > - 1 && col < this.numCells) {
                    if (Cells[row][col].bee) {
                        count++;
                    }
                }
            }
        }

        this.neighborBee = count
    }

    pinFlag(i, j) {
        let td = document.getElementById(i + "&" + j)
        td.innerHTML = "&#128681"
        td.style = "background-color: lightgreen"
    }

    showAllCell() {
        for (let i = 0; i < numCells; i++) {
            for (let j = 0; j < numCells; j++) {
                let td = document.getElementById(i + "&" + j)
                if (Cells[i][j].bee) {
                    td.innerHTML = "💣"
                    td.style = "background-color: red"
                } else {
                    td.style = "background-color: lightgrey"
                    if (Cells[i][j].neighborBee == 0) {
                        td.innerHTML = ""
                    } else {
                        td.innerHTML = Cells[i][j].neighborBee
                    }
                }
            }
        }
    }

    showCell(i, j) {
        Cells[i][j].reveal = true
        let td = document.getElementById(i + "&" + j)
        if (Cells[i][j].bee) {
            this.showAllCell()
        } else {
            td.style = "background-color: lightgrey"
            if (Cells[i][j].neighborBee == 0) {
                td.innerHTML = ""
                this.floodFill(i, j)
            } else {
                td.innerHTML = Cells[i][j].neighborBee
            }
        }
    }

    floodFill(thisI, thisJ) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let row = thisI + i
                let col = thisJ + j
                if (row > -1 && row < this.numCells && col > -1 && col < this.numCells) {
                    if (!Cells[row][col].bee && !Cells[row][col].reveal) {
                        this.showCell(row, col)
                    }
                }
            }
        }
    }

    gameOver() {
        alert("GAME OVER")
    }

}