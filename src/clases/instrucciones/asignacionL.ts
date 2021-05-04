import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { instruccion } from "../interfaces/instruccion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import { tipo } from "../tablaSimbolos/tipo";

export default class asignacionL implements instruccion{
    public id: string
    public exp: expresion
    public new_exp: expresion
    public linea: number
    public columna: number
    constructor(id, exp, new_exp, linea, columna) {
        this.id = id
        this.exp = exp
        this.new_exp = new_exp
        this.linea = linea
        this.columna = columna
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        let simbol = ts.getSimbolo(this.id)
        let posicion = this.exp.getValor(controlador, ts)
        let tipo_val = this.exp.getTipo(controlador, ts)
        let val_new = this.new_exp.getValor(controlador, ts)
        let tipo_new = this.new_exp.getTipo(controlador, ts)
        if (simbol.simbolo == 5) {
            if (tipo_val == tipo_new ||
                (tipo_val == tipo.CARACTER && tipo_new == tipo.CADENA && val_new.lenght == 1) ||
                (tipo_val == tipo.DOUBLE && tipo_new == tipo.ENTERO) ||
                (tipo_val == tipo.ENTERO && tipo_new == tipo.DOUBLE && !val_new.toString().includes('.')) ||
                tipo_val == tipo.CADENA && tipo_new == tipo.CARACTER) {
                if (posicion < simbol.valor.length) {
                    simbol.valor[posicion] = this.new_exp
                } else {
                    console.log("ERROR")
                    let error = new errores('Semantico', `La lista ${this.id} no tiene posicion ${posicion}`, this.linea, this.columna)
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La lista ${this.id} no tiene posicion ${posicion}`);
                }
            } else {
                console.log("ERROR")
                let error = new errores('Semantico', `La lista ${this.id} no es compatible con el valor ${val_new}`, this.linea, this.columna)
                controlador.errores.push(error);
                controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La lista ${this.id} no es compatible con el valor ${val_new}`);
            }
        } else {
            console.log("ERROR")
            let error = new errores('Semantico', `La variable ${this.id} no es una lista`, this.linea, this.columna)
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La variable ${this.id} no es una lista`);
        }
    }
    recorrer(): nodo {
        let padre = new nodo("Asignacion", "")
        padre.addHijo(new nodo(this.id, ""))
        padre.addHijo(new nodo("[", ""))
        padre.addHijo(this.exp.recorrer())
        padre.addHijo(new nodo("]", ""))
        padre.addHijo(new nodo("=", ""))
        padre.addHijo(this.new_exp.recorrer())
        return padre
    }

}