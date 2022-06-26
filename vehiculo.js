const interes = 0.30; 
class Vehiculo{
    constructor (marca, modelo, anioCreacion, tipo, aireAcondicionado, calefaccion, tipoDireccion, cantPuertas, precioContado){
        this.marca = marca;
        this.modelo = modelo;
        this.anioCreacion = anioCreacion;
        this.tipo = tipo;
        this.aireAcondicionado = aireAcondicionado;
        this.calefaccion = calefaccion;
        this.tipoDireccion = tipoDireccion;
        this.cantPuertas = cantPuertas;
        this.precioContado = precioContado;
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
