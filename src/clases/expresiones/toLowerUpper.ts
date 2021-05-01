import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import { tipo } from "../tablaSimbolos/tipo";

export default class toLowerUpper implements expresion {
    public expresion: expresion
    public linea: number
    public columna: number
    public lower: boolean
    constructor(expresion, linea, columna, lower) {
        this.expresion = expresion
        this.linea = linea
        this.columna = columna
        this.lower = lower
    }
    getTipo(controlador: controlador, ts: tablaSimbolos) {
        return tipo.CADENA
    }
    getValor(controlador: controlador, ts: tablaSimbolos) {
        let tipo_ = this.expresion.getTipo(controlador, ts)
        if (tipo_ == tipo.CADENA) {
            if (this.lower) {
                let valor = this.expresion.getValor(controlador, ts)
                valor = valor.toString().toLowerCase()
                console.log(valor)
                return valor
            }
            let valor = this.expresion.getValor(controlador, ts)
            valor = valor.toString().toUpperCase()
            console.log(valor)
            return valor            
        } else {
            let valor = this.expresion.getValor(controlador,ts)
            let error = new errores('Semantico', `La expresion ${valor} no es una cadena`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La expresion ${valor} no es una cadena`);
        }
        return null
    }
    recorrer(): nodo {
        if (this.lower) {
            let padre = new nodo("ToLower", "")
            padre.addHijo(new nodo("(", ""))
            padre.addHijo(this.expresion.recorrer())
            padre.addHijo(new nodo(")", ""))
            return padre
        }
        let padre = new nodo("ToUpper", "")
        padre.addHijo(new nodo("(", ""))
        padre.addHijo(this.expresion.recorrer())
        padre.addHijo(new nodo(")", ""))
        return padre
    }

}