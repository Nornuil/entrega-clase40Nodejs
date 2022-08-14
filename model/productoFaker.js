const {faker} = require("@faker-js/faker");



module.exports = class ProductoFaker{


     getListaDeProductos(cantidad=10){
        const productosFaker = new Array();
        for (let index = 0; index < cantidad; index++) {
            const obj = {
                id:faker.random.alphaNumeric(5),
                urlImg: faker.image.image(),
                desc: faker.lorem.lines(),
                nombre: faker.commerce.productName(),
                marca: faker.commerce.productDescription(),
                gama: faker.commerce.productMaterial(),
                tipo: faker.commerce.product(),
                stock:  faker.finance.amount(1,20,0),
                precio: faker.finance.amount(10000,78000,2,"$"),
                cuotas: faker.finance.amount(3,12,0)
            };
            
            productosFaker.push(obj);
        }
        return productosFaker;
    }
}