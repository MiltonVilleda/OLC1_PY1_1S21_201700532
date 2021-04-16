import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { instruccion } from "../interfaces/instruccion";
import simbolos from "../tablaSimbolos/simbolos";
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
            let variable = ts.getSimbolo(this.identificador);
            let tipo_var = this.getTipo_(valor);
            let tipo_ = variable.tipo.type;
            if (tipo_ == tipo_var || (tipo_ == tipo.CARACTER && tipo_var == tipo.CADENA && valor.lenght == 1) || (tipo_ == tipo.DOUBLE && tipo_var == tipo.ENTERO)){
                console.log("ASIGNACION, TIPO IGUAL");
                ts.getSimbolo(this.identificador).setValor(valor);
            } else {
                let error = new errores('Semantico', `La variable ${variable.identificador} no es compatible con el valor ${valor}`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La variable ${variable.identificador} no es compatible con el valor ${valor}`);
            }
        } else {
            let error = new errores('Semantico', `La variable ${this.identificador} no ha sido declarada`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.appEnd(`Error semantico: La variable ${this.identificador} no ha sido declarada`);
        }
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }
    getTipo_(valor){
        if (typeof valor === 'number' && valor.toString().includes('.')){
            return tipo.DOUBLE
        } else if (typeof valor === 'number'){
            return tipo.ENTERO
        } else if (typeof valor === 'string' && valor.length == 1){
            return tipo.CARACTER
        } else if (typeof valor === 'string'){
            return tipo.CADENA
        } else if (typeof valor === 'boolean'){
            return tipo.BOOLEANO
        } 
    }
}