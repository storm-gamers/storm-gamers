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

        // Hide login and show game container
        document.querySelector(".login-box").style.display = "none";
        document.getElementById("gameContainer").style.display = "block";

        // → You will paste the new FLAPPY BIRD CLONE code here later
    })
    .catch(err => {
        console.log(err);
        alert("Error saving data.");
    });
});
