class usuario{

    constructor (email, contrasenia, nombre, apellido, edad, categoriaFiscal){
        this.id = cargarId(1);
        this.email = email;
        this.contrasenia = contrasenia;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.categoriaFiscal = categoriaFiscal;
        this.vehiculosVenta = [];
        this.compras = [];
    }
}