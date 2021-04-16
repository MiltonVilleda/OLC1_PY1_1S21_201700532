import nodo from "src/clases/ast/nodo";
import controlador from "src/clases/controlador";
import { expresion } from "src/clases/interfaces/expresion";
import { instruccion } from "src/clases/interfaces/instruccion";
import { tablaSimbolos } from "src/clases/tablaSimbolos/tablaSimbolos";
import { tipo } from "src/clases/tablaSimbolos/tipo";

export default class if_ implements instruccion {
    public condicion: expresion
    public lista_if: Array<instruccion>
    public lista_else: Array<instruccion>
    public linea: number
    public columna: number
    constructor(condicion, lista_if, lista_else, linea, columna) {
        this.condicion = condicion
        this.lista_if = lista_if
        this.lista_else = lista_else
        this.linea = linea
        this.columna = columna
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        let ts_local = new tablaSimbolos(ts)
        let valor_condicion = this.condicion.getValor(controlador, ts)
        if (this.condicion.getTipo(controlador, ts) == tipo.BOOLEANO) {
            if (valor_condicion) {
                for (let instruccion of this.lista_if) {
                    let res = instruccion.ejecutar(controlador, ts_local)
                    // TODO verificar si res es de tipo continue, break, return
                }
            } else {
                for (let instruccion of this.lista_else) {
                    let res = instruccion.ejecutar(controlador, ts_local)
                    // TODO verificar si res es de tipo continue, break, return
                }
            }
        }
        return null
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }

}