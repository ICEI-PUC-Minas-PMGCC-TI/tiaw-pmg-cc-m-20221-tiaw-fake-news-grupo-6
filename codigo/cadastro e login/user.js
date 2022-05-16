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
    console.log(user);

    $("#firstName").text(user.firstName);
    $("#secondName").text(user.secondName);
    $("#email").text(user.email);
    $("#password").text(user.password);
    $("#type").text(user.type == 1 ? "Jornalista" : user.type == 2 ? "Cadastrador de notícias" : "Administrador");
}