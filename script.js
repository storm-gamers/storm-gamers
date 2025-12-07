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
        startGame();
    })
    .catch(err => {
        console.log(err);
        alert("Error saving data.");
    });
});

// ---------------- FLAPPY BIRD GAME ----------------
function startGame() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    let bird = { x: 50, y: height/2, width: 30, height: 30, dy: 0 };
    const gravity = 0.6;
    const flap = -10;

    let pipes = [];
    const pipeWidth = 60;
    const pipeGap = 150;
    let pipeSpeed = 2;

    let score = 0;

    document.addEventListener('keydown', e => { if(e.code==="Space") bird.dy = flap; });
    document.addEventListener('mousedown', e => { bird.dy = flap; });

    function createPipe() {
        let topHeight = Math.random() * (height - pipeGap - 50) + 25;
        pipes.push({ x: width, top: topHeight, bottom: height - topHeight - pipeGap });
    }

    function resetGame() {
        bird = { x: 50, y: height/2, width: 30, height: 30, dy: 0 };
        pipes = [];
        score = 0;
        pipeSpeed = 2;
        document.getElementById("gameScore").innerText = "Score: 0";
    }

    function draw() {
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, width, height);

        bird.dy += gravity;
        bird.y += bird.dy;
        ctx.fillStyle = "#0ff";
        ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

        if(Math.random() < 0.02) createPipe();
        for(let i=0;i<pipes.length;i++){
            let p = pipes[i];
            p.x -= pipeSpeed;

            ctx.fillStyle = "#ff00ff";
            ctx.fillRect(p.x, 0, pipeWidth, p.top);
            ctx.fillStyle = "#00ffff";
            ctx.fillRect(p.x, height-p.bottom, pipeWidth, p.bottom);

            if(bird.x < p.x + pipeWidth && bird.x + bird.width > p.x &&
               (bird.y < p.top || bird.y + bird.height > height - p.bottom)) {
                   resetGame(); return;
               }

            if(!p.scored && p.x + pipeWidth < bird.x){
                score++; p.scored=true;
                document.getElementById("gameScore").innerText = "Score: " + score;
                if(score%5===0) pipeSpeed+=0.5;
            }
        }

        if(bird.y + bird.height > height || bird.y < 0) { resetGame(); return; }

        requestAnimationFrame(draw);
    }

    draw();
}
