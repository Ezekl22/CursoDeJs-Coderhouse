
let eleccionNoValida = false;
let salir = false;

eleccionInicial();

function eleccionOperacion(mensaje, cantOpciones, mensajeOpciones){

    let eleccion = prompt(mensaje + "\n" + mensajeOpciones);
    while(eleccionCorrecta(eleccion , cantOpciones) === false){
        eleccion = prompt(TEXT_REINTENTO_SELECCION + mensaje + "\n" + mensajeOpciones).replace(/ /g, "");
    }
    return eleccion;
}

function eleccionInicial(){
    let eleccion = eleccionOperacion("Hola, " + TEXT_SELECCION_OPERACION, 2, TEXT_OPERACIONES_INICIALES);
    
    switch(eleccion){
        // case "1" : 
        //     loguearUsuario();
        // break;
        case "1" :
            const usuario = new Usuario();
            alert(TEXT_CUENTA_CREADA +
                  TEXT_EMAIL      + usuario.email    + "\n" +
                  TEXT_NOMBRE     + usuario.nombre   + "\n" +   
                  TEXT_APELLIDO   + usuario.apellido + "\n" +
                  TEXT_EDAD       + usuario.edad     + "\n" +
                  TEXT_CAT_FISCAL + usuario.catFiscal());
            menuUsuario(usuario);
        break;
        case "2" : 
            alert(TEXT_DESPEDIDA);
        break;
    }
}

function menuUsuario(usuario){
    let menu = eleccionOperacion(usuario.nombre + " " + usuario.apellido + "\n" + 
                                 TEXT_OPERACION_USUARIO , 2, TEXT_OPCIONES_USUARIO);
    switch(menu){
        // case "1": //Compra

        // break;
        case "1"://Publicar automovil para la venta
            let continuar = true;
            while(continuar){
                usuario.vehiculosVenta.push(new Vehiculo());
                continuar = confirm("¿Decea continuar la carga de vehiculos para la venta?");
            }

            for(i = 0; i < usuario.vehiculosVenta.length; i++){
                alert("Marca: "  + usuario.vehiculosVenta[i].marca  + "\n" + 
                      "Modelo: " + usuario.vehiculosVenta[i].modelo + "\n" +
                      "Valor: $" + usuario.vehiculosVenta[i].precioContado + "\n"+
                      "*-------------------*");
            }
            
        break;
        case "2": // Salir
            eleccionInicial();
        break;
    }
}

function eleccionCorrecta(eleccion, cantOpciones){
    if(eleccion > 0 && eleccion <= cantOpciones){
        return true;
    }else{
        return false;
    }
}

// function loguearUsuario(){

// }