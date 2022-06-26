function popUp(tipo) {
    if (!document.getElementById("ventPopUp")) {
        let bodyPopUp = "";
        const ventPopUp = document.createElement("section");
        const contPopUp = document.createElement("div");
        const contBtnCP = document.createElement("div");
        const btnCerrarP = document.createElement("button");

        switch (tipo) {
            case "1": //crea el popUp de login
                bodyPopUp = popUpLogin();
                break;

            case "2"://crea el popUp de creacion de un nuevo usuario
                bodyPopUp = popUpCreacionUs();
                break;

            case "3"://crea el popUp de creacion de un nuevo usuario
                bodyPopUp = popUpCargarVehiculoV();
                break;
        }


        ventPopUp.className = "vtnModal";
        ventPopUp.id = "ventPopUp";

        contPopUp.className = "modalContainer";

        contBtnCP.className = "contBtnCP";

        btnCerrarP.className = "btn-close";
        btnCerrarP.addEventListener("click", function () { ventPopUp.remove(); });

        contBtnCP.appendChild(btnCerrarP);

        contPopUp.appendChild(contBtnCP);
        contPopUp.appendChild(bodyPopUp);

        ventPopUp.appendChild(contPopUp);

        document.body.appendChild(ventPopUp);
    }
}

function popUpLogin() {

    const bodyPopUp = document.createElement("div");
    const logoPopUp = document.createElement("img");
    const tituloPopUp = document.createElement("h5");
    const subTituloP = document.createElement("span");
    const correoTxtP = document.createElement("input");
    const contraTxtP = document.createElement("input");
    const contNCuenta = document.createElement("div");
    const btnNCuentaP = document.createElement("button");
    const btnIngresarP = document.createElement("button");

    bodyPopUp.className = "bodyPopUp";

    logoPopUp.src = "./img/auto.P89";
    logoPopUp.className = "logo loginLogo";

    tituloPopUp.textContent = "Bienvenido a E & C Automotores";
    tituloPopUp.className = "loginTitulo";

    subTituloP.textContent = "Ingrese con su cuenta"
    subTituloP.id = "subTituloP";
    subTituloP.className = "logSubtitulo";

    correoTxtP.type = "text";
    correoTxtP.className = "loginText";
    correoTxtP.id = "correoTxtP";
    correoTxtP.placeholder = "Ingrese su correo";

    contraTxtP.type = "password";
    contraTxtP.className = "loginText";
    contraTxtP.id = "contraTxtP";
    contraTxtP.placeholder = "Ingrese su contraseña";

    contNCuenta.className = "contNuevaCuenta";
    contNCuenta.textContent = "Si no posee una cuenta,";

    btnNCuentaP.id = "btnNCuenta";
    btnNCuentaP.className = "btn btn-link btnNCuenta";
    btnNCuentaP.textContent = "Crear cuenta";
    btnNCuentaP.addEventListener("click", function () { ventPopUp.remove(); popUp('2'); });

    btnIngresarP.id = "btnIngresarP";
    btnIngresarP.className = "btn btn-outline-primary";
    btnIngresarP.type = "button";
    btnIngresarP.textContent = "Ingresar";
    btnIngresarP.addEventListener("click", function () { loginUsuario(); });

    contNCuenta.appendChild(btnNCuentaP);

    bodyPopUp.appendChild(logoPopUp);
    bodyPopUp.appendChild(tituloPopUp);
    bodyPopUp.appendChild(subTituloP);
    bodyPopUp.appendChild(correoTxtP);
    bodyPopUp.appendChild(contraTxtP);
    bodyPopUp.appendChild(contNCuenta);
    bodyPopUp.appendChild(btnIngresarP);

    return bodyPopUp;
}

function popUpCreacionUs() {

    const bodyPopUp = document.createElement("div");
    const contTituloCU = document.createElement("div");
    const tituloCU = document.createElement("h5");
    const subTituloCU = document.createElement("spam");
    const textDatos = ["Nombre", "Apellido", "Edad", "Email", "Contraseña", "Categoria fiscal"];
    const opcionesCatF = ["Monotributista", "Responsable inscripto", "Exento", "Consumidor final"];
    const selCatFiscalP = widgetSelect(opcionesCatF, "selCatFiscalP");
    const btnGuardarPU = widgetBoton("btnGuardarPU", function () { crearUsuario(); })
    const columTextCU = document.createElement("div");
    const columInputCU = document.createElement("div");
    const filaCU = document.createElement("div");

    contTituloCU.className = "bodyPopUp";
    contTituloCU.id = "contTituloCU";
    contTituloCU.style.marginBottom = "16px";

    tituloCU.className = "loginTitulo";
    tituloCU.textContent = "Creacion de cuenta";

    subTituloCU.className = "logSubtitulo";
    subTituloCU.id = "subTituloCU";
    subTituloCU.textContent = "Ingrese los datos para crear su nueva cuenta";


    filaCU.className = "bodyPopUp";
    filaCU.style.flexDirection = "row";

    bodyPopUp.className = "bodyPopUp";

    columTextCU.className = "columCU";

    columInputCU.className = "columCU";

    contTituloCU.appendChild(tituloCU);
    contTituloCU.appendChild(subTituloCU);
    bodyPopUp.appendChild(contTituloCU);

    for (let textDato of textDatos) {

        const textCreacionUs = document.createElement("p");



        textCreacionUs.textContent = `${textDato}:`;
        textCreacionUs.className = "textCreacionUs";

        columTextCU.appendChild(textCreacionUs);

        if (textDato != textDatos[5]) {

            const inputCreacionUs = document.createElement("input");

            if (textDato === textDatos[2]) {
                inputCreacionUs.type = "number";
            }

            inputCreacionUs.id = `text${textDato}`;
            inputCreacionUs.style.height = "25px";
            inputCreacionUs.style.marginBottom = "10px";

            columInputCU.appendChild(inputCreacionUs);
        } else {
            textCreacionUs.style.margin = "5px 0px 4px 0px";
        }


    }

    for (let opcionCatF of opcionesCatF) {
        const opCatFisc = document.createElement("option");

        opCatFisc.textContent = opcionCatF;

        selCatFiscalP.appendChild(opCatFisc);
    }

    columInputCU.appendChild(selCatFiscalP);

    filaCU.appendChild(columTextCU);
    filaCU.appendChild(columInputCU);

    bodyPopUp.appendChild(filaCU);
    bodyPopUp.appendChild(btnGuardarPU);

    return bodyPopUp;
}

