const interes = 0.30; 
class Vehiculo{
    constructor (){
        this.marca = prompt("Ingrece la marca");
        this.modelo = prompt("Ingrece el modelo");
        this.anioCreacion = prompt("Ingrece el año de creacion");
        this.tipo = tipoCorrecto();
        this.aireAcondicionado = confirm("¿Posee aire acondicionado?");
        this.calefaccion = confirm("¿Posee aire calefaccion?");
        this.tipoDireccon = prompt("Ingrese el tipo de direccion: \n");
        this.cantPuertas = prompt("Ingrese el numero de puertas");
        this.precioContado = parseFloat(prompt("Ingrece el precio"));
    }

    precioFinanciado(cantCuotas){
        return this.valorCuota(cantCuotas) * cantCuotas;
    }

    valorCuota(cantCuotas){
        return (this.precioContado / cantCuotas) + (this.precioContado * (1 * interes / cantCuotas));
    }

    // refinanciarCuota(){
        
    // }

}

function tipoCorrecto(){
    let auxTipo = "";
    let tipo = "";
    let mensaje = "Ingrece el tipo";

    while(!(auxTipo == "1" || auxTipo == "2" || auxTipo == "3" || auxTipo == "4")){
        auxTipo = (prompt( mensaje + " \n"  + 
                          "1: Auto \n"      +
                          "2: Camioneta \n" +
                          "3: Furgon \n"    +
                          "4: Camion \n"    )).replace(/ /g, "");
        mensaje = "El dato que ingreso es incorrecto, por favor elige el numero de la opcion correspondiente a su vehiculo ";
    }
    switch(auxTipo){
        case "1":
            tipo = "Auto";
        break;
        case "2":
            tipo = "Camioneta";
        break;
        case "3":
            tipo = "Furgon";
        break;
        case "4":
            tipo = "Camion";
        break;
    }
    return tipo;
}