window.onload = function() {
    if(localStorage.getItem("db") == null) {
        // Criação de banco de dados
        localStorage.setItem("db", JSON.stringify({
            "accounts": [
                {
                    "id": Math.random().toString(16).slice(2),
                    "firstName": "Confia",
                    "secondName": "Administrador",
                    "email": "admin@confia.com",
                    "password": "admin",
                    "type": 3
                },
                {
                    "id": Math.random().toString(16).slice(2),
                    "firstName": "John",
                    "secondName": "Doe",
                    "email": "john.doe@gmail.com",
                    "password": "123",
                    "type": 1
                }
            ]
        }));
        console.log("Banco de dados criado.");
    }
};

var loginFormSubmit = function(event) {
    event.preventDefault();
    let target = $(event.target);

    let email = target.find("#emailInput").val();
    let password = target.find("#passwordInput").val();
    let account = getAccount(email);

    if(account !== undefined && account.password == password) {
        sessionStorage.setItem("user", JSON.stringify(account)); // Informações da conta no SessionStorage (inclusive a senha...)
        if(account.type == 3) {
            window.location = "admin.html";
        } else {
            window.location = "perfil.html";
        } 
    } else {
        alert("Senha incorreta ou email inválido.", "danger");
    }
}

var registerFormSubmit = event => {
    event.preventDefault();
    let target = $(event.target);
    let db = getDatabase();

    // Exemplo de conta nova:
    let newAccount = {
        "id": Math.random().toString(16).slice(2),
        "firstName": target.find("#firstNameInput").val(),
        "secondName": target.find("#secondNameInput").val(),
        "email": target.find("#emailInput").val(),
        "password": target.find("#passwordInput").val(), // falta fazer o hash da senha (criptografia)
        // Tipo 1: Cadastrador de notícias; Tipo 2: Jornalistas; Tipo 3: Administrador
        "type": target.find("#typeAInput").val() ? 1 : 2
    };

    if(getAccount(newAccount.email) === undefined) {
        sessionStorage.setItem("user", JSON.stringify(newAccount)); // Informações da conta no SessionStorage (inclusive a senha...)
        db.accounts.push(newAccount);
        setDatabase(db);
        window.location = "perfil.html"; // Redirecionar
    } else {
        alert("Email já cadastrado", "danger");
    }
}

var getAccount = email => {
    let db = getDatabase();

    return db.accounts.find(account => {
        return account.email == email;
    })
}

var getDatabase = function() {
    return JSON.parse(localStorage.getItem("db"));
}

var setDatabase = function(db) {
    localStorage.setItem("db", JSON.stringify(db));
}

// Alertas
const alertPlaceholder = document.getElementById("alert");

const alert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}