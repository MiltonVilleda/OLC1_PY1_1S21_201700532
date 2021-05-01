import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import { tipo } from "../tablaSimbolos/tipo";

export default class tostring_ implements expresion {
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
        let tipo_ = this.expresion.getTipo(controlador, ts)
        let valor = this.expresion.getValor(controlador, ts)
        if (tipo_ == tipo.DOUBLE || tipo_ == tipo.ENTERO || tipo_ == tipo.BOOLEANO) {
            let tipo_exp = this.expresion.getTipo(controlador, ts)
            if (tipo_exp == tipo.DOUBLE || tipo_exp == tipo.ENTERO || tipo_exp == tipo.BOOLEANO) {
                return valor.toString()
            }
        } else {
            let error = new errores('Semantico', `El valor ${valor} no se puede convertir a string`, this.linea, this.columna)
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: El valor ${valor} no se puede convertir a string`);
        }
        return null
    }
    recorrer(): nodo {
        let padre = new nodo("Tostring", "")
        padre.addHijo(this.expresion.recorrer())
        return padre
    }

}