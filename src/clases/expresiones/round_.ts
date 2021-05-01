import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import { tipo } from "../tablaSimbolos/tipo";

export default class round_ implements expresion {
    public expresion: expresion
    public linea: number
    public columna: number
    constructor(expresion,linea,columna){
        this.expresion = expresion
        this.linea = linea
        this.columna = columna
    }
    getTipo(controlador: controlador, ts: tablaSimbolos) {
        return tipo.ENTERO
    }
    getValor(controlador: controlador, ts: tablaSimbolos) {
        let tipo_ = this.expresion.getTipo(controlador,ts)
        if (tipo_ == tipo.DOUBLE){
            let valor = this.expresion.getValor(controlador,ts)
            valor = Math.round(valor)
            //valor = parseInt(valor)
            console.log(valor)
            return valor
        } else {
            let valor = this.expresion.getValor(controlador,ts)
            let error = new errores('Semantico', `La expresion ${valor} no es un numero`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La expresion ${valor} no es un numero`);
        }
        return null
    }
    recorrer(): nodo {
        let padre = new nodo("Truncate","")
        padre.addHijo(this.expresion.recorrer())
        return padre
    }

}