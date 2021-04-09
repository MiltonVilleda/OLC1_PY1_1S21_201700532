import nodo from "../../ast/nodo";
import controlador from "../../controlador";
import { expresion } from "../../interfaces/expresion";
import { tablaSimbolos } from "../../tablaSimbolos/tablaSimbolos";

export enum operador {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    MODULO,
    MENORQUE,
    MENORIGUAL,
    MAYORQUE,
    MAYORIGUAL,
    IGUALIGUAL,
    DIFERENTE,
    AND,
    OR,
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
        } else if (ope == '*'){
            return operador.MULTIPLICACION
        } else if (ope == '/'){
            return operador.DIVISION
        } else if (ope == '^'){
            return operador.POTENCIA
        } else if (ope == '%'){
            return operador.MODULO
        } else if (ope == '<') {
            return operador.MENORQUE
        } else if (ope == '<=') {
            return operador.MENORIGUAL
        } else if (ope == '>') {
            return operador.MAYORQUE
        } else if (ope == '>=') {
            return operador.MAYORIGUAL
        } else if (ope == '==') {
            return operador.IGUALIGUAL
        } else if (ope == '!=') {
            return operador.DIFERENTE
        } else if (ope == '&&') {
            return operador.AND
        } else if (ope == '||') {
            return operador.OR
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