import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import { tipo } from "../tablaSimbolos/tipo";

export default class lenght_ implements expresion {
    public id: string
    public linea: number
    public columna: number
    constructor(id, linea, columna) {
        this.id = id
        this.linea = linea
        this.columna = columna
    }
    getTipo(controlador: controlador, ts: tablaSimbolos) {
        return tipo.DOUBLE
    }
    getValor(controlador: controlador, ts: tablaSimbolos) {
        let simbol = ts.getSimbolo(this.id)
        if ((simbol.tipo.type == tipo.LISTA_BOOLEAN) ||
            (simbol.tipo.type == tipo.LISTA_CHAR) ||
            (simbol.tipo.type == tipo.LISTA_DOUBLE) ||
            (simbol.tipo.type == tipo.LISTA_INT) ||
            (simbol.tipo.type == tipo.LISTA_STRING) ||
            (simbol.tipo.type == tipo.VECTOR_BOOLEAN) ||
            (simbol.tipo.type == tipo.VECTOR_CHAR) ||
            (simbol.tipo.type == tipo.VECTOR_DOUBLE) ||
            (simbol.tipo.type == tipo.VECTOR_INT) ||
            (simbol.tipo.type == tipo.VECTOR_STRING) ||
            (simbol.tipo.type == tipo.CADENA)
        ) {
            return simbol.valor.length
        } else {
            let error = new errores('Semantico', `La variavle ${this.id} no tiene la propiedad length`, this.linea, this.columna)
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La variavle ${this.id} no tiene la propiedad length`);
        }
        return null
    }
    recorrer(): nodo {
        let padre = new nodo("Length", "")
        padre.addHijo(new nodo(this.id,""))
        return padre
    }

}