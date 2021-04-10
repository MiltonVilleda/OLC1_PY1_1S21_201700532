import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { instruccion } from "../interfaces/instruccion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";

export default class asignacion implements instruccion{
    public identificador: string;
    public valor: expresion;
    public linea: number;
    public columna: number;

    constructor(identificador, valor, linea, columna){
        this.identificador = identificador;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        if (ts.existe(this.identificador)){
            let valor = this.valor.getValor(controlador,ts);

            // TODO: verificar si son del mismo tipo

            ts.getSimbolo(this.identificador).setValor(valor);
        } else {
            // TODO: reportar el error, no existe la variable
        }
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }
}