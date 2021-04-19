import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { instruccion } from "../interfaces/instruccion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import funcion from "./funcion";

export default class llamada implements instruccion, expresion {
    public identificador: string
    public parametros: Array<expresion>
    public linea: number
    public columna: number
    constructor(identificador, parametros, linea, columna) {
        this.identificador = identificador
        this.parametros = parametros
        this.linea = linea
        this.columna = columna
    }
    getTipo(controlador: controlador, ts: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    getValor(controlador: controlador, ts: tablaSimbolos) {
        //ejecutar
        throw new Error("Method not implemented.");
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        if (ts.existe(this.identificador)) {
            let ts_local = new tablaSimbolos(ts)
            let simbolo_fun = ts.getSimbolo(this.identificador) as funcion
            // TODO validar # parametros y tipo
            let res = simbolo_fun.ejecutar(controlador, ts_local)
            if (res != null) {
                return res
            }
        } else {
            // TODO reportar error
        }
        return null
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }

}