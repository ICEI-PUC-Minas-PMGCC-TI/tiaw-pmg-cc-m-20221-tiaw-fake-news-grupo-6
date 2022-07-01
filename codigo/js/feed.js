// simples imports de funções 
import { 
    getDatabase, 
    getSessionAccount, 
    setDatabase,
    logout, 
    alert 
  } from "./modulos/utils.js";


const user = getSessionAccount();

if(user === null) {
    window.location = "login.html";
}

// Exemplo:
console.log(user.firstName)