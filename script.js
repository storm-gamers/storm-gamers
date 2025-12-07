/* BASIC RESET */
body, html {
    margin: 0;
    padding: 0;
    font-family: 'Orbitron', sans-serif;
    height: 100%;
    overflow: hidden;
    background: #0d0d0d;
    color: #fff;
}

/* CENTER LOGIN BOX */
.container {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* LOGIN BOX */
.login-box {
    background: rgba(0,0,0,0.85);
    padding: 40px;
    border-radius: 15px;
    border: 2px solid #ff00ff;
    box-shadow: 0 0 30px #ff00ff, 0 0 60px #00ffff;
    width: 350px;
    text-align: center;
}

/* HEADER */
.login-box h1 {
    margin-bottom: 25px;
    text-shadow: 0 0 5px #ff00ff, 0 0 10px #00ffff;
}

/* INPUT FIELDS */
.login-box input {
    width: 100%;
    padding: 14px;
    margin: 10px 0;
    border-radius: 8px;
    border: none;
    outline: none;
    background: rgba(255,255,255,0.05);
    color: white;
    font-size: 16px;
    transition: all 0.3s ease;
}

.login-box input:focus {
    background: rgba(255,255,255,0.15);
    box-shadow: 0 0 5px #ff00ff, 0 0 10px #00ffff;
}

/* ENTER BUTTON */
.enter-btn {
    width: 100%;
    padding: 14px;
    margin-top: 15px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(90deg, #ff00ff, #00ffff);
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-shadow: 0 0 5px #000;
}

.enter-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px #ff00ff, 0 0 40px #00ffff;
}

/* CANVAS BACKGROUND */
canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
}
