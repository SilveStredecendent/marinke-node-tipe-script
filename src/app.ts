import express, { type Request, type Response } from 'express';
import produtoRoutes from './routes/produto.routes.js';
import funcionarioRoutes from './routes/funcionario.routes.js';
import clientesRouter from './routes/cliente.route.js';

const app = express();

app.use(express.json());

// Rotas integradas
app.use("/produtos", produtoRoutes);
app.use("/funcionarios", funcionarioRoutes);
app.use("/clientes", clientesRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("API está rodando perfeitamente! Acesse /produtos, /funcionarios ou /clientes");
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});