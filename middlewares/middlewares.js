const logger = require("../logs/logger");

function rutaNoImplementada(req,res,_next){
    logger.getLogger("warn").warn({ruta:req.path, metodo:req.method});
    res.render("pages/error");
}

function validarSession(req,res, next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        logger.getLogger("warn").warn({ruta:req.path, metodo:req.method});
        res.status(200).redirect("login");
    }
}

module.exports = {rutaNoImplementada, validarSession};