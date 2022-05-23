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

    console.log(user);

    let db = getDatabase();

    db.account.forEach(account => {
        document.getElementById("contas").append(`
        <div class="d-flex justify-content-between">
            <span>{account.name}</span>
            <div>
                <span>Tipo: </span>
                <span>{account.type == 1 ? "Cadastrador" : "Jornalista"}</span>
            </div>
        </div>
        `);
    });
}


// Database lib
var getDatabase = function() {
    return JSON.parse(localStorage.getItem("db"));
}

var setDatabase = function(db) {
    localStorage.setItem("db", JSON.stringify(db));
}