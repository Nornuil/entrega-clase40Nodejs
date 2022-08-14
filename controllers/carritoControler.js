const Carrito = require("../model/carrito");

module.exports = class CarritoController{

    static async obtenerCarritoDelUsuario(req, res){
        const carrito = new Carrito(req.session.passport.user.username);
        const datos = await carrito.obtenerCarritosDelUsuario();
        if(datos){
            const respuesta ={status:"ok",code:200,message:`Solicitud procesada exitosamente`, carrito:datos};
            req.app.io.sockets.emit("refresh-carrito",{respuesta});
            res.status(200).json(respuesta);

        }else{
            res.status(204).json({status:"ok",code:204,message:`Sin contenido`,carrito:{productos:[]}});
        }


    }

    static async agregarProductoAlCarrito(req, res){
        const carrito = new Carrito(req.session.passport.user.username);
        const producto = req.body;
        const carritoActualizado = await carrito.agregarProductoAlCarrito(producto);
        if(carritoActualizado){
            const respuesta ={status:"ok",code:200,message:`Se agrego producto al carrito`, carrito:await carrito.obtenerCarritosDelUsuario()};
            req.app.io.sockets.emit("refresh-carrito",{respuesta});
            res.status(200).json(respuesta);
        }else{
            res.status(204).json({status:"ok",message:"No se pudo procesar la solicitud", code:204});
        }
    }

    static async quitarProductoDelCarrito(req,res){
        const {idProducto}=req.params;
        const carrito = new Carrito(req.session.passport.user.username);
        if(idProducto){
            const carritoActualizado = await carrito.borrarProductoDeUnCarrito(idProducto);
            if(carritoActualizado){
                const respuesta ={status:"ok",code:200,message:`Se elimino producto del carrito`, carrito:await carrito.obtenerCarritosDelUsuario()};
                req.app.io.sockets.emit("refresh-carrito",{respuesta});
                res.status(200).json(respuesta);
            }else{
                res.status(204).json({status:"ok",message:"No se pudo procesar la solicitud", code:204}); 
            }
        }else{
            res.status(204).json({status:"ok",message:"No se pudo procesar la solicitud", code:204});
        }

    }
    static async procesarCompra(req,res){
        const carrito = new Carrito(req.session.passport.user.username);
        const carritoActualizado = await carrito.procesarCompraDelCarrito(req.session.passport.user);
        if(carritoActualizado){
            const respuesta ={status:"ok",message:"Venta procesada con exito", code:200, carrito:{productos:[]}};
            req.app.io.sockets.emit("refresh-carrito",{respuesta});
            res.status(200).json(respuesta);
        }else{
            res.status(204).json({status:"ok",message:"No se pudo procesar la solicitud", code:204});
        }
    }
}