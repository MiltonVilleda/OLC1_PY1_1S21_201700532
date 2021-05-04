import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import Tipo from "../tablaSimbolos/tipo";

export default class lista_ implements expresion {
    public tipo_: Tipo
    public valor: Array<expresion>
    public linea: number
    public columna: number
    constructor(tipo_, linea, columna) {
        this.tipo_ = tipo_
        this.valor = new Array<expresion>()
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
        let padre = new nodo("Lista", "")
        return padre
    }

}