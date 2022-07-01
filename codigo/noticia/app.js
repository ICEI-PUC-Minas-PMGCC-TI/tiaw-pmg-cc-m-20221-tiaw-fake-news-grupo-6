// declara um conjunto inicial de contatos
var db_noticias_inicial = {
  data: [
    {
      id: 1,
      titulo: "teste1 - testando titulo",
      website: "https://teste.com/",
      autor: "Testa Testando",
      data: "21/21/2021",
      status: "Aguardando verificação &#x1F557",
    },
    {
      id: 2,
      titulo: "teste2 - testando titulo",
      website: "https://teste.io/",
      autor: "Testando Testando",
      data: "21/21/2021",
      status: "Aguardando verificação &#x1F557",
    },
    {
      id: 3,
      titulo: "teste3 - testando titulo",
      website: "https://teste.org/",
      autor: "Aquele teste",
      data: "21/21/2021",
      status: "Aguardando verificação &#x1F557",
    },
    {
      id: 4,
      titulo: "teste 4 - testando titulo",
      website: "https://teste.biz/",
      autor: "Testo Testando",
      data: "21/21/2021",
      status: "Aguardando verificação &#x1F557",
    },
  ],
};

// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var db = JSON.parse(localStorage.getItem("db_noticia"));
if (!db) {
  db = db_noticias_inicial;
}

// Exibe mensagem em um elemento de ID msg
function displayMessage(msg) {
  $("#msg").html('<div class="alert alert-warning">' + msg + "</div>");
}

function insertNoticia(noticia) {
  // Calcula novo Id a partir do último código existente no array (PODE GERAR ERRO SE A BASE ESTIVER VAZIA)
  let novoId = 1;
  if (db.data.length != 0) novoId = db.data[db.data.length - 1].id + 1;
  noticia.status = "Aguardando verificação &#x1F557";
  let novoNoticia = {
    id: novoId,
    titulo: noticia.titulo,
    website: noticia.website,
    autor: noticia.autor,
    data: noticia.data,
    status: noticia.status,
  };

  // Insere o novo objeto no array
  db.data.push(novoNoticia);
  displayMessage("Noticia inserida com sucesso");

  // Atualiza os dados no Local Storage
  localStorage.setItem("db_noticia", JSON.stringify(db));
}

function updateNoticia(id, noticia) {
  // Localiza o indice do objeto a ser alterado no array a partir do seu ID
  let index = db.data.map((obj) => obj.id).indexOf(id);

  // Altera os dados do objeto no array
  (db.data[index].titulo = noticia.titulo),
    (db.data[index].website = noticia.website),
    (db.data[index].autor = noticia.autor),
    (db.data[index].data = noticia.data),
    (db.data[index].status = noticia.status);

  displayMessage("Noticia alterada com sucesso");

  // Atualiza os dados no Local Storage
  localStorage.setItem("db_noticia", JSON.stringify(db));
}

function updateStatus(id, noticia) {
  let index = db.data.map((obj) => obj.id).indexOf(id);
  noticia.status = "Verdadeira";
  db.data[index].status = noticia.status;
  displayMessage("Status alterado com sucesso");
  // Atualiza os dados no Local Storage
  localStorage.setItem("db_noticia", JSON.stringify(db));
}

function deleteNoticia(id) {
  // Filtra o array removendo o elemento com o id passado
  db.data = db.data.filter(function (element) {
    return element.id != id;
  });

  displayMessage("Contato removido com sucesso");

  // Atualiza os dados no Local Storage
  localStorage.setItem("db_noticia", JSON.stringify(db));
}

function insertStatusV(noticia) {
  // Calcula novo Id a partir do último código existente no array (PODE GERAR ERRO SE A BASE ESTIVER VAZIA)

  noticia.status = "Verdadeira &#9989";
  let novoStatus = {
    status: noticia.status,
  };

  // Insere o novo objeto no array
  db.data.push(novoStatus);

  // Atualiza os dados no Local Storage
  localStorage.setItem("db_noticia", JSON.stringify(db));
}

function insertStatusD(noticia) {
  // Calcula novo Id a partir do último código existente no array (PODE GERAR ERRO SE A BASE ESTIVER VAZIA)

  noticia.status = "Duvidosa &#10067;";
  let novoStatus = {
    status: noticia.status,
  };

  // Insere o novo objeto no array
  db.data.push(novoStatus);

  // Atualiza os dados no Local Storage
  localStorage.setItem("db_noticia", JSON.stringify(db));
}

function insertStatusF(noticia) {
  // Calcula novo Id a partir do último código existente no array (PODE GERAR ERRO SE A BASE ESTIVER VAZIA)

  noticia.status = "Fake News &#10060;";
  let novoStatus = {
    status: noticia.status,
  };

  // Insere o novo objeto no array
  db.data.push(novoStatus);

  // Atualiza os dados no Local Storage
  localStorage.setItem("db_noticia", JSON.stringify(db));
}
