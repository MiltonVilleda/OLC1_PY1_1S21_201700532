import nodo from "../ast/nodo";
import controlador from "../controlador";
import { instruccion } from "../interfaces/instruccion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import llamada from "./llamada";

export default class exec implements instruccion {
    public llamada: llamada
    public linea: number
    public columna: number
    constructor(llamada, linea, columna) {
        this.llamada = llamada
        this.linea = linea
        this.columna = columna
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        this.llamada.ejecutar(controlador, ts);
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }

}