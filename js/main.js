
let eleccionNoValida = false;
let salir = false;

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

!getUsuarios() && cargarUsuariosDB(URL);

function recargarVehiculosCookie(){
    localStorage.removeItem("vehiculosV");
    const usuarioLog = getUsuarioLogueado();
    const vehiculosUsLog = usuarioLog ? usuarioLog.vehiculosVenta : [];

    for(let usuario of getUsuarios()){
        if (usuario.vehiculosVenta){
            if(usuario.vehiculosVenta.length > 0 ){
                for(let vehiculoV of usuario.vehiculosVenta){
                    if (vehiculosUsLog.length > 0 && vehiculosUsLog[0].id == vehiculoV.id)
                        break;
                    setVehiculoVenta(vehiculoV);
                        
                    
                }
            }
        }
    }
}

const ocultarInicio = () =>{
    document.getElementById("carouselExampleDark").style.display = "none";
}

const cerrarSesion = () =>{
    localStorage.removeItem("usuarioLog");
    ocultarMenuUsuario();
    cambiarBtnLogin();
    mostrarInicio();
}

function mostrarInicio() {
    const menuUsuario = document.getElementById("contMnUsuario");
    
    if (menuUsuario)
        menuUsuario.remove();

    ocultarCatalogo();
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
        recargarVehiculosCookie();
        cambiarBtnLogin();
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
            (usuario.id === usuarios[i].id) && usuarios.splice(i,1);
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
    miPerfilMenu();
}

const ocultarMenuUsuario = () =>{
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
            case "2":
                mostrarCatalogo();
                break
            case "inicio":// muesto el menu de usuario
                cambiarBtnLogin();
                break;
            default: //solo muestro el menu de usuario
                cambiarBtnLogin();
                ocultarInicio();
                ocultarCatalogo();
                menu_usuario();
                break;
        }
    } else {
        popUp('1');
    }

}

function cambiarBtnLogin(){
    const usuario = getUsuarioLogueado();
    const loginBtn = document.getElementById("loginBtnTxt");
    loginBtn.textContent = usuario ? usuario.nombre : "Ingresar";
}


function cargarVehiculo() {

    const usuario = getUsuarioLogueado();
    const marca = document.getElementById("MarcaCV").value;
    const modelo = document.getElementById("ModeloCV").value;
    const anioCreacion = document.getElementById("AnioCV").value;
    const tipo = document.getElementById("selTipoVehiculo").value;
    const aireAcondicionado = document.getElementById("aireChek").checked === true ? "si" : "no";
    const calefaccion = document.getElementById("calefChek").checked === true ? "si" : "no";
    const tipoDireccion = document.getElementById("selTipoDir").value;
    const cantPuertas = document.getElementById("CantPuertasCV").value;
    const precioContado = document.getElementById("precioVInput").value;
    const datosCorrectos = marca && modelo && anioCreacion && cantPuertas && precioContado;


    if (datosCorrectos) {
        const {id:usuarioId} = usuario;
        const vehiculo = new Vehiculo(marca, modelo, anioCreacion, tipo, aireAcondicionado, calefaccion, tipoDireccion, cantPuertas, precioContado, usuarioId);
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
        let vehiculosV = getVehiculosVenta() ? getVehiculosVenta() : [];

        vehiculosV.push(vehiculo);
        localStorage.removeItem("vehiculosV");
        localStorage.setItem("vehiculosV", JSON.stringify(vehiculosV));
    }
}

const getVehiculosVenta = ()=>{
    return JSON.parse(localStorage.getItem("vehiculosV"));
}

const mostrarCatalogo = () =>{
    const contMensaje = document.getElementById("contMensajeC");
    contMensaje && contMensaje.remove();
    const contCatalogo = document.createElement("div");
    const contMensajeC = document.createElement("div");

    contMensajeC.textContent = "En este momento no hay vehiculos para la compra";
    contMensajeC.id = "contMensajeC";

    contCatalogo.className = "contV";
    contCatalogo.id = "contCatalogo";

    recargarVehiculosCookie();
    if (getVehiculosVenta()) {
        contCatalogo.appendChild(cards(3));
    }else{
        contCatalogo.appendChild(contMensajeC);
    }
    
    ocultarMenuUsuario();
    ocultarInicio();

    document.body.appendChild(contCatalogo);
}

const ocultarCatalogo = ()=>{
    const catalogo = document.getElementById("contCardsCat");
    const contMensaje = document.getElementById("contMensajeC");
    contMensaje && contMensaje.remove();
    catalogo && catalogo.remove();
}

