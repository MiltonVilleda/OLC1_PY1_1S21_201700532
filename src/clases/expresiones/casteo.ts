import { parse } from "node:path";
import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import Tipo, { tipo } from "../tablaSimbolos/tipo";

export default class casteo implements expresion {
    public tipo_: Tipo
    public expresion: expresion
    public linea: number
    public columna: number
    constructor(tipo_, expresion, linea, columna) {
        this.tipo_ = tipo_
        this.expresion = expresion
        this.linea = linea
        this.columna = columna
    }
    getTipo(controlador: controlador, ts: tablaSimbolos) {
        return this.tipo_.type
    }
    getValor(controlador: controlador, ts: tablaSimbolos) {
        let valor = this.expresion.getValor(controlador, ts)
        console.log("VALOR")
        console.log(valor)
        let tipo_val = this.expresion.getTipo(controlador, ts)
        switch (this.tipo_.type) {
            case tipo.ENTERO:
                if (tipo_val == tipo.ENTERO || tipo_val == tipo.DOUBLE) {
                    return parseInt(valor)
                } else if (tipo_val == tipo.CARACTER) {
                    return valor.charCodeAt(0)
                } else {
                    let error = new errores('Semantico', `La expresion ${valor} no es casteable a tipo int`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La expresion ${valor} no es casteable a tipo int`);
                    return null
                }
            case tipo.DOUBLE:
                if (tipo_val == tipo.ENTERO || tipo_val == tipo.DOUBLE) {
                    return valor
                } else {
                    let error = new errores('Semantico', `La expresion ${valor} no es casteable a tipo double`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La expresion ${valor} no es casteable a tipo double`);
                    return null
                }
            case tipo.CADENA:
                if (tipo_val == tipo.ENTERO || tipo_val == tipo.DOUBLE) {
                    return valor.toString()
                } else {
                    let error = new errores('Semantico', `La expresion ${valor} no es casteable a tipo string`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La expresion ${valor} no es casteable a tipo string`);
                    return null
                }
            case tipo.CARACTER:
                if (tipo_val == tipo.ENTERO || (tipo_val == tipo.DOUBLE && !valor.toString().includes('.'))) {
                    let numero = parseInt(valor)
                    return String.fromCharCode(numero)
                } else {
                    let error = new errores('Semantico', `La expresion ${valor} no es casteable a tipo char`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La expresion ${valor} no es casteable a tipo char`);
                    return null
                }
            default:
                let error = new errores('Semantico', `La expresion no es casteable`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La expresion no es casteable`);
                return null
        }
    }
    recorrer(): nodo {
        let padre = new nodo("Casteo","")
        padre.addHijo(new nodo(this.tipo_.stype,""))
        padre.addHijo(new nodo("(",""))
        padre.addHijo(this.expresion.recorrer())
        padre.addHijo(new nodo(")",""))
        return padre
    }

}