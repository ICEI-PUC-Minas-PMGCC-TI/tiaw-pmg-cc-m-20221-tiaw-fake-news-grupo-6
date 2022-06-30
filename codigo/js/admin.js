import { 
  getDatabase, 
  getSessionAccount, 
  setDatabase,
  logout, 
  alert 
} from "./modulos/utils.js";

window.onload = () => {
  const user = getSessionAccount();

  if(user === null) {
    window.location = "login.html";
  }

  if (user.type != 3) {
    window.location = "index.html";
  }

  reloadAccounts();
}

document.getElementById("logout").onclick = logout;

var reloadAccounts = () => {
  const db = getDatabase();

  document.getElementById("accounts").innerHTML = "";

  db.accounts.forEach(account => {

    let element = document.createElement("tr");
    element.id = account.id;
    element.innerHTML = `
      <th scope="row">${account.id}</th>
      <td>${account.firstName}</td>
      <td>${account.secondName}</td>
      <td>${account.email}</td>
      <td>${getType(account.type)}</td>
    `;
    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger d-inline";
    deleteButton.innerHTML = "Excluir";
    deleteButton.onclick = () => deleteAccount(account.id);
    element.appendChild(deleteButton);

    let editButton = document.createElement("button");
    editButton.className = "btn btn-warning d-inline px-2";
    editButton.innerHTML = "Editar";
    editButton.onclick = () => editAccount(account.id);

    let buttons = document.createElement("td");
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);

    element.appendChild(buttons);

    document.getElementById("accounts").appendChild(element);
  });
}

function getType(n) {
  switch (n) {
    case "1": return "Cadastrador";
    case "2": return "Jornalista";
    case "3": return "Administrador";
  }
}

function deleteAccount(id) {
  let db = getDatabase();
  const index = db.accounts.findIndex(account => {
    return account.id == id;
  });
  db.accounts.splice(index, 1);
  setDatabase(db);
  document.getElementById(id).remove();
}


function editAccount(id) {
  let db = getDatabase();
  let account = db.accounts.find(account => {
    return account.id == id;
  });

  document.getElementById("firstName").value = account.firstName;
  document.getElementById("secondName").value = account.secondName;
  document.getElementById("email").value = account.email;
  document.getElementById("editForm").name = account.id;

  switch (account.type) {
    case 1: document.getElementById("typeAInput").checked = true; break;
    case 2: document.getElementById("typeBInput").checked = true; break;
    case 3: document.getElementById("typeCInput").checked = true; break;
  }

  $("#exampleModal").modal('toggle');
}

document.getElementById("editForm").onsubmit = event => {
  event.preventDefault();
  let target = $(event.target);


  let id = document.getElementById("editForm").name;
  let db = getDatabase();
  let i = db.accounts.findIndex(account => account.id == id);
  db.accounts[i].firstName = target.find("#firstName").val();
  db.accounts[i].secondName = target.find("#secondName").val();
  db.accounts[i].email = target.find("#email").val();
  db.accounts[i].password = target.find("#password").val();
  db.accounts[i].type = parseInt(document.querySelector('input[name="type"]:checked').value);

  setDatabase(db);
  reloadAccounts();

  alert("Alterações feitas", "success");
}

document.getElementById("close").onclick = () => {
  document.getElementById("alert").innerHTML = "";
}

document.getElementById("registerForm").onsubmit = event => {
  event.preventDefault();
  let target = $(event.target);
  let db = getDatabase();

  // Exemplo de conta nova:
  let newAccount = {
      "id": Math.random().toString(16).slice(2),
      "firstName": document.getElementById("firstNameInputRegister").value,
      "secondName": document.getElementById("secondNameInputRegister").value,
      "email": document.getElementById("emailInputRegister").value,
      "password": document.getElementById("passwordInputRegister").value, // falta fazer o hash da senha (criptografia)
      // Tipo 1: Cadastrador de notícias; Tipo 2: Jornalistas; Tipo 3: Administrador
      "type": parseInt(document.getElementById("type").value)
  };

  if(getAccount(newAccount.email) === undefined) {
      db.accounts.push(newAccount);
      setDatabase(db);
      reloadAccounts();
  } else {
      //alert("Email já cadastrado", "danger");
  }
}

var getAccount = email => {
  let db = getDatabase();

  return db.accounts.find(account => {
      return account.email == email;
  })
}