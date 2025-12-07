const form = document.getElementById('loginForm');
form.addEventListener('submit', e => {
    e.preventDefault();
    
    const data = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value
    };
    
    fetch("YOUR_WEB_APP_URL", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        alert("Welcome to the portal, warrior!");
        form.reset();
    })
    .catch(err => {
        console.log(err);
        alert("Error saving data.");
    });
});
