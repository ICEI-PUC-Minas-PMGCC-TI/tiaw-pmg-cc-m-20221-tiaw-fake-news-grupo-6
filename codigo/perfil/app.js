// declara um conjunto inicial de contatos
var db_contatos_inicial = {
    "data": [
        {
            "id": 1,
            "nome": "Usuario",
            "cidade": "Belo Horizonte",
            "email": "usuario@gmail.com",
            "telefone": "(11) 9999-9999",
            "data": "19/07/2001",
            "cep": "15315-465",
            "cpf": "661.712.163-56",
            "categoria": "Usuário"
        }
    ]
}

// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var db = JSON.parse(localStorage.getItem('db_contato'));
if (!db) {
    db = db_contatos_inicial
};

// Exibe mensagem em um elemento de ID msg
function displayMessage(msg) {
    $('#msg').html('<div class="alert alert-warning">' + msg + '</div>');
}


function updateContato(id, contato) {
    // Localiza o indice do objeto a ser alterado no array a partir do seu ID
    let index = db.data.map(obj => obj.id).indexOf(id);

    // Altera os dados do objeto no array
        db.data[index].nome = contato.nome,
        db.data[index].cidade = contato.cidade,
        db.data[index].email = contato.email,
        db.data[index].telefone = contato.telefone,
        db.data[index].data = contato.data,
        db.data[index].cep = contato.cep,
        db.data[index].cpf = contato.cpf,
        db.data[index].categoria = contato.categoria,


        displayMessage("Contato alterado com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_contato', JSON.stringify(db));
}

function deleteContato(id) {
    // Filtra o array removendo o elemento com o id passado
    db.data = db.data.filter(function (element) { return element.id != id });

    displayMessage("Contato removido com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_contato', JSON.stringify(db));
}