const service = require("../services/clientes.service"); 

exports.listar = (req, res) => {
  const clientes = service.listar();
  res.status(200).json(clientes);
};

exports.buscarPorId = (req, res) => {
  const cliente = service.buscarPorid(req.params.id);

  if (!cliente) {
    return res.status(404).json({ mensagem: "Cliente não encontrado" });
  }

  res.status(200).json(cliente);
};

exports.criar = (req, res) => {
  try {
    const cliente = service.criar(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};  