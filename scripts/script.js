const modal = document.getElementsByClassName("modal")[0];
const overlay = document.getElementById("overlay");
const trigger = document.getElementById("author-btn");
const closeBtn = document.getElementsByClassName("close")[0];
const play = document.getElementById("play");
const records = document.getElementById("records");
const music = document.getElementById("music");
const theme = document.getElementById("theme");
theme.volume = 0.1;

trigger.onclick = () => {
    overlay.style.display = "block";
    modal.style.display = "block";
}

closeBtn.onclick = () => {
    overlay.style.display = "none";
    modal.style.display = "none";
}

changeStateMusic = () => {
    let playTheme = theme.play;
    if (music.textContent === "[x]") {
        music.textContent = "[o]";
        theme.play();
    } else {
        music.textContent = "[x]";
        theme.pause();
    }
}

music.onclick = () => {
    changeStateMusic();
}

document.addEventListener("keydown", e => {
    switch(e.code) {
        case "Escape":
            if (modal.style.display === "block") {
                modal.style.display = "none";
                overlay.style.display = "none";
            }
            break;
        case "KeyA":
            if (modal.style.display !== "block") {
                play.click();
            }
            break;
        case "KeyR":
            if (modal.style.display !== "block") {
                records.click();
            }
            break;
        case "KeyM":
            changeStateMusic();
            break;
    }
});