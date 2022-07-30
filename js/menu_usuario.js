
function menu_usuario() {
  const menuUsuario = document.getElementById("contMnUsuario");

  menuUsuario && menuUsuario.remove();
  const contMnUsuario = document.createElement("div");

  contMnUsuario.id = "contMnUsuario";

  document.body.appendChild(contMnUsuario);

  ocultarInicio();
  ocultarCatalogo();
  mostratMenuUsuario();
}

function vehiculosMenu(tipo) { // sirve tanto para cargar la pestaña de vehiculos de venta como para vehiculos comprados

  let contenedor;
  let contLabel ;
  let contenedorCards;
  const contV = document.createElement("div");
  const btnCargarV = widgetBoton("btnCargarV", function () { popUp('3'); }, "Cargar vehiculo");
  const usuario = getUsuarioLogueado();

  contV.className = "contV";

  switch (tipo) {
    case 1:
      contLabel = document.getElementById("pills-venta");
      contenedor = document.getElementById("contVVenta");

      contV.id = "contVVenta";
      contenedorCards = document.getElementById("contCardsVent");
      contenedorCards != null && contenedorCards.remove();
      if (usuario.vehiculosVenta.length > 0) {
        contLabel.appendChild(cards(1));
      }else{
        contV.textContent = "No tiene autos para la venta. ";
        contV.appendChild(btnCargarV);
      }
      break;
    case 2:
      contLabel = document.getElementById("pills-comprados");
      contenedor = document.getElementById("contVCompra");

      contV.id = "contVCompra";
      contenedorCards = document.getElementById("contCardsComprado");
      contenedorCards != null && contenedorCards.remove();
      if (usuario.compras.length > 0){
        contLabel.appendChild(cards(2));
      }else{
        contV.textContent = "No posee vehiculos comprados";
      }
      break;
    case 3:
      contV.id = "";
      break;
  }

  contenedor && contenedor.remove();
  
  contLabel.appendChild(contV);
}

function miPerfilMenu(){
  const contLabel = document.getElementById("pills-perfil");
  
  contLabel.appendChild(cargarMiPerfil());
}

function cargarMiPerfil(){
  const miPerfil = document.getElementById("contPerfil")
  const datosPerfil = ["Nombre: ","Apellido: ", "Edad: ", "Categoria fiscal: ", "Email: ", "Contraseña: "];
  const opcionesCatF = ["Monotributista", "Responsable inscripto", "Exento", "Consumidor final"];
  const {nombre, apellido, edad, categoriaFiscal, email, contrasenia} = getUsuarioLogueado();
  const datosUsuario = [nombre, apellido, edad, categoriaFiscal, email, contrasenia];
  const contenedor = document.createElement("div");
  const contenedorDatos = document.createElement("div");
  const contenedorElemementos = document.createElement("div");
  const nombreEmail = email.slice(0, email.indexOf("@"));
  const extencionEmail = email.slice(email.indexOf("@")+1,email.length );

  contenedorElemementos.className = "contElementosP";

  miPerfil && miPerfil.remove();

  contenedor.className = "contenidoCentro widthMaximo";
  contenedor.id = "contPerfil";
  contenedorDatos.className = "contMiPerfil";

  for ( let i = 0; i < datosPerfil.length; i++) {
    const contText = document.createElement("div");
    const id = "wdg" + i;
    let textPerfil;

    switch (datosPerfil[i]) {
      case "Categoria fiscal: ":
        textPerfil = widgetSelectP(opcionesCatF, datosPerfil[i], id);
        break;
      case "Contraseña: ":
        textPerfil = widgetTextP(datosPerfil[i], datosUsuario[i],"password",id);
        break;
      case "Email: ":
        textPerfil = widgetEmailP("wdgEmail", nombreEmail, extencionEmail);
        break;
      default:
        textPerfil = widgetTextP(datosPerfil[i], datosUsuario[i],"text",id);
        break;
    }

    contText.appendChild(textPerfil);
    
    contenedorElemementos.appendChild(contText);
  }
  contenedorDatos.appendChild(contenedorElemementos);
  contenedor.appendChild(contenedorDatos);
  return contenedor;
}

