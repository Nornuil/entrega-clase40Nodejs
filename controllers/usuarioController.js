module.exports = class UsuarioController{
    static renderizarHome(req,res){
        res.status(200).render("pages/home",{usuario:req.user.username, foto:req.user.img});
    }
    static renderizarLogin(_req,res){
        res.render("pages/login");
    }
    static renderizarFalloAlLoguear(_req,res){
        res.status(200).render("pages/login",{error:"Usuario o Contraseña invalidos"});
    }
    static renderizarFalloAlRegistrar(_req, res){
        res.status(200).render("pages/registrar",{error:"Usuario ya existente"});
    }
    static renderizarRegistrar(_req, res){
        res.status(200).render("pages/registrar");
    }
    static desloguearUsuario(req,res){
        req.logOut();
        setTimeout(() => {
            res.status(200).redirect("/");  
        }, 3000);
        
    }


}