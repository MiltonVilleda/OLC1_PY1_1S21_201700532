import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { instruccion } from "../interfaces/instruccion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";

export default class print implements instruccion {
    public expresion: expresion
    public linea: number
    public columna: number
    constructor(expresion, linea, columna) {
        this.expresion = expresion
        this.linea = linea
        this.columna = columna
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        // TODO verificar que el tipo de valor es un primitivo
        let valor = this.expresion.getValor(controlador, ts)
        controlador.appEnd(valor)
        return null;
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }

}