const editar = (id)=>{
    let text;
    const text2 = document.querySelector(`#emailExt`);
    const select = document.querySelector(`#${id} select`);
    const boton = document.querySelector(`#${id} button`);
        
    text = id != "wdg3" && document.querySelector(`#${id} input`);
    if(text)
        text.hasAttribute("disabled")? text.removeAttribute("disabled"): text.setAttribute("disabled","");
    if(id == "wdgEmail")
        text2.hasAttribute("disabled")? text2.removeAttribute("disabled"): text2.setAttribute("disabled","");
    if(select)
        select.hasAttribute("disabled") ? select.removeAttribute("disabled") : select.setAttribute("disabled","");
    if(select ? select.hasAttribute("disabled") : false || text ? text.hasAttribute("disabled"): false){
        boton.textContent = "Editar"
        editarUsuario(id);
    }else{
        boton.textContent = "Guardar";
    }
}

const editarUsuario = (id)=>{
    const selectValue = (id == "wdg3") && document.querySelector(`#${id} select`).value;
    const inputTextValue = id != "wdg3" && document.querySelector(`#${id} input`).value;
    const extencionEmail = document.querySelector(`#emailExt`).value;
    const usuario= getUsuarioLogueado();
    const datoSelect = selectValue && selectValue;
    let datoModificado = false;
    switch (id) {
        case "wdg0": //Nombre
            if(usuario.nombre != inputTextValue){
                usuario.nombre = inputTextValue;
                datoModificado = true;
            }
            break;
        case "wdg1"://apellido
            if(usuario.apellido != inputTextValue){
                usuario.apellido = inputTextValue;
                datoModificado = true;
            }
            break;
        case "wdg2"://edad
            if(usuario.edad != inputTextValue){
                usuario.edad = inputTextValue;
                datoModificado = true;
            }
            break;
        case "wdg3"://categoria fiscal
            if(usuario.categoriaFiscal != datoSelect){
                usuario.categoriaFiscal = datoSelect;
                datoModificado = true;
            }
            break;
        case "wdgEmail"://Email
            if(usuario.email != `${inputTextValue}@${extencionEmail}`){
                usuario.email = `${inputTextValue}@${extencionEmail}`;
                datoModificado = true;
            }
            break;
        case "wdg5"://contraseña
            if(usuario.contrasenia != inputTextValue){
                usuario.contrasenia = inputTextValue;
                datoModificado = true;
            }
            break;
    }
    if(datoModificado){
        setUsuario(usuario);
        setUsuarioLogueado(usuario);
    }
}

const cargarId = (tipo) =>{
    let idMayor = 0;

        switch (tipo) {
            case 1:
                const usuarios = getUsuarios();
                usuarios && usuarios.forEach(usuario => idMayor = usuario.id > idMayor ? usuario.id : idMayor);
                break;
            case 2:
                const vehiculos = getVehiculosVenta();
                vehiculos && vehiculos.forEach(vehiculo => idMayor = vehiculo.id > idMayor ? vehiculo.id : idMayor);
                break;
            default:
                    mensajeError("tipo erroneo al intentar cargar el id");
                break;
        }

    return idMayor + 1;
}

function comprar (vehiculo){
    const usuarioLog = getUsuarioLogueado();
    const usuario = getUsuario(vehiculo.duenioId);
    const popUp = document.getElementById("ventPopUp");

    indice = usuario.vehiculosVenta.findIndex(vehiculoU => vehiculoU.id == vehiculo.id);
    usuario.vehiculosVenta.splice(indice,1);
    usuarioLog.compras.push(vehiculo);

    setUsuario(usuarioLog);
    setUsuario(usuario);
    recargarVehiculosCookie();
    setUsuarioLogueado(usuarioLog);
    popUp.remove();
    menu_usuario();
}

function getUsuario (usuarioId){
    const usuarios = getUsuarios();
    const usuario = usuarios.find(usuario => usuario.id == usuarioId);
    return usuario
}

function eliminarCard(id, vehiculo){
    const usuarioLog = getUsuarioLogueado();
    const card = document.getElementById(id);

    indice = usuarioLog.vehiculosVenta.findIndex(vehiculoU => vehiculoU.id == vehiculo.id);
    usuarioLog.vehiculosVenta.splice(indice,1);
    
    setUsuarioLogueado(usuarioLog);
    setUsuario(usuarioLog);
    recargarVehiculosCookie();
    card.remove();
    menu_usuario();
}