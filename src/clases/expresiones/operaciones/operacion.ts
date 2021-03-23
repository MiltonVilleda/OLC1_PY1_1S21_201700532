import nodo from "../../ast/nodo";
import controlador from "../../controlador";
import { expresion } from "../../interfaces/expresion";
import { tablaSimbolos } from "../../tablaSimbolos/tablaSimbolos";

export enum operador {
    SUMA,
    RESTA,
    MENORQUE,
    MAYORQUE,
    AND,
    NOT,
    UNARIO
}

export default class operacion implements expresion {

    public e1: expresion;
    public e2: expresion;
    public expU: boolean;
    public operador: operador;
    public linea: number;
    public columna: number;

    constructor(e1, operador, e2, linea, columna, expU) {
        this.e1 = e1;
        this.operador = operador;
        this.e2 = e2;
        this.linea = linea;
        this.columna = columna;
        this.expU = expU;
        this.operador = this.getOperador(operador)
    }

    getOperador(ope): operador {
        if (ope == '+') {
            return operador.SUMA;
        } else if (ope == '-') {
            return operador.RESTA;
        } else if (ope == '<') {
            return operador.MENORQUE
        } else if (ope == '>') {
            return operador.MAYORQUE
        } else if (ope == '&&') {
            return operador.AND
        } else if (ope == '!') {
            return operador.NOT
        } else if (ope == 'UNARIO') {
            return operador.UNARIO
        }
    }

    getTipo(controlador: controlador, ts: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    getValor(controlador: controlador, ts: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }

}