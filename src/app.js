const express = require("express");
const produtoRoutes = require("./routes/produto.routes");
const funcionarioRoutes = require("./routes/funcionario.routes");
const clientesRouter = require("./routes/cliente.route"); 

const app = express();

app.use(express.json());

app.use("/produtos", produtoRoutes);
app.use("/funcionarios", funcionarioRoutes);
app.use("/clientes", clientesRouter);

app.get("/", (req, res) => {
  res.send("API está rodando perfeitamente! Acesse /produtos, /funcionarios ou /clientes");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000!");
});