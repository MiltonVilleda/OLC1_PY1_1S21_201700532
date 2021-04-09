import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { instruccion } from "../interfaces/instruccion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";

export default class asignacion implements instruccion{
    public identificador: string;
    public exp: expresion;
    public linea: number;
    public columna: number;

    constructor(identificador, exp, linea, columna){
        this.identificador = identificador;
        this.exp = exp;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }
}