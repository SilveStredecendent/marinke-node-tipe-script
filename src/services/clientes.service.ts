import { Cliente, ICliente } from '../models/cliente.model';

const clientes: Cliente[] = [
    new Cliente({ id: 1, nome: 'João', email: 'joao@example.com' }),
    new Cliente({ id: 2, nome: 'Maria', email: 'maria@example.com' })
];

export function listar(): Cliente[] {
    return clientes;
}

export function buscarPorId(id: string | number): Cliente | undefined {
    return clientes.find(cliente => cliente.id === Number(id));
}

export function criar(dados: ICliente): Cliente {
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