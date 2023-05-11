export default class View {
    static colors = {
        1: 'orange',
        2: 'yellow',
        3: 'green',
        4: 'cyan',
        5: 'red',
        6: 'purple',
        7: 'blue',
    };

    constructor(element, width, height, rows, cols, scoreSpan, over, name, scoreInput) {
        this.element = element;
        this.width = width;
        this.height = height;
        this.scoreSpan = scoreSpan;
        this.over = over;
        this.name = name;
        this.scoreInput = scoreInput;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');

        this.borderWidth = 4;
        this.borderX = this.borderWidth; // Start of playfield x
        this.borderY = this.borderWidth; // Start of playfield y
        this.playfieldWidth = this.width * 2 / 3;
        this.playfieldHeight = this.height;
        this.playfieldInnerWidth = this.playfieldWidth - this.borderWidth * 2;
        this.playfieldInnerHeight = this.playfieldHeight - this.borderWidth * 2;

        this.tileWidth = this.playfieldInnerWidth / cols;
        this.tileHeight = this.playfieldInnerHeight / rows;

        this.panelX = this.playfieldWidth + 10;
        this.panelY = 0;

        this.element.appendChild(this.canvas);
    }

    render(state) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.renderField(state.stateField);
        this.renderPanel(state);
    }

    renderStartScreen() {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '18px "Press Start 2P"';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('Press [Enter] to start', this.width / 2, this.height / 2);
    }

    renderEndScreen({score}) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.scoreSpan.textContent = score;
        this.scoreInput.value = score;
        this.over.style.display = "block";
    }

    renderField(playfield) {
        for (let y = 0; y < playfield.length; y++) {
            for (let x = 0; x < playfield[y].length; x++) {
                this.renderTile(
                    this.borderX + (x * this.tileWidth),
                    this.borderY + (y * this.tileHeight),
                    this.tileWidth,
                    this.tileHeight,
                    '#141414'
                    );
                if (playfield[y][x]) {
                    this.renderTile(
                        this.borderX + (x * this.tileWidth),
                        this.borderY + (y * this.tileHeight),
                        this.tileWidth,
                        this.tileHeight,
                        View.colors[playfield[y][x]]
                        );
                }
            }
        }

        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = this.borderWidth;
        this.ctx.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
    }

    renderPanel({level, score, linesCount, nextTetromino}) {
        this.ctx.textAlign = 'start';
        this.ctx.textBaseline = 'top';
        this.ctx.fillStyle = 'white';
        this.ctx.font = '14px "Press Start 2P"';

        this.ctx.fillText(`Level: ${level}`, this.panelX + 12, this.panelY);
        this.ctx.fillText(`Score: `, this.panelX + 12, this.panelY + 24);
        this.ctx.fillText(score, this.panelX + 12, this.borderY + 42);
        this.ctx.fillText(`Lines: ${linesCount}`, this.panelX + 12, this.panelY + 96);
        this.ctx.fillText(`Next: `, this.panelX + 12, this.panelY + 120);

        for (let y = 0; y < nextTetromino.tiles.length; y++) {
            for (let x = 0; x < nextTetromino.tiles[y].length; x++) {
                const tile = nextTetromino.tiles[y][x];
                if (tile) {
                    this.renderTile(
                        this.panelX + 12 + (x * this.tileWidth),
                        this.panelY + 123 + (y * this.tileHeight),
                        this.tileWidth,
                        this.tileHeight,
                        View.colors[tile]
                    );
                }
            }
        }
    }

    renderTile(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeRect(x, y, width, height);
    }
}