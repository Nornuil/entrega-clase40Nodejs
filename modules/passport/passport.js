const passport = require("passport");
const {Strategy:localStrategy} = require("passport-local");
const Usuario = require("../../model/usuario");



//config
//configuro passport, dentro obtiene los usuarios de la BD
passport.use("login", new localStrategy(async (username, password, done)=>{
    const usuario =  await Usuario.loguearUsuario(username,password);
    if(usuario){
        return done(null, usuario);
    }
    return done(null,false);
}));

passport.use("alta", new localStrategy({ passReqToCallback: true },async (req,_username, _password, done)=>{
    const nuevoUsuario = new Usuario({...req.body,imagen:req.file.filename});

    if(await nuevoUsuario.crearNuevoUsuario()){
        await nuevoUsuario.notificarAlta();
        return done(null,nuevoUsuario);

    }
 }));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

module.exports= passport;