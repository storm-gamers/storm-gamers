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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    alert("Welcome, warrior!");
    form.reset();
});
