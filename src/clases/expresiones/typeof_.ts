import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import { tipo } from "../tablaSimbolos/tipo";
import primitivo from "./primitivo";

export default class typeof_ implements expresion {
    public expresion: expresion
    public linea: number
    public columna: number
    constructor(expresion, linea, columna) {
        this.expresion = expresion
        this.linea = linea
        this.columna = columna
    }
    getTipo(controlador: controlador, ts: tablaSimbolos) {
        return tipo.CADENA
    }
    getValor(controlador: controlador, ts: tablaSimbolos) {
        let valor = this.expresion.getValor(controlador, ts)
        if (this.expresion.getTipo(controlador, ts) == tipo.DOUBLE && !valor.toString().includes('.') || this.expresion.getTipo(controlador, ts) == tipo.ENTERO) {
            return "int"
        } else if (this.expresion.getTipo(controlador, ts) == tipo.DOUBLE) {
            return "double"
        } else if (this.expresion.getTipo(controlador, ts) == tipo.BOOLEANO) {
            return "boolean"
        } else if (this.expresion.getTipo(controlador, ts) == tipo.CARACTER) {
            return "char"
        } else if (this.expresion.getTipo(controlador, ts) == tipo.CADENA) {
            return "string"
        } else if (this.expresion.getTipo(controlador, ts) == tipo.VECTOR_BOOLEAN) {
            return "vector boolean"
        } else if (this.expresion.getTipo(controlador, ts) == tipo.VECTOR_CHAR) {
            return "vector char"
        } else if (this.expresion.getTipo(controlador, ts) == tipo.VECTOR_DOUBLE) {
            return "vector double"
        } else if (this.expresion.getTipo(controlador, ts) == tipo.VECTOR_INT) {
            return "vector int"
        } else if (this.expresion.getTipo(controlador, ts) == tipo.VECTOR_STRING) {
            return "vector string"
        } else if (this.expresion.getTipo(controlador, ts) == tipo.LISTA_BOOLEAN) {
            return "lista boolean"
        } else if (this.expresion.getTipo(controlador, ts) == tipo.LISTA_CHAR) {
            return "lista char"
        } else if (this.expresion.getTipo(controlador, ts) == tipo.LISTA_DOUBLE) {
            return "lista double"
        } else if (this.expresion.getTipo(controlador, ts) == tipo.LISTA_INT) {
            return "lista int"
        } else if (this.expresion.getTipo(controlador, ts) == tipo.LISTA_STRING) {
            return "lista string"
        } else {
            let error = new errores('Semantico', `No se puede obtener el tipo de ${valor}`, this.linea, this.columna)
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: No se puede obtener el tipo de ${valor}`);
        }
    }
    recorrer(): nodo {
        let padre = new nodo("Typeof", "")
        padre.addHijo(this.expresion.recorrer())
        return padre
    }

}