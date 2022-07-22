
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

const miPerfilMenu =()=>{
  const contLabel = document.getElementById("pills-perfil");
  const contenedor = document.createElement("div");
  const contText = document.createElement("input");
  const datosPerfil = ["Nombre: ","Apellido: ", "Edad: ", "Email: ", "Contraseña: ", "Categoria fiscal: "];
  
  for (const datoPerfil of datosPerfil) {

    let contText;
    datoPerfil == "Categoria fiscal: "? contText = document.createElement("input"): contText = widgetSelect("selCatFiscal");
    //const contText = document.createElement("input");
  }
  contenedor.appendChild(contText);
  contLabel.appendChild(contenedor);
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
      vehiculos = getViehiculosVenta();
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

    for (let i = 1; i < caracteristicas.length -1; i++) {
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
      const btnCatalogo = widgetBoton("btnCatalogo", "", "Comprar");

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

