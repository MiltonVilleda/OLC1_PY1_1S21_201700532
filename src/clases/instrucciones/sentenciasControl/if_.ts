import errores from "src/clases/ast/errores";
import nodo from "src/clases/ast/nodo";
import controlador from "src/clases/controlador";
import { expresion } from "src/clases/interfaces/expresion";
import { instruccion } from "src/clases/interfaces/instruccion";
import { tablaSimbolos } from "src/clases/tablaSimbolos/tablaSimbolos";
import { tipo } from "src/clases/tablaSimbolos/tipo";
import break_ from "../sentenciasTransferencia/break_";
import return_ from "../sentenciasTransferencia/return_";

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
                console.log("Ejecuta if:")
                console.log(this.lista_if)
                for (let instruccion of this.lista_if) {
                    let res = instruccion.ejecutar(controlador, ts_local)
                    // TODO verificar si res es de tipo continue, break, return
                    if (instruccion instanceof break_ || res instanceof break_) {
                        return res
                    }
                    if (instruccion instanceof return_ || res != null){
                        return res
                    }
                }
            } else {
                console.log("Ejecuta else:")
                console.log(this.lista_if)
                for (let instruccion of this.lista_else) {
                    let res = instruccion.ejecutar(controlador, ts_local)
                    // TODO verificar si res es de tipo continue, break, return
                    if (instruccion instanceof break_ || res instanceof break_) {
                        return res
                    }
                    if (instruccion instanceof return_ || res != null){
                        return res
                    }
                }
            }
        } else {
            let error = new errores('Semantico', `La expresion ${valor_condicion} no es de tipo boolean`, this.linea, this.columna)
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La expresion ${valor_condicion} no es de tipo boolean`);
        }
        return null
    }
    recorrer(): nodo {
        let padre = new nodo("IF","")
        let exp = new nodo("Expresion","")
        exp.addHijo(this.condicion.recorrer())
        padre.addHijo(exp)
        if (this.lista_if.length > 0){
            let l_if = new nodo("Instrucciones if","")
            for (let inst of this.lista_if){
                l_if.addHijo(inst.recorrer())
            }
            padre.addHijo(l_if)
        }
        if (this.lista_else.length > 0){
            let l_else = new nodo("Instrucciones else","")
            for (let inst of this.lista_else){
                l_else.addHijo(inst.recorrer())
            }
            padre.addHijo(l_else)
        }
        return padre
    }

}