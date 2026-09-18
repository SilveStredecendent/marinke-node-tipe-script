const Cliente = require('../models/cliente.model');

const clientes = [
    new Cliente({ id: 1, nome: 'João', email: 'joao@example.com' }),
    new Cliente({ id: 2, nome: 'Maria', email: 'maria@example.com' })
];

function listar() {
    return clientes;
}

function buscarPorid(id) {
    return clientes.find(cliente => cliente.id === Number(id));
}

function criar(dados) {
    if (!dados.nome || !dados.email) {
        throw new Error('nome e email são obrigatórios');
    }

    const cliente = new Cliente({
        id: clientes.length + 1,
        nome: dados.nome,
        email: dados.email
    });

    clientes.push(cliente);
    return cliente;
}

module.exports = { listar, buscarPorid, criar };    