import nodo from "../ast/nodo";
import controlador from "../controlador";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";

export interface instruccion{
    ejecutar(controlador: controlador, ts: tablaSimbolos);
    recorrer(): nodo;
}