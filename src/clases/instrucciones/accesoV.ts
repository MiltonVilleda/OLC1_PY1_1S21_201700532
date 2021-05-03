import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import { tipo } from "../tablaSimbolos/tipo";
import identificador from "../expresiones/identificador";

export default class accesoV implements expresion {
    public id: identificador
    public exp: expresion
    public linea: number
    public columna: number
    constructor(id, exp, linea, columna) {
        this.id = id
        this.exp = exp
        this.linea = linea
        this.columna = columna
    }
    getTipo(controlador: controlador, ts: tablaSimbolos) {
        let simbol = ts.getSimbolo(this.id.identificador)
        let valor = this.exp.getValor(controlador, ts)
        let posicion = simbol.valor[valor]
        let retorno = posicion as expresion
        let tipo_pos = retorno.getTipo(controlador, ts)
        return tipo_pos
    }
    getValor(controlador: controlador, ts: tablaSimbolos) {
        let simbol = ts.getSimbolo(this.id.identificador)
        let valor = this.exp.getValor(controlador, ts)
        let tipo_Val = this.exp.getTipo(controlador, ts)
        if (simbol.tipo.type == tipo.VECTOR_BOOLEAN || simbol.tipo.type == tipo.VECTOR_CHAR || simbol.tipo.type == tipo.VECTOR_DOUBLE || simbol.tipo.type == tipo.VECTOR_INT || simbol.tipo.type == tipo.VECTOR_STRING) {
            if (tipo_Val == tipo.DOUBLE && !tipo_Val.toString().includes('.')) {
                if (valor < simbol.valor.length) {
                    return simbol.valor[valor].getValor(controlador, ts)
                } else {
                    let error = new errores('Semantico', `El vector ${this.id.identificador} no tiene posicion ${valor}`, this.linea, this.columna)
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: El vector ${this.id.identificador} no tiene posicion ${valor}`);
                }
            } else {
                let error = new errores('Semantico', `La expresion ${valor.toString()} no es de tipo entero`, this.linea, this.columna)
                controlador.errores.push(error);
                controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La expresion ${valor.toString()} no es de tipo entero`);
            }
        } else {
            let error = new errores('Semantico', `La variable ${this.id.identificador} no es un vector`, this.linea, this.columna)
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La variable ${this.id.identificador} no es un vector`);
        }
        return null
    }
    recorrer(): nodo {
        let padre = new nodo("Acceso", "")
        padre.addHijo(new nodo("[", ""))
        padre.addHijo(this.exp.recorrer())
        padre.addHijo(new nodo("]", ""))
        return padre
    }

}