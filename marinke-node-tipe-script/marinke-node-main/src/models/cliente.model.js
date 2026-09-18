class Cliente {
    constructor({ id, nome, email }) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }

    estaAtivo() {
        return this.email !== '';
    }       
}

module.exports = Cliente;