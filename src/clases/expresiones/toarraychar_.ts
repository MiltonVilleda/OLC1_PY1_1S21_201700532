import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import lista_ from "../estructuras/lista_";
import { expresion } from "../interfaces/expresion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import { tipo } from "../tablaSimbolos/tipo";
import primitivo from "./primitivo";

export default class toarraychar_ implements expresion{
    public exp: expresion
    public linea: number
    public columna: number
    constructor(exp,linea,columna){
        this.exp = exp
        this.linea = linea
        this.columna = columna
    }
    getTipo(controlador: controlador, ts: tablaSimbolos) {
        return tipo.LISTA_CHAR
    }
    getValor(controlador: controlador, ts: tablaSimbolos) {
        let valor = this.exp.getValor(controlador,ts)
        let tipo_val = this.exp.getTipo(controlador,ts)
        if (tipo_val == tipo.CADENA){
            let str: string = valor
            let arreglo_char = new Array<expresion>()
            for (let i = 0; i < str.length; i++){
                arreglo_char.push(new primitivo(str.charAt(i),this.linea,this.columna))
            }
            return arreglo_char
        } else {
            let error = new errores('Semantico', `La expresion ${valor} no es una cadena`, this.linea, this.columna)
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La expresion ${valor} no es una cadena`);
        }
    }
    recorrer(): nodo {
        let padre = new nodo("ToArrayChar","")
        padre.addHijo(new nodo("(",""))
        padre.addHijo(this.exp.recorrer())
        padre.addHijo(new nodo(")",""))
        return padre
    }

}