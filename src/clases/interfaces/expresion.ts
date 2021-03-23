import nodo from "../ast/nodo";
import controlador from "../controlador";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";

export interface expresion {
    getTipo(controlador: controlador, ts: tablaSimbolos);
    getValor(controlador: controlador, ts: tablaSimbolos);
    recorrer(): nodo;
}