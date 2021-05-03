import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import Tipo from "../tablaSimbolos/tipo";

export default class lista_ implements expresion{
    public tipo_: Tipo
    public valor: Array<expresion>
    public linea: number
    public columna: number
    constructor(tipo_,valor,linea,columna){
        this.tipo_ = tipo_
        this.valor = valor
        this.linea = linea
        this.columna = columna
    }
    getTipo(controlador: controlador, ts: tablaSimbolos) {
        return this.tipo_.type
    }
    getValor(controlador: controlador, ts: tablaSimbolos) {
        return this.valor
    }
    recorrer(): nodo {
        let padre = new nodo("Lista","")
        for (let val of this.valor){
            padre.addHijo(val.recorrer())
        }
        return padre
    }

}