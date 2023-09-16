import paints from "./paints.js";
function start() {
    document.getElementById("start").disabled = true;

    let player, goal;
    let speed = 20;
    let dir;
    let walls = [];
    let stones = [];
    let bombs = []
    let pause = false;
    let win = false;

    let time = 120;
    let minutes, seconds, timeFormat;
    let timer = setInterval(function () {
        time--;
        if (time <= 0) {
            clearInterval(timer);
            paints.gameOverScreen(time);
        }
    }, 1000);

    let bg = new Audio;
    let xpWin = new Audio;
    let tntExplosion = new Audio;
    bg.src = './sounds/minecraft-bg.mp3';
    xpWin.src = './sounds/minecraft-subir-nivel.mp3';
    tntExplosion.src = './sounds/minecraft-tnt-explosion.mp3';

    let xpBall = new Image;
    let steve = new Image;
    let bedrock = new Image;
    let obsidian = new Image;
    let stone = new Image;
    let tnt = new Image;
    xpBall.src = './images/minecraft_xp_ball.webp';
    steve.src = './images/minecraft-steve-head.jpg';
    bedrock.src = './images/bedrock.webp';
    obsidian.src = './images/obsidian.png';
    stone.src = './images/stone.jpeg';
    tnt.src = './images/minecraft-tnt.png';

    bg.play();

    class Rectangule {
        constructor(x, y, w, h, c, img, destroyed = false) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.img = img;
            this.destroyed = destroyed;
        }

        repaintRect() {
            paints.rect(this.img, this.x, this.y, this.w, this.h);
        }

        collision(rect) {
            switch (dir) {
                case 38://bottom
                    player.y = rect.y + rect.h;
                    break;
                case 37://left
                    player.x = rect.x + rect.w;
                    break;
                case 40://top
                    player.y = rect.y - 40;
                    break;
                case 39://right
                    player.x = rect.x - 40;
                    break;
            }
            dir = 0;
        }

        goal() {
            player.c = goal.c;
            xpWin.play();
            clearInterval(timer);
            win = true;
            paints.winScreen();
        }
    }

    class Bomb {
        constructor(x, y, img) {
            this.x = x;
            this.y = y;
            this.w = 40;
            this.h = 40;
            this.img = img;

            this.explodeIn = 5;
            this.timeBomb = setInterval(function () {
                this.explodeIn--;
                if (this.explodeIn == 1) {
                    this.explosion();
                }
                if (this.explodeIn <= 0) {
                    bombs.shift();
                    clearInterval(this.timeBomb);
                }
            }.bind(this), 1000);
            tntExplosion.currentTime = 0;
            tntExplosion.play();
        }

        repaintBomb() {
            if (!(this.explodeIn <= 1)) {
                paints.bomb(this.img, this.x, this.y, this.w, this.h);
            } else {
                paints.explosion(this.x, this.y, this.w, this.h);
            }
        }

        explosion() {
            //destroy stone for explosion
            stones.forEach(stone => {
                if (//check rect 1
                    (this.x < stone.x + stone.w &&
                        this.x + 40 > stone.x &&
                        this.y - 50 < stone.y + stone.h &&
                        this.y - 50 + 140 > stone.y) ||
                    //check rect 2
                    (this.x - 50 < stone.x + stone.w &&
                        this.x - 50 + 140 > stone.x &&
                        this.y < stone.y + stone.h &&
                        this.y + 40 > stone.y)) {
                    stone.destroyed = true;
                }
            });
        }
    }

    player = new Rectangule(50, 50, 40, 40, null, steve);
    goal = new Rectangule(950, 450, 50, 50, null, xpBall);
    //bedrock wall
    for (let j = 0; j < 13; j++) {
        for (let i = 0; i < 24; i++) {
            if (j == 0 || j == 12) {
                walls.push(new Rectangule(0 + i * 50, 0 + j * 50, 50, 50, null, bedrock));
            } else {
                if (i == 0 || i == 22) {
                    walls.push(new Rectangule(0 + i * 50, 0 + j * 50, 50, 50, null, bedrock));
                }
            }
        }
    }
    //obsidian walls
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 10; i++) {
            walls.push(new Rectangule(100 + i * 100, 100 + j * 100, 50, 50, null, obsidian));
        }
    }

    //stones
    let generateStones = () => {
        for (let j = 0; j < 11; j++) {
            for (let i = 0; i < 21; i++) {
                if ((i != 0 || j != 0) && (i != 1 || j != 0) && (i != 0 || j != 1) && (i != 18 || j != 8) && //exlude stones
                Math.round(Math.random()) == 1) {//random stones
                    stones.push(new Rectangule(50 + i * 50, 50 + j * 50, 50, 50, null, stone));
                }
            }
        }
    };
    generateStones();

    document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
            case 38://up
                if (!pause) {
                    player.y -= speed;
                    dir = e.keyCode;
                    if (player.y <= 50) { player.y = 50 }
                }
                break;
            case 37://left
                if (!pause) {
                    player.x -= speed;
                    dir = e.keyCode;
                    if (player.x <= 50) { player.x = 50 }
                }
                break;
            case 40://down
                if (!pause) {
                    player.y += speed;
                    dir = e.keyCode;
                    if (player.x >= 1100) { player.x = 1060 }
                }
                break;
            case 39://right
                if (!pause) {
                    player.x += speed;
                    dir = e.keyCode;
                    if (player.y >= 600) { player.y = 560 }
                }
                break;
            case 65://"a"-place-bombs
                if (!bombs.length == 1) {
                    bombs.push(new Bomb(player.x, player.y, tnt));
                }
                break;
            case 27://pause-esc
                if (time != 0 && !win) {
                    pause = !pause;
                    if (!pause) {
                        timer = setInterval(function () {
                            time--;
                            if (time == 0) {
                                clearInterval(timer);
                                paints.gameOverScreen(time);
                            }
                        }, 1000)
                    } else {
                        clearInterval(timer);
                    }
                    paints.pauseScreen();
                }
                break;
            case 82://"r"-restart
                if (win) { win = false; }
                player.x = 50;
                player.y = 50;
                bg.currentTime = 0;
                time = 120;
                stones = [];
                generateStones();
                break;
        }
    });

    function update() {
        //colisions and repaints
        if (!pause && time != 0 && !win) {
            paints.blank();
            bombs.forEach(bomb => {
                bomb.repaintBomb();
            });

            stones.forEach(stone => {
                if (!stone.destroyed) {
                    if (player.x < stone.x + stone.w && player.x + player.w > stone.x && player.y < stone.y + stone.h && player.y + player.h > stone.y) {
                        stone.collision(stone);
                    }
                    stone.repaintRect();
                }
            });
            walls.forEach(wall => {
                if (player.x < wall.x + wall.w && player.x + player.w > wall.x && player.y < wall.y + wall.h && player.y + player.h > wall.y) {
                    wall.collision(wall);
                }
                wall.repaintRect();
            });

            paints.timer(time, minutes, seconds, timeFormat);
            goal.repaintRect();
            player.repaintRect();

            if (player.x < goal.x + goal.w && player.x + player.w > goal.x && player.y < goal.y + goal.h && player.y + player.h > goal.y) {
                player.goal();
            }

        }

        window.requestAnimationFrame(update);
    }

    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 60);
            };
    }());

    window.requestAnimationFrame(update);
}
document.getElementById("start").addEventListener("click", start);