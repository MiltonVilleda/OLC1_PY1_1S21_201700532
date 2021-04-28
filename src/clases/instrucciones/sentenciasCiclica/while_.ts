import nodo from "src/clases/ast/nodo";
import controlador from "src/clases/controlador";
import { expresion } from "src/clases/interfaces/expresion";
import { instruccion } from "src/clases/interfaces/instruccion";
import { tablaSimbolos } from "src/clases/tablaSimbolos/tablaSimbolos";
import break_ from "../sentenciasTransferencia/break_";
import continue_ from "../sentenciasTransferencia/continue_";

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
            siguiente:
            while (this.condicion.getValor(controlador, ts)) {
                let ts_local = new tablaSimbolos(ts)
                for (let instruccion of this.lista_instrucciones) {
                    let res = instruccion.ejecutar(controlador, ts_local)
                    // TODO verificar si res es de tipo continue, break, return
                    if (instruccion instanceof break_ || res instanceof break_) {
                        return res
                    }
                    if (instruccion instanceof continue_ || res instanceof continue_){
                        continue siguiente;
                    }
                }
                continue siguiente;
            }
        }
    }
    recorrer(): nodo {
        let padre = new nodo("While","")
        let n_cond = new nodo("Condicion","")
        n_cond.addHijo(this.condicion.recorrer())
        padre.addHijo(n_cond)
        let n_inst = new nodo("Instrucciones","")
        for (let inst of this.lista_instrucciones){
            n_inst.addHijo(inst.recorrer())
        }
        padre.addHijo(n_inst)
        return padre
    }

}