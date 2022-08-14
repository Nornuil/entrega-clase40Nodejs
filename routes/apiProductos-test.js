const express = require ("express");
const ProductoController = require("../controllers/productoController");
const router = express.Router();


router.get("",ProductoController.obtenerListadoDeProductos);




module.exports = router;