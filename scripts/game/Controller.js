export default class Controller {
    constructor(tetris, view, modalPause, music) {
        this.tetris = tetris;
        this.view = view;
        this.modalPause = modalPause;
        this.intervalId = null;
        this.isPlaying = false;
        this.music = music;

        this.view.renderStartScreen();
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    update() {
        this.tetris.moveDown();
        this.view.render(this.tetris.getState());
    }

    pause() {
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
    }

    play() {
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }

    reset() {
        this.tetris.reset();
        this.play();
    }

    updateView() {
        const state = this.tetris.getState();
        if (state.isOver) {
            this.isPlaying = false;
            this.stopTimer();
            this.view.renderEndScreen(state);
        } else if (!this.isPlaying) { 
            this.modalPause.style.display = 'block';
        } else {
            this.view.render(state);
            this.modalPause.style.display = 'none';
        }
    }

    changeStateMusic() {
        if (music.textContent === "[x]") {
            music.textContent = "[o]";
            theme.play();
        } else {
            music.textContent = "[x]";
            theme.pause();
        }
    }

    startTimer() {
        const speed = 1000 - this.tetris.getState().level * 100;
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.update();
            }, speed > 0 ? speed : 100);
        }
    }

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    handleKeyDown(e) {
        switch(e.code) {
            case "Enter":
                if (this.tetris.getState().isOver) {
                    this.reset();
                } else {
                    this.play();
                }
                break;
            }

        if (this.isPlaying) {
            switch(e.code) {
                case "ArrowLeft":
                    this.tetris.moveLeft();
                    this.updateView()
                    break;
                case "ArrowRight":
                    this.tetris.moveRight();
                    this.updateView()
                    break;
                case "ArrowDown":
                    this.tetris.moveDown();
                    this.updateView()
                    break;
                case "ArrowUp":
                    this.tetris.rotate();
                    this.updateView()
                    break;
                case "Space":
                    this.tetris.hardDrop();
                    this.updateView()
                    break;
                case "KeyE":
                    this.pause();
                    break;
            }
        }
    }

    handleKeyUp(e) {
        switch (e.code) {
            case "KeyDown":
                this.startTimer();
                break;
        }
    }
}