function popUpCargarVehiculoV() {
    let segundaColumna = false;
    const ContDatosV = document.createElement("div");
    const tituloCV = document.createElement("spam");
    const contTituloCV = document.createElement("div");
    const textDatosPCol = ["Marca", "Modelo", "Año", "Tipo", "Aire acondicionado", "Calefaccion",
        "Tipo de direccion", "Cantidad de puertas"];
    const tipo = ["Automovil", "Camioneta", "Furgon", "Camion"];
    const tipoDireccion = ["Asistida", "Hidráulica", "Electrohidráulica"];
    const contCVehiculo = document.createElement("div");
    const primerCol = document.createElement("div");
    const segundaCol = document.createElement("div");
    const filaCVehiculo = document.createElement("div");
    const contPrecioV = document.createElement("div");
    const precioVText = document.createElement("spam");
    const precioVInput = document.createElement("input");
    const btnCargarV = widgetBoton("btnCargarV",function(){cargarVehiculo()}, "Guardar");
    const btnCont = document.createElement("div");

    btnCargarV.style.width = "150px";

    btnCont.className = "contBtnCP";
    btnCont.style.justifyContent = "center";
    btnCont.style.paddingTop = "30px"
    btnCont.appendChild(btnCargarV);
                
    precioVText.textContent = "Valor de venta $";
    precioVText.className = "widgetText";

    precioVInput.type = "number";
    precioVInput.style.width = "40%";
    precioVInput.style.paddingBottom = "5px";

    contPrecioV.appendChild(precioVText);
    contPrecioV.appendChild(precioVInput);
    contPrecioV.className =  "ContDatosV";
    contPrecioV.style.justifyContent = "center";
    contPrecioV.style.alignItems = "center";

    tituloCV.textContent = "Carga de vehiculos para la venta";
    tituloCV.style.fontWeight = "600";

    contTituloCV.className= "contTitulo";
    contTituloCV.id = "contTituloCV";
    contTituloCV.appendChild(tituloCV) ;

    primerCol.className = "primerCol";
    contCVehiculo.className = "contCVehiculo";

    ContDatosV.className = "ContDatosV";

    for (let textDatoPCol of textDatosPCol) {
        const textDato = document.createElement("spam");
        const contText = document.createElement("div");
        const contInput = document.createElement("div");
        const widget = document.createElement("div");

        widget.className = "widget";
        widget.type = "row";

        textDato.textContent = textDatoPCol;
        textDato.className = "widgetText";

        contText.appendChild(textDato);
        widget.appendChild(contText);

        switch (textDatoPCol) {
            case "Tipo":
                contInput.appendChild(widgetSelect(tipo, "selTipoVehiculo"));
            break;

            case "Tipo de direccion":
                contInput.appendChild(widgetSelect(tipoDireccion,"selTipoDir"));
            break;
            
            case "Aire acondicionado":
                contInput.appendChild(widgetCheck("aireChek"));
            break;

            case "Calefaccion":
                contInput.appendChild(widgetCheck("calefChek"));
            break;

            default:
                const inputDato = document.createElement("input");
                inputDato.type = "text";
                inputDato.style.width = "100%";
                contInput.appendChild(inputDato);
            break;

        }

        widget.appendChild(contInput);

        if (!segundaColumna && textDatoPCol != textDatosPCol[4]) {
            contInput.style.width = "65%";
            contText.style.width = "35%";

            primerCol.appendChild(widget);
            
        } else {
            segundaColumna = true;

            contText.style.width = "50%";
            contInput.style.width = "50%";

            segundaCol.appendChild(widget);
        }

    }
    
    ContDatosV.appendChild(primerCol);
    ContDatosV.appendChild(segundaCol);
    ContDatosV.appendChild(filaCVehiculo);

    contCVehiculo.appendChild(contTituloCV);
    contCVehiculo.appendChild(ContDatosV);
    contCVehiculo.appendChild(contPrecioV);
    contCVehiculo.appendChild(btnCont);

    return contCVehiculo;
}

function widgetCheck(id) {
    const contCheck = document.createElement("div");
    const inputCheck = document.createElement("input");

    contCheck.className = "form-check";

    inputCheck.type = "checkbox";
    inputCheck.className = "form-check-input";
    inputCheck.value = "";
    inputCheck.id = id;

    contCheck.appendChild(inputCheck);

    return contCheck;
}

function widgetSelect(opciones, id){
    const select = document.createElement("select");

    select.className = "form-select";
    select.id = id;
    select.setAttribute("aria-label", "Default select example");

    for (let opcion of opciones) {
        const opcionInput = document.createElement("option");

        opcionInput.textContent = opcion;

        select.appendChild(opcionInput);
    }

    return select;
}

function widgetBoton(id, onClick, texto){
    const boton = document.createElement("button");

    boton.id = id;
    boton.className = "btn btn-outline-primary";
    boton.type = "button";
    boton.textContent = texto;
    boton.addEventListener("click", onClick);

    return boton;
}