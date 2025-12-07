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

        // Hide only the login box
        document.querySelector(".login-box").style.display = "none";

        // Show the snake game
        document.getElementById("snakeGame").style.display = "block";

        // Start the snake game
        startSnake();
    })
    .catch(err => {
        console.log(err);
        alert("Error saving data.");
    });
});


// ---------------- INFINITE SNAKE GAME WITH SPEED ----------------

function startSnake() {
    const canvas = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");

    let box = 15;
    let snake = [{ x: 9 * box, y: 9 * box }];
    let food = randomFood();
    let score = 0;
    let direction = "RIGHT";
    let speed = 150; // initial interval (ms)
    let gameInterval;

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
        else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    });

    function randomFood() {
        return {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    }

    function resetSnake() {
        snake = [{ x: 9 * box, y: 9 * box }];
        direction = "RIGHT";
        score = 0;
        speed = 150; // reset speed
        food = randomFood();
        document.getElementById("snakeScore").innerText = "Score: 0";

        clearInterval(gameInterval);
        gameInterval = setInterval(draw, speed);
    }

    function draw() {
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, 300, 300);

        // Draw snake
        ctx.fillStyle = "#0ff";
        snake.forEach(s => ctx.fillRect(s.x, s.y, box, box));

        // Draw food
        ctx.fillStyle = "yellow";
        ctx.fillRect(food.x, food.y, box, box);

        // Move snake
        let head = { ...snake[0] };
        if (direction === "UP") head.y -= box;
        if (direction === "DOWN") head.y += box;
        if (direction === "LEFT") head.x -= box;
        if (direction === "RIGHT") head.x += box;

        // Check collisions
        let hitWall = head.x < 0 || head.x >= 300 || head.y < 0 || head.y >= 300;
        let hitSelf = snake.some(s => s.x === head.x && s.y === head.y);

        if (hitWall || hitSelf) {
            alert("💀 You crashed! Snake reset!");
            resetSnake();
            return;
        }

        snake.unshift(head);

        // Eat food
        if (head.x === food.x && head.y === food.y) {
            score++;
            document.getElementById("snakeScore").innerText = "Score: " + score;
            food = randomFood();

            // Increase speed every 3 points
            if (score % 3 === 0 && speed > 50) {
                speed -= 10; // speed up
                clearInterval(gameInterval);
                gameInterval = setInterval(draw, speed);
            }
        } else {
            snake.pop();
        }
    }

    // Start the game
    gameInterval = setInterval(draw, speed);
}
