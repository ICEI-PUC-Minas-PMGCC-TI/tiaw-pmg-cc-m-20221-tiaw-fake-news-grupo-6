// Database

// Retorna o banco de dados

/**
 * Retorna o banco de dados.
 * @returns {Object}
 */
export function getDatabase() {
  return JSON.parse(localStorage.getItem("db"));
}

/**
 * Salva o banco de dados.
 * @param {*} db 
 */
export function setDatabase(db) {
  localStorage.setItem("db", JSON.stringify(db));
}

// Sessão

/**
 * // Retorna o usuário logado. Se não houver usuário logado, retorna null.
 * @returns {Object}
 */
export function getSessionAccount() {
  const account = sessionStorage.getItem("user");
  return account == null ? null : JSON.parse(account);
}

/**
 * Desconecta o usuário logado e o redireciona para a página inicial.
 */
export function logout() {
  sessionStorage.removeItem("user");
  window.location = "login.html";
}

// Alertas

/**
 * Cria um alerta dentro do #alert com a mensagem e o tipo (cor do bootstrap) passados.
 * @param {String} message 
 * @param {String} type 
 */
export function alert(message, type) {
  let element = document.createElement("div");
  element.innerHTML = `
  <div class="alert alert-${type} alert-dismissible" role="alert">
    <div>${message}</div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `
  document.getElementById("alert").append(element);
}