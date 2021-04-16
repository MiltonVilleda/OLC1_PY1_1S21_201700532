import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import { tipo } from "../tablaSimbolos/tipo";

export default class primitivo implements expresion {

    public primitivo: any;
    public linea: number;
    public columna: number;

    constructor(primitivo, linea, columna) {
        this.primitivo = primitivo;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(controlador: controlador, ts: tablaSimbolos) {
        let valor = this.getValor(controlador, ts);
        if (typeof valor == 'number') {
            return tipo.DOUBLE;
        } else if (typeof valor == 'string' && valor.length == 1) {
            return tipo.CARACTER
        } else if (typeof valor == 'string') {
            return tipo.CADENA
        } else if (typeof valor == 'boolean') {
            return tipo.BOOLEANO
        }
        throw new Error("Method not implemented.");
    }
    getValor(controlador: controlador, ts: tablaSimbolos) {
        return this.primitivo;
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }

}