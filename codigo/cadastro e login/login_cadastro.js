window.onload = function() {
    if(localStorage.getItem("db") == null) {
        localStorage.setItem("db", JSON.stringify({
            "accounts": []
        }));
    }
    console.log(localStorage.getItem("db"));
};

var loginFormSubmit = function(event) {
    event.preventDefault();
    let acc = getAccount(event.target.email);
    if(acc != null && acc.password == event.target.password) {
        sessionStorage.setItem("user", acc);
        window.location('perfil.html'); // Redirecionar 
    } else {
        // Senha incorreta ou email inválido
    }
}

var registerFormSubmit = function(event) {
    event.preventDefault();
    console.log(event);
    let db = getDatabase();

    for(let acc in db.accounts) {
        if(acc.email == event.target.email) {
            console.log("Email já cadastrado.");
            return;
        }
    }

    // Exemplo de conta:
    db.accounts.push({
        "id": db.accounts.length, // pode causar ambiguidades, precisa de backend
        "firstName": event.target.firstName,
        "secondName": event.target.secondName,
        "email": event.target.email,
        "password": event.target.password, // falta criptografia
        "type": 1
    });

    setDatabase(db);
    console.log("Cadastro: "+localStorage.getItem("db"))
}

var getAccount = function(email) {
    let db = getDatabase();
    let acc = db["accounts"];

    for (account in acc) {
        if(account.email == email) {
            return account;
        } 
    }
}

var getDatabase = function() {
    return JSON.parse(localStorage.getItem("db"));
}

var setDatabase = function(db) {
    localStorage.setItem("db", JSON.stringify(db));
}