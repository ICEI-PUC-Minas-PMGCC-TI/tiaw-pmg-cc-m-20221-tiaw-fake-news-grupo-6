window.onload = function() {
    if(localStorage.getItem("db") == null) {
        localStorage.setItem("db", {
            "accounts": []
        });
    }
};

document.getElementById("loginForm").onsubmit = function(event) {
    login(event.target.email, event.target.password);
}

function login(email, password) {
    let acc = getAccount(email);
    if(acc != null) {
        sessionStorage.setItem("user", acc);
    }
}