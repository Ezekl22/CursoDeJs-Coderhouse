
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
  if (recargar || !document.getElementById("contVVenta")) {


    const contLabel = document.getElementById("pills-venta");
    const contVVenta = document.createElement("div");
    const btnCargarV = widgetBoton("btnCargarV", function () { popUp('3'); }, "Cargar vehiculo");
    const usuario = usuarioLogueado();

    contVVenta.id = "contVVenta";
    

    if (usuario.vehiculosVenta.length < 0) {

      contLabel.appendChild(cards(1), usuario);
    } else {
      contVVenta.textContent = "No tiene autos para la venta. ";

      contVVenta.appendChild(btnCargarV);

    }
    contLabel.appendChild(contVVenta);
  }
}

function cards(tipo, usuario) {
  if (!document.getElementById("contCards")) {
    const contCards = document.createElement("div");
    const filaCard = document.createElement("div");

    contCards.id = "contCards";

    filaCard.className = "row row-cols-1 row-cols-md-3 g-4"

    for (let i = 0; i < 3; i++) {
      const columnaCard = document.createElement("div");
      const contCard = document.createElement("div");
      const imgCard = document.createElement("img");
      const contTextoCard = document.createElement("div");
      const tituloCard = document.createElement("h5");
      const textCard = document.createElement("p");

      textCard.className = "card-text";

      tituloCard.className = "card-title";

      contTextoCard.className = "card-body";

      imgCard.className = "card-img-top";
      imgCard.src = "...";

      contCard.className = "card";

      columnaCard.className = "col";

      contTextoCard.appendChild(tituloCard);
      contTextoCard.appendChild(textCard);
      contCard.appendChild(imgCard);
      contCard.appendChild(contTextoCard);
      columnaCard.appendChild(contCard);
      filaCard.appendChild(columnaCard);
    }

    contCards.appendChild(filaCard);

  } else {


    contCards.textContent = "No posee autos a la venta";




  }
  return contCards;
}

