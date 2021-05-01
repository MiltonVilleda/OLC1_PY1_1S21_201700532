import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { instruccion } from "../interfaces/instruccion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import { tipo } from "../tablaSimbolos/tipo";

export default class asignacion implements instruccion {
    public identificador: string;
    public valor: expresion;
    public linea: number;
    public columna: number;

    constructor(identificador, valor, linea, columna) {
        this.identificador = identificador;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        if (ts.existe(this.identificador)) {
            let valor = this.valor.getValor(controlador, ts);
            if (valor != null) {
                let variable = ts.getSimbolo(this.identificador);
                let tipo_val = this.valor.getTipo(controlador,ts)
                let tipo_ = variable.tipo.type;
                if (
                    tipo_ == tipo_val || 
                    (tipo_ == tipo.CARACTER && tipo_val == tipo.CADENA && valor.lenght == 1) || 
                    (tipo_ == tipo.DOUBLE && tipo_val == tipo.ENTERO) ||
                    (tipo_ == tipo.ENTERO && tipo_val == tipo.DOUBLE && !valor.toString().includes('.')) ||
                    tipo_ == tipo.CADENA && tipo_val == tipo.CARACTER) {
                    ts.getSimbolo(this.identificador).setValor(valor);
                } else {
                    let error = new errores('Semantico', `La variable ${variable.identificador} no es compatible con el valor ${valor}`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La variable ${variable.identificador} no es compatible con el valor ${valor}`);
                }
            }
        } else {
            let error = new errores('Semantico', `La variable ${this.identificador} no ha sido declarada`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico: La variable ${this.identificador} no ha sido declarada`);
        }
    }
    recorrer(): nodo {
        let padre = new nodo("asignacion", "")
        padre.addHijo(new nodo(this.identificador, ""))
        padre.addHijo(new nodo("=", ""))
        padre.addHijo(this.valor.recorrer())
        return padre
    }
    getTipo_(valor) {
        if (typeof valor === 'number' && valor.toString().includes('.')) {
            return tipo.DOUBLE
        } else if (typeof valor === 'number') {
            return tipo.ENTERO
        } else if (typeof valor === 'string' && valor.length == 1) {
            return tipo.CARACTER
        } else if (typeof valor === 'string') {
            return tipo.CADENA
        } else if (typeof valor === 'boolean') {
            return tipo.BOOLEANO
        }
    }
}