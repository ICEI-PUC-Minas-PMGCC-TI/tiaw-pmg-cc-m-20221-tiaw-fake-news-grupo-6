window.onload = function() {
    if(localStorage.getItem("db") == null) {
        localStorage.setItem("db", {
            "accounts": []
        });
    }
};

document.getElementById("registerForm").onload = function(event) {
    let db = localStorage.getItem("db");
    let acc = db["accounts"];
    //if(event.target.email )

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

function login(email, password) {
    let acc = getAccount(email);
    if(acc != null) {
        sessionStorage.setItem("user", acc);
    }
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