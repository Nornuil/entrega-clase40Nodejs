const express = require("express");
const router = express.Router();
const session= require("express-session");
const cookieParse = require("cookie-parser");
const MongoStore = require("connect-mongo");
const passport = require("../modules/passport/passport");
const mdw = require("../middlewares/middlewares");
const upload = require("../modules/multer/multer"); //importo multer para agregarlo como mdw en el endpoint
const UsuarioController = require("../controllers/usuarioController");




//middlewares
//agreggo mdw de passport
router.use(cookieParse());
router.use(session({
    store:MongoStore.create({mongoUrl:process.env.STRING_CONNECTION, mongoOptions:{useNewUrlParser:true, useUnifiedTopology:true}}),
    secret:"shhhhhhhhhhhhhhhhhhhhhh",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:600000
    }
}));
router.use(passport.initialize());
router.use(passport.session());

//routes
router.get("/",mdw.validarSession,UsuarioController.renderizarHome);

router.get("/login",UsuarioController.renderizarLogin); 
router.get("/failLogin",UsuarioController.renderizarFalloAlLoguear); 
router.get("/failAlta",UsuarioController.renderizarFalloAlRegistrar); 
router.post("/login",passport.authenticate("login",{failureRedirect:"/failLogin", successRedirect:"/"}));

router.post("/alta",upload.single("archivo"),passport.authenticate("alta",{failureRedirect:"/failAlta", successRedirect:"/"}));

router.get("/alta",UsuarioController.renderizarRegistrar);
router.post("/logout",UsuarioController.desloguearUsuario);



module.exports = router;