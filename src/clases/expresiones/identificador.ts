import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";

export default class identificador implements expresion {
    public identificador: string
    public linea: number
    public columna: number
    constructor(identificador, linea, columna) {
        this.identificador = identificador
        this.linea = linea
        this.columna = columna
    }
    getTipo(controlador: controlador, ts: tablaSimbolos) {
        let existe_id = ts.getSimbolo(this.identificador)
        if (existe_id != null) {
            return existe_id.tipo.type
        } else {
            let error = new errores('Semantico', `No existe ${this.identificador} en la tabla de simbolos`, this.linea, this.columna)
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: No existe ${this.identificador} en la tabla de simbolos`);
        }
    }
    getValor(controlador: controlador, ts: tablaSimbolos) {
        let existe_id = ts.getSimbolo(this.identificador)
        if (existe_id != null) {
            return existe_id.valor
        } else {
            let error = new errores('Semantico', `No existe ${this.identificador} en la tabla de simbolos`, this.linea, this.columna)
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: No existe ${this.identificador} en la tabla de simbolos`);
        }
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }

}