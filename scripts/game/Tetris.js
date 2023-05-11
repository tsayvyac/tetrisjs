export default class Tetris {
    static type = 'IJLOSTZ';
    static points = {
        1: 40,
        2: 100,
        3: 300,
        4: 1200
    }

    constructor(fieldH, fieldW, over) {
        this.placeSound = new Audio("https://raw.githubusercontent.com/tsayvyac/tetrisjs/master/audio/place.mp3");
        this.placeSound.volume = 0.3;
        this.scoreSound = new Audio("https://raw.githubusercontent.com/tsayvyac/tetrisjs/master/audio/score.mp3");
        this.scoreSound.volume = 0.3;
        this.fieldH = fieldH;
        this.fieldW = fieldW;
        this.over = over;
        this.reset();
    }

    // Reset game parameters
    reset() {
        this.score = 0;
        this.linesCount = 0;
        this.topTouch = false;
        this.playfield = this.createField();
        this.tetromino = this.createTetromino();
        this.nextTetromino = this.createTetromino();
        this.over.style.display = "none";
    }

    get getWidth() {
        return this.fieldW;
    }

    get getHeight() {
        return this.fieldH;
    }

    get level() {
        return Math.floor(this.linesCount * 0.1);
    }

    // Create 2d array representing the game field
    createField() {
        return Array.from(Array(this.fieldH), () => Array(this.fieldW).fill(0));
    }

    // Returns random int in range min-max
    randomIndex(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    // Returns object with coordinate of spawning and random 2d array representing the tetromino
    createTetromino() {
        const tetromino = {};
        switch (Tetris.type[this.randomIndex(0, 7)]) {
            case 'I':
                tetromino.tiles = [
                    [0,0,0,0],
                    [1,1,1,1],
                    [0,0,0,0],
                    [0,0,0,0]
                ];
                break;
            case 'S':
                tetromino.tiles = [
                    [0,0,0],
                    [0,2,2],
                    [2,2,0]
                ];
                break;
            case 'Z':
                tetromino.tiles = [
                    [0,0,0],
                    [3,3,0],
                    [0,3,3]
                ];
                break;
            case 'O':
                tetromino.tiles = [
                    [0,0,0,0],
                    [0,4,4,0],
                    [0,4,4,0],
                    [0,0,0,0]
                ];
                break;
            case 'T':
                tetromino.tiles = [
                    [0,0,0],
                    [5,5,5],
                    [0,5,0]
                ];
                break;
            case 'L':
                tetromino.tiles = [
                    [0,0,0],
                    [6,6,6],
                    [6,0,0]
                ];
                break;
            case 'J':
                tetromino.tiles = [
                    [0,0,0],
                    [7,7,7],
                    [0,0,7]
                ];
                break;
            default:
                throw new Error("Undefined type of tetromino!");
        }

        tetromino.coordX = Math.floor((10 - tetromino.tiles[0].length) / 2);
        tetromino.coordY = -1;
        return tetromino;
    }

    moveLeft() {
        this.tetromino.coordX--;
        if (this.hasCollision()) {
            this.tetromino.coordX++;
        }
    }

    moveRight() {
        this.tetromino.coordX++;
        if (this.hasCollision()) {
            this.tetromino.coordX--;
        }
    }

    moveDown() {
        if (this.topTouch) {
            return;
        }
        this.tetromino.coordY++;

        if (this.hasCollision()) {
            this.tetromino.coordY--;
            this.placeAndUpdate();
        }
        if (this.hasCollision()) {
            this.topTouch = true;
        }
    }

    // The tetromino is at the very bottom
    hardDrop() {
        while (!this.hasCollision()) {
            this.tetromino.coordY++;
        }
        this.tetromino.coordY--;
        this.placeAndUpdate();
        if (this.hasCollision()) {
            this.topTouch = true;
        }
    }    

    placeAndUpdate() {
        this.placeTetromino();
        this.updateScore(this.clearLines());
        this.updateTetromino();
    }

    // Super Rotation System. Reference: https://tetris.fandom.com/wiki/SRS
    rotate() {
        this.rotateTiles();
        if (this.hasCollision()) {
            this.rotateTiles(false);
        }
    }

    rotateTiles(clockwise = true) {
        const tiles = this.tetromino.tiles;
        const x = Math.floor(tiles.length / 2);
        const y = tiles.length - 1;

        for (let i = 0; i < x; i++) {
            for (let j = i; j < y - i; j++) {
                const temp = tiles[i][j];
                if (clockwise) {
                    tiles[i][j] = tiles[y - j][i];
                    tiles[y - j][i] = tiles[y - i][y - j];
                    tiles[y - i][y - j] = tiles[j][y - i];
                    tiles[j][y - i] = temp;
                } else {
                    tiles[i][j] = tiles[j][y - i];
                    tiles[j][y - i] = tiles[y - i][y - j];
                    tiles[y - i][y - j] = tiles[y - j][i];
                    tiles[y - j][i] = temp;
                }
            }
        }
    }

    // Checks if tetromino has collision with walls or another tetromino
    hasCollision() {
        const {coordY, coordX, tiles} = this.tetromino;
        for (let y = 0; y < tiles.length; y++) {
            for (let x = 0; x < tiles[y].length; x++) {
                if (
                    tiles[y][x] &&
                    ((this.playfield[coordY + y] === undefined || this.playfield[coordY + y][coordX + x] === undefined) || 
                        this.playfield[coordY + y][coordX + x])
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    // Returns current state for rendering
    getState() {
        const tiles = this.tetromino.tiles;
        const stateField = this.playfield.map(line => {
            return line.slice();
        });
        for (let y = 0; y < tiles.length; y++) {
            for (let x = 0; x < tiles[y].length; x++) {
                if (tiles[y][x]) {
                    stateField[this.tetromino.coordY + y][this.tetromino.coordX + x] = tiles[y][x];
                }
            }
        }
        return {
            level: this.level,
            score: this.score,
            linesCount: this.linesCount,
            nextTetromino: this.nextTetromino,
            stateField,
            isOver: this.topTouch,
        };
    }

    // Puts the tetromino in a certain place
    placeTetromino() {
        let {coordY, coordX, tiles} = this.tetromino;
        if (coordY < 0) coordY = 0;
        for (let y = 0; y < tiles.length; y++) {
            for (let x = 0; x < tiles[y].length; x++) {
                if (tiles[y][x]) {
                    this.playfield[coordY + y][coordX + x] = tiles[y][x];
                }
            }
        }
        this.placeSound.play();
    }

    // When a figure is put in place this function creates another
    updateTetromino() {
        this.tetromino = this.nextTetromino;
        this.nextTetromino = this.createTetromino();
    }

    // If the line is filled, it is removed and score are counted
    clearLines() {
        let lines = [];
        for (let y = this.fieldH - 1; y >= 0; y--) {
            let countTiles = 0;
            for (let x = 0; x < this.fieldW; x ++) {
                if (this.playfield[y][x]) {
                    countTiles++;
                }
            }
            if (countTiles === 0) {
                break;
            } else if (countTiles < this.fieldW) {
                continue;
            } else if (countTiles === this.fieldW) {
                lines.unshift(y);
                this.scoreSound.play();
            }
        }
        for (let i of lines) {
            this.playfield.splice(i, 1);
            this.playfield.unshift(new Array(this.fieldW).fill(0));
        }
        return lines.length;
    }

    updateScore(countLines) {
        if (countLines > 0) {
            this.score += Tetris.points[countLines] * (this.level + 1);
            this.linesCount += countLines;
        }
    }
}