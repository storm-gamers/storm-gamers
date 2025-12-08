// ---------------- LOGIN + GOOGLE SHEET ----------------
const form = document.getElementById('loginForm');

form.addEventListener('submit', e => {
    e.preventDefault();

    const data = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value
    };

    fetch("https://script.google.com/macros/s/AKfycby0FlDiGBUvB6y2S_Idhos4zmyHek8CkPO4GBDmHzE168C_MGOzuZjYRZf8Q9yjEKYS/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        alert("Welcome to the portal, warrior!");

        document.querySelector(".login-box").style.display = "none";
        document.getElementById("gameContainer").style.display = "block";

        setTimeout(() => {
            startP5Game();
        }, 200);
    })
    .catch(err => {
        console.log(err);
        alert("Error saving data.");
    });
});


// ---------------- REAL P5.JS FLAPPY BIRD CLONE ----------------
let bird;
let pipes = [];
let gameScore = 0;
let flapForce = -11;
let gravity = 0.6;

function startP5Game() {

    new p5(function(p) {

        p.setup = function () {
            let parentDiv = document.getElementById("gameContainer");

            let canvas = p.createCanvas(400, 600);
            canvas.parent(parentDiv);

            bird = {
                x: 70,
                y: p.height / 2,
                r: 20,
                dy: 0
            };

            pipes = [];
            gameScore = 0;

            createFlapButton();
        };

        p.draw = function () {
            p.background(15);

            // Bird physics
            bird.dy += gravity;
            bird.y += bird.dy;

            p.fill("#00ffff");
            p.circle(bird.x, bird.y, bird.r * 2);

            // Make pipes
            if (p.frameCount % 90 === 0) {
                let gap = 150;
                let top = p.random(50, p.height - gap - 50);
                pipes.push({ x: p.width, top: top, bottom: p.height - top - gap });
            }

            // Draw pipes
            for (let i = pipes.length - 1; i >= 0; i--) {
                let pipe = pipes[i];
                pipe.x -= 3;

                p.fill("#ff00ff");
                p.rect(pipe.x, 0, 60, pipe.top);

                p.fill("#ff00ff");
                p.rect(pipe.x, pipe.top + 150, 60, pipe.bottom);

                // Collision
                if (
                    bird.x + bird.r > pipe.x &&
                    bird.x - bird.r < pipe.x + 60 &&
                    (bird.y - bird.r < pipe.top ||
                        bird.y + bird.r > p.height - pipe.bottom)
                ) {
                    restartGame();
                }

                // Score
                if (pipe.x + 60 < bird.x && !pipe.scored) {
                    pipe.scored = true;
                    gameScore++;
                    document.getElementById("gameScore").innerText = "Score: " + gameScore;
                }

                if (pipe.x < -60) pipes.splice(i, 1);
            }

            // Fall out of screen
            if (bird.y > p.height || bird.y < 0) {
                restartGame();
            }
        };

        p.keyPressed = function () {
            if (p.key === ' ') flap();
        };

        p.touchStarted = function () {
            flap();
        };
    });
}



// ---------------- FLAP + RESTART ----------------
function flap() {
    bird.dy = flapForce;
}

function restartGame() {
    bird.y = 300;
    bird.dy = 0;
    pipes = [];
    gameScore = 0;
    document.getElementById("gameScore").innerText = "Score: 0";
}


// ---------------- MOBILE BUTTON ----------------
function createFlapButton() {
    let btn = document.createElement("div");
    btn.innerText = "FLAP";
    btn.style.position = "absolute";
    btn.style.bottom = "40px";
    btn.style.right = "40px";
    btn.style.padding = "20px 25px";
    btn.style.background = "#00ffff";
    btn.style.color = "black";
    btn.style.fontSize = "22px";
    btn.style.fontWeight = "bold";
    btn.style.borderRadius = "14px";
    btn.style.boxShadow = "0 0 10px cyan";
    btn.style.cursor = "pointer";
    btn.style.userSelect = "none";
    btn.style.zIndex = "20000";

    btn.onclick = flap;
    document.body.appendChild(btn);
}
