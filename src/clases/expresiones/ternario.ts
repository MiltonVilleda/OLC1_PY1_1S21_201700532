import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";

export default class ternario implements expresion {
    public condicion: expresion
    public verdadero: expresion
    public falso: expresion
    public linea: number
    public columna: number
    constructor(condicion, verdadero, falso, linea, columna) {
        this.condicion = condicion
        this.verdadero = verdadero
        this.falso = falso
        this.linea = linea
        this.columna = columna
    }
    getTipo(controlador: controlador, ts: tablaSimbolos) {
        let valor_condicion = this.condicion.getValor(controlador, ts)
        if (typeof valor_condicion === 'boolean') {
            return this.condicion ? this.verdadero.getTipo(controlador, ts) : this.falso.getTipo(controlador, ts)
        } else {
            // TODO error semantico
        }
    }
    getValor(controlador: controlador, ts: tablaSimbolos) {
        let valor_condicion = this.condicion.getValor(controlador, ts)
        if (typeof valor_condicion === 'boolean') {
            return this.condicion ? this.verdadero.getValor(controlador, ts) : this.falso.getValor(controlador, ts)
        } else {
            // TODO error semantico
        }
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }

}