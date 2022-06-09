var logout = () => {
    console.log("Logout");
    sessionStorage.removeItem("user");
    window.location = "login.html";
}

window.onload = () => {
    if(sessionStorage.getItem("user") == null) {
        window.location = "login.html";
    }

    let user = JSON.parse(sessionStorage.getItem("user"));

    if(user.type != 3) {
        window.location = "index.html";
    }

    console.log(user.firstName);
    let db = getDatabase();
    var toAppend = "";
    db.accounts.forEach(account => {
        toAppend +=`
        <div id="${account.id}" class="d-flex justify-content-between">
          <span>${account.firstName}</span>
          <div>
            <span>Tipo: </span>
            <span>${account.type == 1 ? "Cadastrador" : "Jornalista"}</span>
            <button type="button" class="btn btn-danger d-inline" onclick="apagarConta(${account.id})">Apagar</button>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-warning d-inline" data-bs-toggle="modal"
              data-bs-target="#exampleModal" onclick="alterarContaButton(${account.id})">
              Alterar
            </button>

          </div>
        </div>
        `;
    });
    document.getElementById("contas").innerHTML = toAppend;
}

var apagarConta = id => {
    let db = getDatabase();
    let index = db.accounts.findIndex(account => {
        return account.id == id;
    });
    db.accounts.splice(index, 1);
    setDatabase(db);
    document.getElementById(id).remove();
}

var alterarContaButton = id => {
    let db = getDatabase();
    let account = db.accounts.find(account => {
        return account.id == id;
    });

    $("#firstName").placeholder = account.firstName;
    $("#secondName").placeholder = account.secondName;
    $("#email").placeholder = account.email;
    document.getElementById("alterarContaForm").tagName = account.id;
}

var alterarContaFormSubmit = event => {
    console.log("alterarContaFormSubmit");
    let id = document.getElementById("alterarContaForm").tagName;
    let db = getDatabase();
    let i = db.accounts.findIndex(account => account.id === id);
    db.accounts[i].firstName = target.find("#firstNameInput").val();
    db.accounts[i].secondName = target.find("#secondNameInput").val();
    db.accounts[i].email = target.find("#emailInput").val();
    target.find("typeAInput").val() ? db.accounts[i].type = 1 : 
    target.find("typeBInput").val() ? db.accounts[i].type = 2 : 3;
    setDatabase(db);
}

// Database lib
var getDatabase = function() {
    return JSON.parse(localStorage.getItem("db"));
}

var setDatabase = function(db) {
    localStorage.setItem("db", JSON.stringify(db));
}

