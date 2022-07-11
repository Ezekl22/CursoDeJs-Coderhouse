
let eleccionNoValida = false;
let salir = false;
//const admin = new usuario("admin", "1234", "Administrador", "Administrador", "99", "exento")
const URL = `DB/Usuarios.json`;
checkLogin("inicio");

const cargarUsuariosDB = (URL) =>{
    let usuarios;
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        usuarios = data;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

    })
};
//creo un usuario root para no tener que estar creando todo el tiempo una cuenta 
// const cargaInicial = () =>{

// }
!getUsuarios() && cargarUsuariosDB(URL);

//recargarVehiculosCookie();

function recargarVehiculosCookie(){
    localStorage.removeItem("vehiculosV");
    for(let usuario of getUsuarios()){
        if (usuario.vehiculosVenta){
            if(usuario.vehiculosVenta.length > 0 ){
                for(let vehiculoV of usuario.vehiculosVenta){
                    setVehiculoVenta(vehiculoV);
                }
            }
        }
    }
}

function ocultarInicio() {
    document.getElementById("carouselExampleDark").style.display = "none";
}

function cerrarSesion() {
    localStorage.removeItem("usuarioLog");
    ocultarMenuUsuario();
    mostrarInicio();
}

function mostrarInicio() {
    const menuUsuario = document.getElementById("contMnUsuario");

    if (menuUsuario) {
        menuUsuario.remove();
    }
    ocultarMenuUsuario();
    document.getElementById("carouselExampleDark").style.display = "block";
}

function loginUsuario() {
    const popUp = document.getElementById("ventPopUp");
    let emailLog = document.getElementById("correoTxtP").value;
    let contraseniaLog = document.getElementById("contraTxtP").value;
    if (!(emailLog && contraseniaLog)) {
        emailLog = document.getElementById("correoTxtP").value;
        contraseniaLog = document.getElementById("contraTxtP").value;
    }

    const usuario = loginCorrecto(emailLog, contraseniaLog);


    if (usuario === false) {
        if (!document.getElementById("textError")) {
            const subtitulo = document.getElementById("subTituloP");
            const textError = document.createElement("span");

            textError.className = "logSubtitulo";
            textError.id = "textError";
            textError.textContent = "La contraseña o el correo ingresado es incorrecto";
            textError.style = "color: red;"

            subtitulo.appendChild(textError);
        }
    } else {

        setUsuarioLogueado(usuario);

        popUp.remove();

        menu_usuario();
    }
}

function getUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios"));
}


