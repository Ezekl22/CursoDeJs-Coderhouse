
let eleccionNoValida = false;
let salir = false;
const usuarios = [];

//creo un usuario root para no tener que estar creando todo el tiempo una cuenta 
const admin = new usuario("admin","1234","Administrador","Administrador","99","exento"); 
usuarios.push(admin);

function ocultarInicio(){
    document.getElementById("carouselExampleDark").style.display = "none";
}

function mostrarInicio(){
    const menuUsuario = document.getElementById("contMnUsuario");
    if(menuUsuario){
        menuUsuario.remove();
    }
    document.getElementById("carouselExampleDark").style.display = "block";
}

function loginUsuario(){
    const popUp = document.getElementById("ventPopUp");
    const email = document.getElementById("correoTxtP").value;
    const contrasenia = document.getElementById("contraTxtP").value;
    

    if(loginCorrecto(email, contrasenia)){
        
        popUp.remove();

        menu_usuario();
    }else{
        if(!document.getElementById("textError")){
            const subtitulo = document.getElementById("subTituloP");
            const textError = document.createElement("span");

            textError.className = "logSubtitulo";
            textError.id = "textError";
            textError.textContent = "La contraseña o el correo ingresado es incorrecto";
            textError.style = "color: red;"

            subtitulo.appendChild(textError);
        }
    }
}

function loginCorrecto(email, contrasenia){
    for (let usuario of usuarios) {
        if (usuario.email === email && usuario.contrasenia === contrasenia){
            return true;
        }else{
            return false;
        }
    }
}

function crearUsuario(){
    const email = document.getElementById("");
    const contrasenia = document.getElementById("");
    const nombre = document.getElementById("");
    const apellido = document.getElementById("");
    const edad = document.getElementById("");
    const categoriaFiscal = document.getElementById("");
    
    const nuevoUsuario = new usuario(email, contrasenia, nombre, apellido, edad, categoriaFiscal);
    usuarios.push(nuevoUsuario);
}