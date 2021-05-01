import { type } from "node:os";
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
    constructor(asig_dec, condicion,actualizacion, lista_instrucciones, linea, columna) {
        this.asig_dec = asig_dec
        this.condicion = condicion
        this.actualizacion = actualizacion
        this.lista_instrucciones = lista_instrucciones
        this.linea = linea
        this.columna = columna
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        //this.condicion.getValor(controlador,ts)
        console.log("ATRIBUTOS")
        console.log(this.asig_dec)
        console.log(this.condicion)
        console.log(this.actualizacion)
        let valor_condicion = this.condicion.getValor(controlador, ts)
        if (typeof valor_condicion === 'boolean') {
            let ts_local = new tablaSimbolos(ts)
            this.asig_dec.ejecutar(controlador,ts_local)
            console.log("VALOR CONDICION:")
            console.log(this.condicion.getValor(controlador,ts_local))
            siguiente:
            while (this.condicion.getValor(controlador,ts_local)){
                for (let instruccion of this.lista_instrucciones){
                    let res = instruccion.ejecutar(controlador, ts_local)
                    if (instruccion instanceof break_ || res instanceof break_) {
                        return res
                    }
                    if (instruccion instanceof continue_ || res instanceof continue_){
                        continue siguiente;
                    }
                }
                this.actualizacion.ejecutar(controlador,ts_local)
                continue siguiente;
            }
        }
        return null
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }

}