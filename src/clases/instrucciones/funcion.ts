import nodo from "../ast/nodo";
import controlador from "../controlador";
import { instruccion } from "../interfaces/instruccion";
import simbolos from "../tablaSimbolos/simbolos";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import tipo from "../tablaSimbolos/tipo";

export default class funcion extends simbolos implements instruccion {
    public lista_instrucciones: Array<instruccion>
    public linea: number
    public columna: number

    constructor(simbolo: number, tipo: tipo, identificador: string, valor: any, lista_params, metodo, lista_instrucciones, linea, columna) {
        super(simbolo, tipo, identificador, null, linea, columna, lista_params, metodo)
        this.lista_instrucciones = lista_instrucciones
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        console.log("INSTRUCCIONES: "+this.lista_instrucciones)
        let ts_local = new tablaSimbolos(ts)
        for (let instruccion of this.lista_instrucciones) {
            let res = instruccion.ejecutar(controlador, ts_local)
            if (res != null) {
                return res
            }
        }
        return null
    }
    agregarSimboloFuncion(controlador: controlador, ts: tablaSimbolos) {
        if (!(ts.existe(this.identificador))) {
            ts.agregar(this.identificador, this)
        } else {
            // TODO error
        }
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }

}