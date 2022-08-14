const express = require("express");
const router = express.Router();
const compression = require("compression");
const InfoController = require("../controllers/infoController");

router.get("",InfoController.obtenerInformacionDelSistema);

router.get("/comprimida", compression(),InfoController.obtenerInformacionDelSistema);



module.exports = router;