function setUsuario(usuario) {
    if (usuario) {
        let usuarios = getUsuarios() ? getUsuarios() : [];

        for(let i = 0; i< usuarios.length; i++){
            (usuario.email === usuarios[i].email) && usuarios.splice(i,1);
        }

        usuarios.push(usuario);
        localStorage.removeItem("usuarios");
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
}

function getUsuarioLogueado() {
    return JSON.parse(localStorage.getItem("usuarioLog"));
}

function setUsuarioLogueado(usuario) {
    if (usuario) {
        localStorage.removeItem("usuarioLog");
        localStorage.setItem("usuarioLog", JSON.stringify(usuario));
    }
}

function loginCorrecto(email, contrasenia) {
    let resultado = false;
    for (const usuario of getUsuarios()) {
        if(usuario.email === email && usuario.contrasenia === contrasenia){
            resultado = usuario;
            break;
        }
    }
    return resultado;
}

function mostratMenuUsuario() {

    const contNavPills = document.getElementById("contNavPills");

    contNavPills.style.display = "";

    vehiculosMenu(1);
    vehiculosMenu(2);
}

function ocultarMenuUsuario() {

    const contNavPills = document.getElementById("contNavPills");

    contNavPills.style.display = "none";
}

function crearUsuario() {

    const email = document.getElementById("textEmail").value;
    const contrasenia = document.getElementById("textContraseña").value;
    const nombre = document.getElementById("textNombre").value;
    const apellido = document.getElementById("textApellido").value;
    const edad = document.getElementById("textEdad").value;
    const categoriaFiscal = document.getElementById("selCatFiscalP").value;


    if (email && contrasenia && nombre && apellido && edad && categoriaFiscal) {

        const popUp = document.getElementById("ventPopUp");
        const newUsuario = new usuario(email, contrasenia, nombre, apellido, edad, categoriaFiscal);

        

        popUp.remove();

        localStorage.setItem("usuarioLog", JSON.stringify(newUsuario));
        
        setUsuario(newUsuario);

        menu_usuario();

        setUsuario(newUsuario);

    } else if (!document.getElementById("mensajeError")) {

        const mensajeError = document.createElement("spam");
        const contTitulo = document.getElementById("contTituloCU")

        mensajeError.className = "logSubtitulo";
        mensajeError.id = "mensajeError";
        mensajeError.textContent = "Debe completar todos los campos ";
        mensajeError.style.color = "red";

        contTitulo.appendChild(mensajeError);
    }

}

function checkLogin(accion) {
    const usuario = getUsuarioLogueado();
    if (usuario || accion === "inicio") {

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
    } else {
        popUp('1');
    }

}

function cargarVehiculo() {

    const usuario = getUsuarioLogueado();
    const marca = document.getElementById("MarcaCV").value;
    const modelo = document.getElementById("ModeloCV").value;
    const anioCreacion = document.getElementById("AnioCV").value;
    const tipo = document.getElementById("selTipoVehiculo").value;
    const aireAcondicionado = document.getElementById("aireChek").value;
    const calefaccion = document.getElementById("calefChek").value;
    const tipoDireccion = document.getElementById("selTipoDir").value;
    const cantPuertas = document.getElementById("CantPuertasCV").value;
    const precioContado = document.getElementById("precioVInput").value;
    const datosCorrectos = marca && modelo && anioCreacion && cantPuertas && precioContado;


    if (datosCorrectos) {
        const vehiculo = new Vehiculo(marca, modelo, anioCreacion, tipo, aireAcondicionado, calefaccion, tipoDireccion, cantPuertas, precioContado);
        const popUp = document.getElementById("ventPopUp");

        usuario.vehiculosVenta.push(vehiculo);
        setUsuarioLogueado(usuario);
        setUsuario(usuario);
        menu_usuario();
        vehiculosMenu(1);
        popUp.remove();

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Su vehiculo se a cargado correctamente',
            showConfirmButton: false,
            width: 250,
            height:150,
            timer: 1500
        })

    } else {
        const contTitulo = document.getElementById("contTituloCV");
        const subtitulo = document.createElement("spam");

        subtitulo.style.color = "red";
        subtitulo.textContent = "debe completar todos los campos";

        contTitulo.appendChild(subtitulo);
    }
}

function setVehiculoVenta(vehiculo){
    if (vehiculo) {
        let vehiculosV = getViehiculosVenta() ? getViehiculosVenta() : [];

        vehiculosV.push(vehiculo);
        localStorage.removeItem("vehiculosV");
        localStorage.setItem("vehiculosV", JSON.stringify(vehiculosV));
    }
}

function getViehiculosVenta(){
    return JSON.parse(localStorage.getItem("vehiculosV"));
}

function mostrarCatalogo(){
    const contCatalogo = document.createElement("div");

    contCatalogo.className = "contV";
    contCatalogo.id = "contCatalogo";

    contCatalogo.appendChild(cards(3));
    ocultarMenuUsuario();
    ocultarInicio();

    document.body.appendChild(contCatalogo);
    
}

function valorPlanCuota(plan,valorVehiculo, cantCuotas){
    
    const valorTotal = valorPlan(plan,valorVehiculo, cantCuotas);
    return valorTotal / cantCuotas;
}

function valorPlan(plan,valorVehiculo, cantCuotas){
    const interesBase = 0.30;

    // este calculo se realiza para aumentar el interes un 4% 3 cuotas.
    // Ejemplo: si son 6 cuotas el interes es del 38%, pero para 12 cuotas el interes es de 46%
    const interes = interesBase +((cantCuotas/3) * 4); 
    let valorBase;

    switch (plan) {
        case "1": // plan 80/20
            valorBase = valorVehiculo * 0.8;
            break;
        case "2": // plan 70/30
            valorBase = valorVehiculo * 0.7;
            break;
        default:
            valorBase = valorVehiculo;
            break;
    }

    return valorBase + (valorBase * interes);
}

function OcultarCatalogo(){
    const contCatalogo = document.getElementById("contCatalogo");

    contCatalogo.remove();
}