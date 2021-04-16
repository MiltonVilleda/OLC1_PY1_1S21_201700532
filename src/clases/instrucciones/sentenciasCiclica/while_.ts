import nodo from "src/clases/ast/nodo";
import controlador from "src/clases/controlador";
import { expresion } from "src/clases/interfaces/expresion";
import { instruccion } from "src/clases/interfaces/instruccion";
import { tablaSimbolos } from "src/clases/tablaSimbolos/tablaSimbolos";

export default class while_ implements instruccion {
    public condicion: expresion
    public lista_instrucciones: Array<instruccion>
    public linea: number
    public columna: number
    constructor(condicion, lista_instrucciones, linea, columna) {
        this.condicion = condicion
        this.lista_instrucciones = lista_instrucciones
        this.linea = linea
        this.columna = columna
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        let valor_condicion = this.condicion.getValor(controlador, ts)
        if (typeof valor_condicion === 'boolean') {
            while (this.condicion.getValor(controlador, ts)) {
                let ts_local = new tablaSimbolos(ts)
                for (let instruccion of this.lista_instrucciones) {
                    let res = instruccion.ejecutar(controlador, ts_local)
                    // TODO verificar si res es de tipo continue, break, return
                }
            }
        }
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }

}