import Tetris from './Tetris.js';
import View from './View.js';
import Controller from './Controller.js';

const gameView = document.querySelector('#gameView');
const modalPause = document.getElementsByClassName('modal-dialog')[0];
const music = document.getElementById("music");
const theme = document.getElementById("theme");
const score = document.getElementById("score-n");
const name = document.getElementById("name");
const scoreInput = document.getElementById("score-input");
const over = document.getElementsByClassName("game-over")[0];
const form = document.getElementById("form");
const nameForm = document.getElementById("name");
const scoreForm = document.getElementById("score-input");
theme.volume = 0.1;

const tetris = new Tetris(20, 10, over);
const view = new View(gameView, 500, 640, tetris.getHeight, tetris.getWidth, score, over, name, scoreInput);
const controller = new Controller(tetris, view, modalPause, music);

music.onclick = () => {
    controller.changeStateMusic();
}

form.addEventListener("submit", () => {
    localStorage.setItem(nameForm.value, scoreForm.value);
})