class Usuario{

    constructor (){
        this.email = prompt(TEXT_CREAR_USUARIO + TEXT_EMAIL);
        this.contraseña = prompt(TEXT_CONTRASENIA);
        this.nombre = prompt(TEXT_NOMBRE);
        this.apellido = prompt(TEXT_APELLIDO);
        this.edad = prompt(TEXT_EDAD);
        this.categoriaFiscal = eleccionOperacion(TEXT_CAT_FISCAL, 4, TEXT_OPCIONES_CATEGORIA);
        this.vehiculosVenta = [];
        //this.compras = [];
    }

    esMayor(){
        return this.edad > 17;
    }

    // cargarCompra(compra){
    //      this.compras.push(compra);
    // }

    cargarVehiculoVenta(vehiculo){
        this.vehiculosVenta.push(vehiculo);
    }

    catFiscal(){
        let categoriaFiscal = "";
        switch(this.categoriaFiscal){
            case "1":
                categoriaFiscal = TEXT_MONOTRIBUTISTA;
            break;
            case "2":
                categoriaFiscal = TEXT_RESP_INSC;
            break;
            case "3":
                categoriaFiscal = TEXT_EXENTO;
            break;
            case "4":
                categoriaFiscal = TEXT_CONS_FINAL;
            break;
        }
        return categoriaFiscal;
    }
    
    agregarVenta(){
        
    }
}