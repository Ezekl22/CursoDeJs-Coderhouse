
function menu_usuario() {
  const menuUsuario = document.getElementById("contMnUsuario");

  menuUsuario && menuUsuario.remove();
  const contMnUsuario = document.createElement("div");

  contMnUsuario.id = "contMnUsuario";

  document.body.appendChild(contMnUsuario);

  ocultarInicio();

  mostratMenuUsuario();
}

function vehiculosMenu(tipo) { // sirve tanto para cargar la pestaña de vehiculos de venta como para vehiculos comprados

  let contenedor;
  let contLabel ;
  const contV = document.createElement("div");
  const btnCargarV = widgetBoton("btnCargarV", function () { popUp('3'); }, "Cargar vehiculo");
  const usuario = getUsuarioLogueado();

  contV.className = "contV";

  switch (tipo) {
    case 1:
      contLabel = document.getElementById("pills-venta");
      contenedor = document.getElementById("contVVenta");

      contV.id = "contVVenta";
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
      if (usuario.compras.length > 0){
        contLabel.appendChild(cards(2));
      }else{
        contV.textContent = "En este momento no hay vehiculos para la compra";
      }
      break;
    case 3:
      contV.id = "";
      break;
  }

  contenedor && contenedor.remove();
  
  contLabel.appendChild(contV);
}

function cards(tipo) {
  
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
  contenedorCards && contenedorCards.remove();

  filaCard.className = "row row-cols-1 row-cols-md-3 g-4"

  for (const vehiculo of vehiculos) {
    const nombreCaract = ["", "Modelo: ", "Año: ", "Tipo: ", "Aire acondicionado: ", "Calefaccion: ", "Tipo de direccion: ", "Cantidad de puertas: ", "Valor: $"];
    const columnaCard = document.createElement("div");
    const contCard = document.createElement("div");
    const imgCard = document.createElement("img");
    const contTextoCard = document.createElement("div");
    const tituloCard = document.createElement("h5");
    const textCard = document.createElement("div");
    const aireAc = vehiculo.aireAcondicionado ? "si" : "no";
    const calefaccion = vehiculo.calefaccion ? "si" : "no";
    const caracteristicas = Object.values(vehiculo);

    for (let i = 1; i < caracteristicas.length; i++) {
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

