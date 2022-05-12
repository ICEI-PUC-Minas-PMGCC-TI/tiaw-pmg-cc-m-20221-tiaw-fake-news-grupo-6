window.onload = function() {
    if(localStorage.getItem("db") == null) {
        localStorage.setItem("db", JSON.stringify({
            "accounts": []
        }));
    }
    console.log(localStorage.getItem("db"));
};

function loginFormSubmit(event) {
    event.preventDefault();
    login(event.target.email, event.target.password);
}

function registerFormSubmit(event) {
    event.preventDefault();

    login(event.target.email, event.target.password);
}

function login(email, password) {
    let acc = getAccount(email);
    if(acc != null && acc.password == password) {
        sessionStorage.setItem("user", acc);
    } else {
        // Senha incorreta ou email inválido
    }
}


document.getElementById("registerForm").onsubmit = function(event) {
    let db = localStorage.getItem("db");
    let acc = db["accounts"];
    //if(event.target.email )

    // Exemplo de conta:
    acc.push({
        "id": acc.length, // pode causar ambiguidades, precisa de backend
        "firstName": event.target.firstName,
        "secondName": event.target.secondName,
        "email": event.target.email,
        "password": event.target.password, // falta criptografia
        "type": 1
    });

    db["accounts"] = acc;
    localStorage.setItem("db", db);
    console.log(localStorage.getItem("db"))
}

function getAccount(email) {
    let db = localStorage.getItem("db");
    let acc = db["accounts"];

    for (account in acc) {
        if(account.email == email) {
            return account;
        } 
    }
}