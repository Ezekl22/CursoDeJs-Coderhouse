class usuario{

    constructor (email, contrasenia, nombre, apellido, edad, categoriaFiscal){
        this.id = usuarioId();
        this.email = email;
        this.contrasenia = contrasenia;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.categoriaFiscal = categoriaFiscal;
        this.vehiculosVenta = [];
        this.compras = [];
    }

    usuarioId = ()=>{
        let idMayor = 0;
        getUsuarios().forEach(usuario => idMayor = usuario.id > idMayor && usuario.id);
        return idMayor + 1;
    }

    getEsMayor(){
        return this.edad > 17;
    }

    setCompra(compra){
        this.compras.push(compra);
    }

    getCatFiscal(){
        return this.categoriaFiscal;
    }
    
    setVendido(){
        
    }
}