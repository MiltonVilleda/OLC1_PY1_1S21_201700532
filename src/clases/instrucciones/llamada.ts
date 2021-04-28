import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { instruccion } from "../interfaces/instruccion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import { tipo } from "../tablaSimbolos/tipo";
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
        let fun = ts.getSimbolo(this.identificador) as funcion;
        return fun.tipo.type
    }
    getValor(controlador: controlador, ts: tablaSimbolos) {
        this.ejecutar(controlador,ts)
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        if (ts.existe(this.identificador)) {
            let correcto = true
            let linea, columna, id, val
            let ts_local = new tablaSimbolos(ts)
            let simbolo_fun = ts.getSimbolo(this.identificador) as funcion
            if (this.parametros.length == simbolo_fun.lista_param.length) {
                for (let i = 0; i < this.parametros.length; i++) {
                    let tipo_base = simbolo_fun.lista_param[i].tipo.type
                    let tipo_in = this.parametros[i].getTipo(controlador, ts_local)
                    let valor = this.parametros[i].getValor(controlador, ts_local)
                    linea = simbolo_fun.lista_param[i].linea
                    columna = simbolo_fun.lista_param[i].columna
                    id = simbolo_fun.lista_param[i].identificador
                    val = valor
                    if (tipo_base == tipo_in || (tipo_base == tipo.CARACTER && tipo_in == tipo.CADENA && valor.lenght == 1) || (tipo_base == tipo.ENTERO && tipo_in == tipo.DOUBLE && !valor.toString().includes('.'))) {
                        simbolo_fun.lista_param[i].setValor(this.parametros[i].getValor(controlador, ts_local))
                    } else {
                        correcto = false
                    }
                }
            }
            if (correcto) {
                let res = simbolo_fun.ejecutar(controlador, ts_local)
                if (res != null) {
                    return res
                }
            } else {
                let error = new errores('Semantico', `La variable ${id} no es compatible con el valor ${val}`, linea, columna);
                controlador.errores.push(error);
                controlador.appEnd(`Error semantico en la linea ${linea} en la columna ${columna}: La variable ${id} no es compatible con el valor ${val}`);
            }
        } else {
            let error = new errores('Semantico', `La funcion/metodo ${this.identificador} no ha sido declarada`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La funcion/metodo ${this.identificador} no ha sido declarada`);
        }
        return null
    }
    recorrer(): nodo {
        let padre = new nodo('llamada', "")
        padre.addHijo(new nodo(this.identificador, ""))
        padre.addHijo(new nodo("(", ""))
        if (this.parametros.length > 0) {
            let hijo = new nodo("Parametros","")
            for (let i = 0; i<this.parametros.length; i++){
                hijo.addHijo(this.parametros[i].recorrer())
            }
            padre.addHijo(hijo)
        }
        padre.addHijo(new nodo(")", ""))
        return padre
    }

}