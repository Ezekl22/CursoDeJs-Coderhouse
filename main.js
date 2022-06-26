
let eleccionNoValida = false;
let salir = false;
const usuarios = [];

checkLogin("inicio");

//creo un usuario root para no tener que estar creando todo el tiempo una cuenta 
const admin = new usuario("admin","1234","Administrador","Administrador","99","exento"); 
usuarios.push(admin);

function ocultarInicio(){
    document.getElementById("carouselExampleDark").style.display = "none";
}

 function cerrarSesion(){
    localStorage.removeItem("usuarioLog");
    ocultarMenuUsuario();
    mostrarInicio();
}

function mostrarInicio(){
    const menuUsuario = document.getElementById("contMnUsuario");

    if(menuUsuario){
        menuUsuario.remove();
    }
    ocultarMenuUsuario();
    document.getElementById("carouselExampleDark").style.display = "block";
}

function loginUsuario(){
    const popUp = document.getElementById("ventPopUp");
    const email = document.getElementById("correoTxtP").value;
    const contrasenia = document.getElementById("contraTxtP").value;
    const usuario = loginCorrecto(email, contrasenia);
    

    if(usuario === false){
        if(!document.getElementById("textError")){
            const subtitulo = document.getElementById("subTituloP");
            const textError = document.createElement("span");

            textError.className = "logSubtitulo";
            textError.id = "textError";
            textError.textContent = "La contraseña o el correo ingresado es incorrecto";
            textError.style = "color: red;"

            subtitulo.appendChild(textError); 
        }
    }else{

        localStorage.setItem("usuarioLog", JSON.stringify(usuario)); 

        popUp.remove();

        menu_usuario(usuario);
    }
}

function usuarioLogueado(){
    return JSON.parse(localStorage.getItem("usuarioLog"));
}

function loginCorrecto(email, contrasenia){
    for (let usuario of usuarios) {
        if (usuario.email === email && usuario.contrasenia === contrasenia){
            return usuario;
        }else{
            return false;
        }
    }
}

function mostratMenuUsuario(){

    const contNavPills = document.getElementById("contNavPills");

    contNavPills.style.display = "";
}

function ocultarMenuUsuario(){

    const contNavPills = document.getElementById("contNavPills");

    contNavPills.style.display = "none";
}

function crearUsuario(){

    const email = document.getElementById("textEmail").value;
    const contrasenia = document.getElementById("textContraseña").value;
    const nombre = document.getElementById("textNombre").value;
    const apellido = document.getElementById("textApellido").value;
    const edad = document.getElementById("textEdad").value;
    const categoriaFiscal = document.getElementById("selCatFiscalP").value;
    

    if(email && contrasenia && nombre && apellido && edad && categoriaFiscal){
        
        const popUp = document.getElementById("ventPopUp");
        const newUsuario = new usuario(email, contrasenia, nombre, apellido, edad, categoriaFiscal);

        popUp.remove();

        localStorage.setItem("usuarioLog", JSON.stringify(newUsuario));

        loginUsuario();

        usuarios.push(newUsuario);

    }else if(!document.getElementById("mensajeError")) {
        
        const mensajeError = document.createElement("spam");
        const contTitulo = document.getElementById("contTituloCU")

        mensajeError.className = "logSubtitulo";
        mensajeError.id = "mensajeError";
        mensajeError.textContent = "Debe completar todos los campos ";
        mensajeError.style.color = "red";

        contTitulo.appendChild(mensajeError);
    }

}

function checkLogin(accion){
    const usuario =  usuarioLogueado();
    if(usuario || accion === "inicio"){
        
        switch (accion) { // muesto el popup de cargar vehiculo
            case "1":
                popUp('3');
            break;
            case "2":// muesto el menu de usuario
                ocultarInicio();
                menu_usuario(usuario);
            break;

            case "inicio":// muesto el menu de usuario
               
            break;
        
            default: //solo muestro el menu de usuario
                ocultarInicio();
                menu_usuario(usuario);
            break;
        }
    }else{
        popUp('1');
    }
        
}

function cargarVehiculo(){
    const datosCorrectos = usuario && marca && modelo && anioCreacion && tipo && aireAcondicionado && calefaccion && tipoDireccion && cantPuertas && precioContado;

    const usuario =  usuarioLogueado();
    const marca = document.getElementById("").value;
    const modelo = document.getElementById("").value;
    const anioCreacion = document.getElementById("").value;
    const tipo = document.getElementById("").value;
    const aireAcondicionado = document.getElementById("aireChek").value;
    const calefaccion = document.getElementById("calefChek").value;
    const tipoDireccion = document.getElementById("").value;
    const cantPuertas = document.getElementById("").value;
    const precioContado = document.getElementById("").value;

    if(datosCorrectos){
        const vehiculo = new Vehiculo(marca, modelo, anioCreacion, tipo, aireAcondicionado, calefaccion, tipoDireccion, cantPuertas, precioContado);
        usuario.cargarVehiculo(vehiculo);
        localStorage.removeItem("usuarioLog");
        localStorage.setItem("usuarioLog", JSON.stringify(usuario));
    }else{
        const contTitulo = document.getElementById("contTituloCV");
        const subtitulo = document.createElement("spam");

        subtitulo.color = "red";
        subtitulo.textContent = "debe completar todos los campos";

        contTitulo.appendChild(subtitutulo);
    }
      
    usuario.cargarVehiculo();
}