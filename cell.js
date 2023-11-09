class Cell {
    constructor(numCols, numRows, numBooms) {
        if (Math.random(1) > 1 - numBooms) {
            this.bee = true
        } else {
            this.bee = false
        }
        this.reveal = false
        this.neighborBee = -1
        this.numCols = numCols
        this.numRows = numRows
        this.isPinFlag = false

        switch (numCols) {
            case 15:
                this.style = "width: 5vh; height: 5vh; font-size: larger"
                break;
            case 20:
                this.style = "width: 4vh; height: 4vh"
                break;
            case 25:
                this.style = "width: 3.2vh; height: 3.2vh"
                break;
            case 30:
                this.style = "width: 3.2vh; height: 3.2vh"
                break;
        }
    }

    countBee(thisI, thisJ) {
        if (this.bee) return -1;
        let count = 0
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let row = thisI + i
                let col = thisJ + j
                if (row > -1 && row < this.numRows && col > - 1 && col < this.numCols) {
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
        if (!Cells[i][j].isPinFlag) {
            td.innerHTML = "&#128681"
            td.style = "background-color: lightgreen;" + this.style
            Cells[i][j].isPinFlag = true
        } else {
            td.innerHTML = ""
            td.style = this.style
            Cells[i][j].isPinFlag = false
        }
    }

    showAllCell() {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                let td = document.getElementById(i + "&" + j)
                if (Cells[i][j].bee) {
                    td.innerHTML = "💣"
                    td.style = "background-color: red;" + this.style
                } else {
                    td.style = "background-color: lightgrey;" + this.style
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
            td.style = "background-color: lightgrey;" + this.style
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
                if (row > -1 && row < this.numRows && col > -1 && col < this.numCols) {
                    if (!Cells[row][col].bee && !Cells[row][col].reveal) {
                        this.showCell(row, col)
                    }
                }
            }
        }
    }

}