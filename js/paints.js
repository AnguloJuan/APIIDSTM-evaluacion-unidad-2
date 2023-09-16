let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "#000";

let paints = {
    blank() {
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillRect(0, 0, 1150, 650);
        ctx.closePath();
    },

    pauseScreen() {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, 1150, 650);
        ctx.closePath();

        ctx.beginPath();
        ctx.font = "40px Segoe UI, Tahoma, Geneva, Verdana, sans-serif";
        ctx.fillStyle = "#fff"
        ctx.fillText("Game menu", 450, 260);
        ctx.font = "20px Segoe UI";
        ctx.fillText("Esc Back to the game", 420, 300);
        ctx.closePath();
    },

    winScreen() {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, 1150, 650);
        ctx.closePath();

        ctx.beginPath();
        ctx.font = "40px Segoe UI, Tahoma, Geneva, Verdana, sans-serif";
        ctx.fillStyle = "#fff"
        ctx.fillText("You Win", 450, 260);
        ctx.font = "20px Segoe UI";
        ctx.fillText("Press R to play again", 420, 300);
        ctx.closePath();
    },

    gameOverScreen(time) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, 1150, 650);
        ctx.closePath();

        ctx.beginPath();
        ctx.font = "40px Segoe UI, Tahoma, Geneva, Verdana, sans-serif";
        ctx.fillStyle = "#fff"
        ctx.fillText("Game over", 450, 260);
        ctx.font = "20px Segoe UI";
        time == 0 ? ctx.fillText("Time's up", 500, 300) :
            ctx.fillText("You died", 500, 300);
        ctx.fillText("Press R to reload page", 450, 350);
        ctx.closePath();
    },

    timer(time, minutes, seconds, timeFormat) {
        minutes = Math.floor(time / 60);
        seconds = time % 60;
        timeFormat = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0').substr(0, 2)}`
        ctx.beginPath();
        ctx.font = "20px Segoe UI, Tahoma, Geneva, Verdana, sans-serif";
        ctx.fillStyle = "#fff";
        ctx.fillText("Time remaining: " + timeFormat, 50, 22);
        ctx.fillText("Press Esc to pause", 930, 22);
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