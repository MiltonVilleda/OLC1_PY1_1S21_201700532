import errores from "../ast/errores";
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
    constructor(simbolo: number, tipo: tipo, identificador: string, lista_params, metodo, lista_instrucciones, linea, columna) {
        super(simbolo, tipo, identificador, null, linea, columna, lista_params, metodo)
        this.lista_instrucciones = lista_instrucciones
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        let correcto = true
        let ts_local = new tablaSimbolos(ts)
        if (this.lista_param.length > 0) {
            for (let param of this.lista_param) {
                if (!ts_local.existe(param.identificador)) {
                    ts_local.agregar(param.identificador, param)
                } else {
                    let error = new errores('Semantico', `La variable ${param.identificador} ya ha sido declarada`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La variable ${param.identificador} ya ha sido declarada`);
                    correcto = false
                    break
                }
            }
        }
        if (correcto) {
            for (let instruccion of this.lista_instrucciones) {
                let res = instruccion.ejecutar(controlador, ts_local)
                if (res != null) {
                    return res
                }
            }
        }
        return null
    }
    agregarSimboloFuncion(controlador: controlador, ts: tablaSimbolos) {
        if (!(ts.existe(this.identificador))) {
            ts.agregar(this.identificador, this)
        } else {
            let error = new errores('Semantico', `La funcion/metodo ${this.identificador} ya ha sido declarada`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La funcion/metodo ${this.identificador} ya ha sido declarada`);
        }
    }
    recorrer(): nodo {
        let padre = new nodo('funcion', "")
        padre.addHijo(new nodo(this.tipo.stype, ""))
        padre.addHijo(new nodo(this.identificador, ""))
        padre.addHijo(new nodo("(", ""))
        if (this.lista_param.length > 0){
            let hijo = new nodo("Parametros","")
            for (let i = 0; i < this.lista_param.length; i++){
                hijo.addHijo(new nodo(this.lista_param[i].identificador,""))
            }
            padre.addHijo(hijo)
        }
        padre.addHijo(new nodo(")", ""))
        padre.addHijo(new nodo("{", ""))
        let hijo = new nodo("instrucciones", "")
        for (let intstruccion of this.lista_instrucciones) {
            hijo.addHijo(intstruccion.recorrer())
        }
        padre.addHijo(hijo)
        padre.addHijo(new nodo("}", ""))
        return padre
    }

}