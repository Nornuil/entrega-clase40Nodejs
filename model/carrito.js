const carritoDAO = require("../dao/carritoDAOMongoDb");
const gestorCarrito = new carritoDAO();
const enviarCorreoElectronico = require("../modules/nodemailer/nodemailer");
const { enviarSms, enviarWhatsApp } = require("../modules/twilio/twilio");
module.exports = class Carrito{


    constructor(username){
        this.username = username;
    }

    async obtenerCarritosDelUsuario(){
        if(this.username){
            return (await gestorCarrito.getAllElementos()).filter(carrito => carrito.username === this.username).shift();
        }
    }

    async agregarProductoAlCarrito(producto){
        if(producto){
            const carritoDelUsuario = await this.obtenerCarritosDelUsuario();
            if(carritoDelUsuario){
                const productoExistente = carritoDelUsuario.productos.find(p=> p.id === producto.id);
                if(productoExistente){
                    productoExistente.cantidad++;
                }else{
                    carritoDelUsuario.productos.push(producto);
                }
                return gestorCarrito.updateElemento(carritoDelUsuario._id, carritoDelUsuario);
            }
            else{
                return gestorCarrito.addElementos({username:this.username,productos:new Array(producto)});
            }
        }
    }
    
    async borrarProductoDeUnCarrito(idProducto){
        if(idProducto){
            const carrito = await this.obtenerCarritosDelUsuario();
            if(carrito){
                const producto = carrito.productos.find(p=> p.id === idProducto);
                if(producto){
                    if((producto.cantidad-1) <= 0){
                        carrito.productos = carrito.productos.filter(p=> p.id != idProducto);
                    }else{
                        producto.cantidad--;
                    }
                    await gestorCarrito.updateElemento(carrito._id,carrito);
                    return true;
                }
            }
        }
    }
    async procesarCompraDelCarrito(usuario){
        const carrito = await this.obtenerCarritosDelUsuario();
        if(carrito){
            await enviarCorreoElectronico(process.env.MAIL_ADMIN,`Nuevo Pedido de ${usuario.nombre} - Email: ${usuario.username}`,Carrito.#generarPlantillaDeProductos(carrito.productos));
            await enviarSms(usuario.telefono, "Su pedido ha sido recidibo y se encuentra en proceso");
            await enviarWhatsApp(process.env.TELEFONO_ADMIN,`Nuevo Pedido de ${usuario.nombre} - Email: ${usuario.username}`);
            return  gestorCarrito.deleteElementoById(carrito._id);
            
        }
    }
    static #generarPlantillaDeProductos(productos){
        let lista = "<ul>";
        if(Array.isArray(productos)){
            
            for (const key in productos) {
                lista+= `<li>Producto: ${productos[key].nombre} - Cantidad: ${productos[key].cantidad}</li>`;
            }
        }
        lista+="</ul>";
        return lista;
    }
}