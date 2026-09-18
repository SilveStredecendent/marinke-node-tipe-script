const express = require("express");
const router = express.Router();
const controller = require("../controllers/produtos.controller");

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.post("/", controller.criar);

module.exports = router;