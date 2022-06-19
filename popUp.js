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

    contraTxtP.type = "text";
    contraTxtP.className = "loginText";
    contraTxtP.id = "contraTxtP";
    contraTxtP.placeholder = "Ingrese su contraseña";

    contNCuenta.className = "contNuevaCuenta";
    contNCuenta.textContent = "Si no posee una cuenta,";

    btnNCuentaP.id = "btnNCuenta";
    btnNCuentaP.className = "btn btn-link btnNCuenta";
    btnNCuentaP.textContent = "Crear cuenta";
    btnNCuentaP.addEventListener("click", function () { ventPopUp.remove(); popUp('2');});

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
    const textDatos = ["Nombre", "Apellido", "Edad", "Email", "Contraseña","Categoria fiscal" ];
    const opcionesCatF = ["Monotributista","Responsable inscripto","Exento","Consumidor final"];
    const selCatFiscalP = document.createElement("select");
    const btnGuardarPU = document.createElement("button");

    btnGuardarPU.id = "btnGuardarPU";
    btnGuardarPU.className = "btn btn-outline-primary";
    btnGuardarPU.type = "button";
    btnGuardarPU.textContent = "Guardar";
    //btnGuardarPU.addEventListener("click", function () { loginUsuario();});

    selCatFiscalP.className = "form-select";
    selCatFiscalP.id = "selCatFiscalP";
    selCatFiscalP.setAttribute("aria-label","Default select example");

    
    for (let textDato of textDatos) {
        
        const filaCreacionUs = document.createElement("div");
        const textCreacionUs = document.createElement("p");

        filaCreacionUs.className = "filaCreacionUs";

        textCreacionUs.textContent = `${textDato}:`;
        textCreacionUs.className = "textCreacionUs";

        filaCreacionUs.appendChild(textCreacionUs);

        if(textDato != textDatos[5]){

            const inputCreacionUs = document.createElement("input");

            inputCreacionUs.id = `text${textDato}`;

            filaCreacionUs.appendChild(inputCreacionUs);
        }
        
        bodyPopUp.appendChild(filaCreacionUs);
    }

    for(let opcionCatF of opcionesCatF){
        const opCatFisc = document.createElement("option");

        opCatFisc.textContent = opcionCatF;

        selCatFiscalP.appendChild(opCatFisc);
    }

    bodyPopUp.appendChild(selCatFiscalP);
    bodyPopUp.appendChild(btnGuardarPU);
    
    return bodyPopUp;
}
