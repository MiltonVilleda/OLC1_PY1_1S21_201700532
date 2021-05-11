import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import identificador from "../expresiones/identificador";
import { expresion } from "../interfaces/expresion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import { tipo } from "../tablaSimbolos/tipo";

export default class accesoL implements expresion {
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
        if (simbol.tipo.type == tipo.LISTA_BOOLEAN || simbol.tipo.type == tipo.LISTA_CHAR || simbol.tipo.type == tipo.LISTA_DOUBLE || simbol.tipo.type == tipo.LISTA_INT || simbol.tipo.type == tipo.LISTA_STRING) {
            if ((tipo_Val == tipo.DOUBLE || tipo_Val == tipo.ENTERO) && !tipo_Val.toString().includes('.')) {
                if (valor < simbol.valor.length) {
                    return simbol.valor[valor].getValor(controlador, ts)
                } else {
                    let error = new errores('Semantico', `La lista ${this.id.identificador} no tiene posicion ${valor}`, this.linea, this.columna)
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La lista ${this.id.identificador} no tiene posicion ${valor}`);
                }
            } else {
                let error = new errores('Semantico', `La expresion ${valor.toString()} no es de tipo entero`, this.linea, this.columna)
                controlador.errores.push(error);
                controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La expresion ${valor.toString()} no es de tipo entero`);
            }
        } else {
            let error = new errores('Semantico', `La variable ${this.id.identificador} no es una lista`, this.linea, this.columna)
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La variable ${this.id.identificador} no es una lista`);
        }
    }
    recorrer(): nodo {
        let padre = new nodo("Acceso", "")
        padre.addHijo(new nodo("[", ""))
        padre.addHijo(new nodo("[", ""))
        padre.addHijo(this.exp.recorrer())
        padre.addHijo(new nodo("]", ""))
        padre.addHijo(new nodo("]", ""))
        return padre
    }

}