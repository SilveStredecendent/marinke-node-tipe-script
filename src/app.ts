import express, { type Request, type Response } from 'express';
import { sequelize } from './config/database.js';
import produtoRoutes from './routes/produto.routes.js';
import funcionarioRoutes from './routes/funcionario.routes.js';
import clientesRouter from './routes/cliente.routes.js';

const app = express();

app.use(express.json());

app.use('/produtos', produtoRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/clientes', clientesRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('API está rodando perfeitamente! Acesse /produtos, /funcionarios ou /clientes');
});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
  });
});