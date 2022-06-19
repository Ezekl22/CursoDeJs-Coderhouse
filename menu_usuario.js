
function menu_usuario(){
  if(!document.getElementById("contMnUsuario")){ // solo se ejecuta si no se encuentra el menu de usuario en el dom
    ocultarInicio();
    const textTab = ["Vehiculos a la venta","Vehiculos comprados","Datos personales"];
    const btnTabOnclick = ["vehiculosVenta()","",""];
    const contMnUsuario = document.createElement("div");
    let contTabList = ``;
    let tabItem = ``;
    let tabPane = ``; 
    let pillsContent = ``;
    let tabPaneClass = "show active";
    let btnClass = "active";
    
    contMnUsuario.id = "contMnUsuario";

    for(let i = 0; i< 3; i++){
      if(i != 0){
        tabPaneClass = "";
        btnClass = "";
      }

      tabItem += `<li class="nav-item" role="presentation">
                    <button class="nav-link ${btnClass}" id="pills-home-tab${i}" onclick=${btnTabOnclick[i]} data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">${textTab[i]}</button>
                  </li>`;
      
      tabPane += `<div class="tab-pane fade ${tabPaneClass}" id="pills-home${i}" role="tabpanel" aria-labelledby="pills-home-tab">
                  <div id = "contLabel"></div>
                  </div>`;
    }
    
    pillsContent = `<div class="tab-content" id="pills-tabContent">
                      ${tabPane}
                    </div>`;
    
    contTabList = `<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                      ${tabItem} 
                  </ul>
                    ${pillsContent}`;

    contMnUsuario.innerHTML += `${contTabList}`

    document.body.appendChild(contMnUsuario);
  }
  
}

function vehiculosVenta(){
  const contLabel = document.getElementById("contLabel");
  const contVVenta = document.createElement("div");
  
  

}
function card(tipo){
  if(!document.getElementById("contCards")){
      const contCards = document.createElement("div");
      const filaCard = document.createElement("div");

      contCards.id = "contCards";

      filaCard.className = "row row-cols-1 row-cols-md-3 g-4"

      for(let i = 0; i < 3; i++){
          const columnaCard = document.createElement("div");
          const contCard = document.createElement("div");
          const imgCard = document.createElement("img");
          const contTextoCard = document.createElement("div");
          const tituloCard = document.createElement("h5");
          const textCard = document.createElement("p");

          textCard.className = "card-text";

          tituloCard.className = "card-title";

          contTextoCard.className = "card-body";

          imgCard.className ="card-img-top";
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
      document.body.appendChild(contCards);
  }
}

