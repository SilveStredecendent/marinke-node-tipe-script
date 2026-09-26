import { ProdutoRepositorySequelize } from './produto.repository.sequelize.js';
import { sequelize } from '../config/database.js';

describe('ProdutoRepositorySequelize', () => {
  const repository = new ProdutoRepositorySequelize();

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('cria e lista produtos', async () => {
    await repository.criar({ nome: 'Notebook', preco: 3500 });
    const produtos = await repository.listar();

    expect(produtos).toHaveLength(1);
    expect(produtos[0]?.nome).toBe('Notebook');
  });

  it('busca por id', async () => {
    const criado = await repository.criar({ nome: 'Mouse', preco: 100 });
    const encontrado = await repository.buscarPorId(criado.id!);

    expect(encontrado?.nome).toBe('Mouse');
  });

  it('retorna null para id inexistente', async () => {
    const resultado = await repository.buscarPorId(9999);
    expect(resultado).toBeNull();
  });

  it('atualiza produto', async () => {
    const criado = await repository.criar({ nome: 'Teclado', preco: 200 });
    const atualizado = await repository.atualizar(criado.id!, { preco: 250 });

    expect(atualizado?.preco).toBe(250);
  });

  it('remove produto', async () => {
    const criado = await repository.criar({ nome: 'Monitor', preco: 900 });
    const removido = await repository.deletar(criado.id!);
    const buscado = await repository.buscarPorId(criado.id!);

    expect(removido).toBe(true);
    expect(buscado).toBeNull();
  });
});