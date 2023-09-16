let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "#000";
let canvasW = canvas.width;
let canvasH = canvas.height;

let paints = {
    blank() {
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillRect(0, 0, canvasW, canvasH);
        ctx.closePath();
    },

    pauseScreen() {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, canvasW, canvasH);
        ctx.closePath();

        ctx.beginPath();
        ctx.font = "40px Segoe UI, Tahoma, Geneva, Verdana, sans-serif";
        ctx.fillStyle = "#fff"
        ctx.fillText("Game menu", canvasW / 2 - 100, canvasH / 2 - 50);
        ctx.font = "20px Segoe UI";
        ctx.fillText("Esc Back to the game", canvasW / 2 - 84, canvasH / 2);
        ctx.closePath();
    },

    winScreen() {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, canvasW, canvasH);
        ctx.closePath();

        ctx.beginPath();
        ctx.font = "40px Segoe UI, Tahoma, Geneva, Verdana, sans-serif";
        ctx.fillStyle = "#fff"
        ctx.fillText("You Win", canvasW / 2 - 100, canvasH / 2 - 50);
        ctx.font = "20px Segoe UI";
        ctx.fillText("Press R to play again", canvasW / 2 - 115, canvasH / 2);
        ctx.closePath();
    },

    gameOverScreen(time) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, canvasW, canvasH);
        ctx.closePath();

        ctx.beginPath();
        ctx.font = "40px Segoe UI, Tahoma, Geneva, Verdana, sans-serif";
        ctx.fillStyle = "#fff"
        ctx.fillText("Game over", canvasW / 2 - 100, canvasH / 2 - 50);
        ctx.font = "20px Segoe UI";
        time == 0 ? ctx.fillText("Time's up", canvasW / 2 - 60, canvasH / 2 - 20) : ctx.fillText("You died", canvasW / 2 - 60, canvasH / 2 - 20);
        ctx.fillText("Press R to reload page", canvasW / 2 - 110, canvasH / 2 + 10);
        ctx.closePath();
    },

    timer(time, minutes, seconds, timeFormat) {
        minutes = Math.floor(time / 60);
        seconds = time % 60;
        timeFormat = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0').substr(0, 2)}`
        ctx.beginPath();
        ctx.fillStyle = "#6F6F6F";
        ctx.fillRect(0, 0, 250, 30);
        ctx.strokeRect(0, 0, 250, 30);
        ctx.font = "20px Segoe UI, Tahoma, Geneva, Verdana, sans-serif";
        ctx.fillStyle = "#fff";
        ctx.fillText("Time remaining: " + timeFormat, 20, 22);
        ctx.closePath();
    },

    rect(img, x, y, w, h) {
        ctx.beginPath();
        ctx.drawImage(img, x, y, w, h);
        ctx.closePath();
    },

    bomb(img, x, y, w, h) {
        ctx.beginPath();
        ctx.drawImage(img, x, y, w, h);
        ctx.closePath();
    },
    explosion(x, y, blockSize) {
        ctx.beginPath();
        ctx.fillStyle = "#f00"
        ctx.fillRect(x, y - blockSize + 10, blockSize - 10, blockSize * 3 - 30);
        ctx.fillRect(x - blockSize + 10, y, blockSize * 3 - 30, blockSize - 10);
        ctx.closePath();
    }
}
export default paints;