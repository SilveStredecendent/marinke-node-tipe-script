export interface ICliente {
    id?: number;
    nome: string;
    email: string;
}

export class Cliente {
    id?: number | undefined;
    nome: string;
    email: string;

    constructor({ id, nome, email }: ICliente) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }

    estaAtivo(): boolean {
        return this.email !== '';
    }
}