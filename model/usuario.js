const UsuariosDAO = require("../dao/usuariosDAOMongoDb");
const gestorUsuario = new UsuariosDAO();
const { encriptarPassword, esPassWordValido } = require("../modules/bcrypt/bcrypt");
const enviarCorreoElectronico = require("../modules/nodemailer/nodemailer");

module.exports = class Usuario{


    constructor(datos){
        this.username=datos.username;
        this.password=datos.password;
        this.nombre=datos.nombre;
        this.edad = datos.edad;
        this.direccion = datos.direccion;
        this.img = datos.imagen;
        this.setTelefono(datos.codNacion,datos.codArea,datos.numTelefono);
    }




    setTelefono(codNacion, codArea, numTelefono){
        if(codNacion && codArea && numTelefono){
            this.telefono = codNacion+"9"+codArea+numTelefono;
        }
    }

    static async loguearUsuario(username, password){
        if(username && password){
            const usuarios = await gestorUsuario.getAllElementos();
            return usuarios.find(u=> u.username === username && esPassWordValido(u.password,password));
        }
    }

    async crearNuevoUsuario(){
        if(this.#esUsuarioValido()){
            const usuarios = await gestorUsuario.getAllElementos();
            const usuarioAux = usuarios.find(u=> u.username === this.username);
            if(!usuarioAux){
                const obj = {...this,password:encriptarPassword(this.password)};
                console.log(obj);
                const res = await gestorUsuario.addElementos(obj);
                console.log(res);
                return true;
            }
        }
    }

    #esUsuarioValido(){
        return this.username != undefined && this.password != undefined
        && this.direccion != undefined && this.telefono != undefined &&
        this.nombre != undefined && this.edad != undefined && this.img != undefined  ;
    }

    #getPlantillaDeBienvenida(){
        return `<section style="background-color: blanchedalmond;">
        <h1>Bienvenido ${this.nombre}</h1><br>
        <p>Usted se ha dado de alta de forma exitosa en la app de Alejandro Bongioanni</p><br>
        <ul>
            <li>Usuario: ${this.username}</li>
            <li>Nombre: ${this.nombre}</li>
            <li>Edad: ${this.edad}</li>
            <li>Direccion: ${this.direccion}</li>
            <li>Telefono: ${this.telefono}</li>
        </ul>
        </section>`;
    }

    async notificarAlta(){
        await enviarCorreoElectronico(this.username, `Bienvenido ${this.nombre}`,this.#getPlantillaDeBienvenida());
    }

    

}