import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { instruccion } from "../interfaces/instruccion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import { tipo } from "../tablaSimbolos/tipo";

export default class addToL implements instruccion {
    public id: string
    public valor: expresion
    public linea: number
    public columna: number
    constructor(id, valor, linea, columna) {
        this.id = id
        this.valor = valor
        this.linea = linea
        this.columna = columna
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        let simbol = ts.getSimbolo(this.id)
        let tipo_var = simbol.tipo.type
        let val = this.valor.getValor(controlador, ts)
        let tipo_val = this.valor.getTipo(controlador, ts)
        if (simbol.simbolo == 5) {
            console.log("Es una lista")
            if (
                (tipo_var == tipo.LISTA_INT && tipo_val == tipo.DOUBLE && !val.toString().includes('.')) ||
                (tipo_var == tipo.LISTA_INT && tipo_val == tipo.DOUBLE) ||
                (tipo_var == tipo.LISTA_BOOLEAN && tipo_val == tipo.BOOLEANO) ||
                (tipo_var == tipo.LISTA_CHAR && tipo_val == tipo.CARACTER) ||
                (tipo_var == tipo.LISTA_STRING && tipo_val == tipo.CADENA) ||
                (tipo_var == tipo.LISTA_STRING && tipo_val == tipo.CARACTER)
            ) {
                simbol.valor.push(this.valor)
            } else {
                let error = new errores('Semantico', `La lsita ${this.id} no es compatible con el valor ${val}`, this.linea, this.columna)
                controlador.errores.push(error);
                controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La lsita ${this.id} no es compatible con el valor ${val}`);
            }
        } else {
            let error = new errores('Semantico', `La variable ${this.id} no es una lista`, this.linea, this.columna)
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La variable ${this.id} no es una lista`);
        }
    }
    recorrer(): nodo {
        let padre = new nodo("Add", "")
        padre.addHijo(new nodo(this.id,""))
        padre.addHijo(this.valor.recorrer())
        return padre
    }

}