const NOMBRE_CORRECTO="usuario";
let nombre ="";
nombre = prompt("Ingrese el nombre de usuario");
let nombreIncorrecto = nombre != NOMBRE_CORRECTO;

if(nombreIncorrecto){
    for(let i = 0; i<2; i++){
        nombre = prompt("El nombre ingresado es incorrecto, vuelva a intentarlo");
        if(i==1){
            confirm("Ha exedido el numero de intentos, vuelva a probar mas tarde");
        }
    }
}else{
    confirm("El nombre es correcto, bienvenido!");
}
