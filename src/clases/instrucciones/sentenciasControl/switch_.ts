import nodo from "src/clases/ast/nodo";
import controlador from "src/clases/controlador";
import { expresion } from "src/clases/interfaces/expresion";
import { instruccion } from "src/clases/interfaces/instruccion";
import { tablaSimbolos } from "src/clases/tablaSimbolos/tablaSimbolos";
import break_ from "../sentenciasTransferencia/break_";
import continue_ from "../sentenciasTransferencia/continue_";
import return_ from "../sentenciasTransferencia/return_";
import case_ from "./case_";

export default class switch_ implements instruccion {
    public exp: expresion
    public lista_cases: Array<case_>
    public lista_defult: Array<instruccion>
    public linea: number
    public columna: number
    constructor(exp, lista_cases, lista_defult, linea, columna) {
        this.exp = exp
        this.lista_cases = lista_cases
        this.lista_defult = lista_defult
        this.linea = linea
        this.columna = columna
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        let valor = this.exp.getValor(controlador, ts)
        let match = false
        let contain_break = false
        console.log("SWITCH")
        if (this.lista_cases.length > 0) {
            console.log("CASES")
            for (let caso of this.lista_cases) {
                let valor_case = caso.exp.getValor(controlador, ts)
                if (valor == valor_case) {
                    match = true
                    for (let inst_case of caso.lista_instrucciones) {
                        let res = inst_case.ejecutar(controlador, ts)
                        // TODO verificar si res es de tipo continue, break, return
                        if (inst_case instanceof break_ || res instanceof break_) {
                            contain_break = true
                            return res
                        }
                        if (inst_case instanceof return_ || res != null) {
                            return res
                        }
                    }
                } else if (match && !contain_break){
                    for (let inst_case of caso.lista_instrucciones) {
                        let res = inst_case.ejecutar(controlador, ts)
                        // TODO verificar si res es de tipo continue, break, return
                        if (inst_case instanceof break_ || res instanceof break_) {
                            return res
                        }
                        if (inst_case instanceof return_ || res != null) {
                            return res
                        }
                    }
                }
            }
        }
        if ((!match && this.lista_defult.length > 0) || (match && !contain_break && this.lista_defult.length > 0)) {
            console.log("DEFAULT")
            for (let instruccion of this.lista_defult) {
                let res = instruccion.ejecutar(controlador, ts)
                // TODO verificar si res es de tipo continue, break, return
                if (instruccion instanceof break_ || res instanceof break_) {
                    return res
                }
                if (instruccion instanceof return_ || res != null) {
                    return res
                }
            }
        }
    }
    recorrer(): nodo {
        let padre = new nodo("Switch", "")
        if (this.lista_cases.length > 0) {
            for (let case_ of this.lista_cases) {
                let caso = new nodo("Case", "")
                caso.addHijo(case_.exp.recorrer())
                let instruccion = new nodo("Instrucciones", "")
                for (let inst_case of case_.lista_instrucciones) {
                    instruccion.addHijo(inst_case.recorrer())
                }
                caso.addHijo(instruccion)
                padre.addHijo(caso)
            }
        }
        if (this.lista_defult.length > 0) {
            let def = new nodo("Default", "")
            let instruccion = new nodo("Instrucciones", "")
            for (let inst_def of this.lista_defult) {
                instruccion.addHijo(inst_def.recorrer())
            }
            def.addHijo(instruccion)
            padre.addHijo(def)
        }
        return padre
    }

}