const express = require("express");
const CarritoController = require("../controllers/carritoControler");
const router = express.Router();
const mdw = require("../middlewares/middlewares");

router.get("",mdw.validarSession,CarritoController.obtenerCarritoDelUsuario);

router.post("",mdw.validarSession,CarritoController.agregarProductoAlCarrito);

router.post("/comprar",mdw.validarSession, CarritoController.procesarCompra);

router.delete("/:idProducto",mdw.validarSession, CarritoController.quitarProductoDelCarrito);

module.exports = router;