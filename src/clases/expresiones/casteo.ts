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
        switch (this.tipo_.type) {
            case tipo.ENTERO:
                return parseInt(valor)
            case tipo.DOUBLE:
                return parseFloat(valor)
            case tipo.CADENA:
                return valor.toString()
            case tipo.CARACTER:
                return valor
            default:
                let error = new errores('Semantico', `La expresion no es casteable`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La expresion no es casteable`);
                return null
        }
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }

}