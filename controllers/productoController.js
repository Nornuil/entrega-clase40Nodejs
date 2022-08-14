const ProductoFaker = require("../model/productoFaker");


module.exports = class ProductoController{

    static obtenerListadoDeProductos(req,res){
        if(req.session.passport){
            const productos = new ProductoFaker();
            res.status(200).json({status:"ok",code:200,productosFaker:productos.getListaDeProductos(), usuario:req.session.passport.user,message:`Solicitud procesada con exito`});
        }else{
            
            res.status(401).json({status:"error",code:401,productosFaker:[], usuario:null, message:`No se recibieron algunos de los datos necesarios para obtener el carrito`});
        }
    }
}