
function menu_usuario() {
  if (!document.getElementById("contMnUsuario")) { // solo se ejecuta si no se encuentra el menu de usuario en el dom

    const contMnUsuario = document.createElement("div");

    ocultarInicio();

    mostratMenuUsuario();

    vehiculosVenta();

    contMnUsuario.id = "contMnUsuario";

    document.body.appendChild(contMnUsuario);
  }

}

function vehiculosVenta(recargar) {
  const contVenta = document.getElementById("contVVenta");

  if (recargar || !contVenta) {

    contVenta && contVenta.remove();

    const contLabel = document.getElementById("pills-venta");
    const contVVenta = document.createElement("div");
    const btnCargarV = widgetBoton("btnCargarV", function () { popUp('3'); }, "Cargar vehiculo");
    const usuario = getUsuarioLogueado();

    contVVenta.id = "contVVenta";


    if (usuario.vehiculosVenta.length > 0) {

      contLabel.appendChild(cards(1));
    } else {
      contVVenta.textContent = "No tiene autos para la venta. ";

      contVVenta.appendChild(btnCargarV);

    }
    contLabel.appendChild(contVVenta);
  }
}

function cards(tipo) {
  const contenedorCards = document.getElementById("contCards");
  
  contenedorCards &&  contenedorCards.remove();

  const contCards = document.createElement("div");
  const filaCard = document.createElement("div");
  const usuario = getUsuarioLogueado();
  const vehiculos = usuario.vehiculosVenta;

  contCards.id = "contCards";

  filaCard.className = "row row-cols-1 row-cols-md-3 g-4"

  for (const vehiculo of vehiculos) {
    const nombreCaract = ["", "Modelo: ", "Año: ", "Tipo: ", "Aire acondicionado: ", "Calefaccion: ", "Tipo de direccion: ", "Cantidad de puertas: ", "Valor: $"];
    const columnaCard = document.createElement("div");
    const contCard = document.createElement("div");
    const imgCard = document.createElement("img");
    const contTextoCard = document.createElement("div");
    const tituloCard = document.createElement("h5");
    const textCard = document.createElement("div");
    const aireAc = vehiculo.anioCreacion ? "si" : "no";
    const calefaccion = vehiculo.calefaccion ? "si" : "no";
    const caracteristicas = Object.values(vehiculo);

    for (let i = 1; i<caracteristicas.length; i++){
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
    columnaCard.appendChild(contCard);
    filaCard.appendChild(columnaCard);
  }

  contCards.appendChild(filaCard);

  return contCards;



}

