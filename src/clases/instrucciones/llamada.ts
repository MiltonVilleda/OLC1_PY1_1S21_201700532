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
        if (ts.existe(this.identificador)) {
            let correcto = true
            let linea, columna, id, val
            let simbolo_fun = ts.getSimbolo(this.identificador) as funcion
            let size = this.parametros.length
            let valores_aux = new Array<any>()
            let valores_in = new Array<any>()
            let cadena: string = ""
            if (this.parametros.length == simbolo_fun.lista_param.length && size > 0) {
                //GUARDAR VALORES_IN
                //console.log("VALORES DE ENTRADA")
                for (let i = 0; i < simbolo_fun.lista_param.length; i++) {
                    let valor = this.parametros[i].getValor(controlador, ts)
                    //console.log("VAL["+i+"]="+valor)
                    valores_in.push(valor)
                }
            }
            if (this.parametros.length == simbolo_fun.lista_param.length && size > 0) {
                //GUARDAR VALORES_AUX
                for (let i = 0; i < simbolo_fun.lista_param.length; i++) {
                    valores_aux.push(simbolo_fun.lista_param[i].valor)
                }
            }
            if (this.parametros.length == simbolo_fun.lista_param.length && size > 0) {
                //GUARDAR DA NUEVOS VALORES
                for (let i = 0; i < simbolo_fun.lista_param.length; i++) {
                    simbolo_fun.lista_param[i].setValor(valores_in[i])
                }
            }
            /*if (size > 0) {
                console.log("PARAMETROS ASIGNADOS")
                for (let i = 0; i < simbolo_fun.lista_param.length; i++) {
                    console.log(i + ". " + simbolo_fun.lista_param[i].valor)
                }
            }*/
            if (correcto) {
                let res = simbolo_fun.ejecutar(controlador, ts)
                for (let i = 0; i < size; i++) {
                    simbolo_fun.lista_param[i].setValor(valores_aux[i])
                }
                if (res != null) {
                    return res
                }
            } else {
                for (let i = 0; i < this.parametros.length; i++) {
                    simbolo_fun.lista_param[i].setValor(valores_aux[i])
                }
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
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        if (ts.existe(this.identificador)) {
            let correcto = true
            let linea, columna, id, val
            //let ts_local = new tablaSimbolos(ts)
            let simbolo_fun = ts.getSimbolo(this.identificador) as funcion
            let size = this.parametros.length
            let valores_aux = new Array<any>()
            let valores_in = new Array<any>()
            let cadena: string = ""
            if (this.parametros.length == simbolo_fun.lista_param.length && size > 0) {
                //GUARDAR VALORES_IN
                console.log("VALORES DE ENTRADA")
                for (let i = 0; i < simbolo_fun.lista_param.length; i++) {
                    let valor = this.parametros[i].getValor(controlador, ts)
                    console.log("VAL["+i+"]="+valor)
                    valores_in.push(valor)
                }
            }
            if (this.parametros.length == simbolo_fun.lista_param.length && size > 0) {
                //GUARDAR VALORES_AUX
                for (let i = 0; i < simbolo_fun.lista_param.length; i++) {
                    valores_aux.push(simbolo_fun.lista_param[i].valor)
                }
            }
            if (this.parametros.length == simbolo_fun.lista_param.length && size > 0) {
                //GUARDAR DA NUEVOS VALORES
                for (let i = 0; i < simbolo_fun.lista_param.length; i++) {
                    simbolo_fun.lista_param[i].setValor(valores_in[i])
                }
            }
            if (size > 0) {
                console.log("PARAMETROS ASIGNADOS")
                for (let i = 0; i < simbolo_fun.lista_param.length; i++) {
                    console.log(i + ". " + simbolo_fun.lista_param[i].valor)
                }
            }
            if (correcto) {
                let res = simbolo_fun.ejecutar(controlador, ts)
                for (let i = 0; i < size; i++) {
                    simbolo_fun.lista_param[i].setValor(valores_aux[i])
                }
                if (res != null) {
                    return res
                }
            } else {
                for (let i = 0; i < this.parametros.length; i++) {
                    simbolo_fun.lista_param[i].setValor(valores_aux[i])
                }
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
            let hijo = new nodo("Parametros", "")
            for (let i = 0; i < this.parametros.length; i++) {
                hijo.addHijo(this.parametros[i].recorrer())
            }
            padre.addHijo(hijo)
        }
        padre.addHijo(new nodo(")", ""))
        return padre
    }

}