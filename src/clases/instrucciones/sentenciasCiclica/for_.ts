import nodo from "../../ast/nodo";
import controlador from "../../controlador";
import { expresion } from "../../interfaces/expresion";
import { instruccion } from "../../interfaces/instruccion";
import { tablaSimbolos } from "../../tablaSimbolos/tablaSimbolos";
import break_ from "../sentenciasTransferencia/break_";
import continue_ from "../sentenciasTransferencia/continue_";

export default class for_ implements instruccion {
    public asig_dec: instruccion
    public condicion: expresion
    public actualizacion: instruccion
    public lista_instrucciones: Array<instruccion>
    public linea: number
    public columna: number
    constructor(asig_dec, condicion, actualizacion, lista_instrucciones, linea, columna) {
        this.asig_dec = asig_dec
        this.condicion = condicion
        this.actualizacion = actualizacion
        this.lista_instrucciones = lista_instrucciones
        this.linea = linea
        this.columna = columna
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        let ts_aux = new tablaSimbolos(ts)
        ts_aux.nombre = ts.nombre
        this.asig_dec.ejecutar(controlador, ts_aux)
        let val_condicion = this.condicion.getValor(controlador, ts_aux)
        if (typeof val_condicion === 'boolean') {
            siguiente:
            while (this.condicion.getValor(controlador, ts_aux)) {
                let ts_local = new tablaSimbolos(ts_aux)
                ts_local.nombre = ts_aux.nombre+"/for"
                for (let instruccion of this.lista_instrucciones) {
                    let res = instruccion.ejecutar(controlador, ts_local)
                    if (instruccion instanceof break_ || res instanceof break_) {
                        return res
                    }
                    if (instruccion instanceof continue_ || res instanceof continue_) {
                        continue siguiente
                    }
                }
                this.actualizacion.ejecutar(controlador, ts_local)
                continue siguiente
            }
        }
    }
    recorrer(): nodo {
        let padre = new nodo("For","")
        let ncondicion = new nodo("Condicion","")
        ncondicion.addHijo(this.condicion.recorrer())
        let nactua = new nodo("Actualizacion","")
        nactua.addHijo(this.actualizacion.recorrer())
        let instrucciones = new nodo ("Instrucciones","")
        for (let inst of this.lista_instrucciones){
            instrucciones.addHijo(inst.recorrer())
        }
        padre.addHijo(this.asig_dec.recorrer())
        padre.addHijo(ncondicion)
        padre.addHijo(nactua)
        padre.addHijo(instrucciones)
        return padre
    }

}