const cards=(tipo)=> {
  const contCards = document.createElement("div");
  const filaCard = document.createElement("div");
  const usuario = getUsuarioLogueado();
  let vehiculos;
  
  switch (tipo) {
    case 1:
      vehiculos = usuario.vehiculosVenta;
      contCards.id = "contCardsVent";
      break;
    case 2:
      vehiculos = usuario.compras;
      contCards.id = "contCardsComprado";
      break
    case 3:
      vehiculos = getVehiculosVenta();
      contCards.id = "contCardsCat";
      break;
  }

  const contenedorCards = document.getElementById(contCards.id);
  contenedorCards != null && contenedorCards.remove();

  filaCard.className = "row row-cols-1 row-cols-md-3 g-4"

  for (const vehiculo of vehiculos) {
    const nombreCaract = ["", "Modelo: ", "Año: ", "Tipo: ", "Aire acondicionado: ", "Calefaccion: ", "Tipo de direccion: ", "Cantidad de puertas: ", "Valor: $"];
    const columnaCard = document.createElement("div");
    const contCard = document.createElement("div");
    const imgCard = document.createElement("img");
    const contTextoCard = document.createElement("div");
    const tituloCard = document.createElement("h5");
    const textCard = document.createElement("div");
    const aireAc = vehiculo.aireAcondicionado;
    const calefaccion = vehiculo.calefaccion;
    const caracteristicas = Object.values(vehiculo);

    for (let i = 1; i < caracteristicas.length -2; i++) {
      const textCaract = document.createElement("spam");

      textCaract.className = "textCaract";

      switch (nombreCaract[i]) {
        case nombreCaract[4]:
          textCaract.textContent = nombreCaract[i] + aireAc;
          break;

        case nombreCaract[5]:
          textCaract.textContent = nombreCaract[i] + calefaccion;
          break;

        default:
          textCaract.textContent = nombreCaract[i] + caracteristicas[i];
          break;
      }

      textCard.appendChild(textCaract);
    }
    textCard.className = "card-text";

    tituloCard.className = "card-title";
    tituloCard.textContent = vehiculo.marca;

    contTextoCard.className = "card-body";

    imgCard.className = "card-img-top";
    imgCard.src = "./img/iconAutomobil.png";

    contCard.className = "card";

    columnaCard.className = "colCards";

    
    if(tipo === 1){
      const contBtnsSup = document.createElement("div");
      const btnEliminar = document.createElement("button");
      const imgEliminar = document.createElement("img");
      const btnEditar = document.createElement("button");
      const imgEditar = document.createElement("img");

      imgEliminar.src = "./img/iconEliminar.png";
      imgEliminar.className = "iconsCards";

      imgEditar.src = "./img/iconEditar.png";
      imgEditar.className = "iconsCards";

      contBtnsSup.className = "widthMaximo contenidoDerecha"

      btnEliminar.className = "btnCardSup btn btn-danger contenidoCentro";
      btnEliminar.style.marginRight = "3px";

      btnEditar.className = "btnCardSup btn btn-info contenidoCentro";

      btnEliminar.appendChild(imgEliminar);
      btnEditar.appendChild(imgEditar);
      contBtnsSup.appendChild(btnEliminar);
      contBtnsSup.appendChild(btnEditar);
      contCard.appendChild(contBtnsSup);
    }
    contTextoCard.appendChild(tituloCard);
    contTextoCard.appendChild(textCard);
    contCard.appendChild(imgCard);
    contCard.appendChild(contTextoCard);

    if(tipo === 3){
      const contBtnC = document.createElement("div");
      const vehiculoId = vehiculo.id;
      const btnCatalogo = widgetBoton("btnCatalogo", ()=>{popUp('4',vehiculoId);}, "Comprar");

      contBtnC.className = "contBtn";

      contBtnC.appendChild(btnCatalogo);
      contCard.appendChild(contBtnC);
    }

    columnaCard.appendChild(contCard);
    filaCard.appendChild(columnaCard);
  }

  contCards.appendChild(filaCard);

  return contCards;
}

const widgetTextP = (textLabel, text, tipo, id) =>{
  const widgetContent = document.createElement("div");

  widgetContent.className = "input-group mb-3";
  widgetContent.id = id;
  widgetContent.innerHTML = `<span class="input-group-text">${textLabel}</span>
                            <input type="${tipo}" class="form-control" value="${text}" disabled>
                            <button class="btn btn-outline-secondary" type="button" onclick="editar('${id}')">Editar</button>`;
  return widgetContent;
}

const widgetSelectP =(opciones, texto, id)=>{
  const contSelectP = document.createElement("div");

  contSelectP.className = "input-group mb-3";
  contSelectP.id = id;
  let options = "";
  for (let opcion of opciones) {
    options += `<option>${opcion}</option>`
  }

  contSelectP.innerHTML = `<label class="input-group-text">${texto}</label>
                          <select class="form-select" disabled>
                          ${options}
                          </select>
                          <button class="btn btn-outline-secondary" onclick="editar('${id}')" type="button">Editar</button>`;
  return contSelectP;
}

const widgetEmailP =(id, valorText, valorSelect)=>{

  const contWidget = document.createElement("div");

  contWidget.className = "input-group mb-3";
  contWidget.id = id;

  contWidget.innerHTML = `<span class="input-group-text">Email: </span>
                          <input type="text" class="form-control" value="${valorText}" disabled>
                          <span class="input-group-text">@</span>
                          <select class="form-select" value="${valorSelect}" disabled>
                            <option >gmail.com</option>
                            <option >hotmail.com</option>
                            <option >yahoo.com</option>
                            <option >outlook.com</option>
                            <option onclick="otraExtencion()">otro</option>
                          </select>
                          <button class="btn btn-outline-secondary" onclick="editar('${id}')" type="button" id="button-addon2">Editar</button>`
  return contWidget;
}
