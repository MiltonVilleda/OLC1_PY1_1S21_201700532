import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import { instruccion } from "../interfaces/instruccion";
import simbolos from "../tablaSimbolos/simbolos";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import Tipo from "../tablaSimbolos/tipo";

export default class declaracion implements instruccion{
    public type: Tipo;
    public stype: string;
    public lista_simbolos: Array<simbolos>
    public linea: number;
    public columna: number;

    constructor(type, lista_simbolos, linea, columna){
        this.type = type;
        this.lista_simbolos = lista_simbolos;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        for (let simbolo of this.lista_simbolos){
            let variable = simbolo as simbolos;
            if (ts.existeAtual(variable.identificador)){
                let error = new errores('Semantico',`La variable ${variable.identificador}ya ha sido declarada en el entorno actual`,this.linea, this.columna);
                controlador.errores.push(error);
                controlador.appEnd(`Error semantico: La variable ${variable.identificador}ya ha sido declarada en el entorno actual. Error en la linea ${this.linea} en la columna ${this.columna}`);
                continue;
            }
            if (variable.valor != null){
                let valor = variable.valor.getValor(controlador, ts);
                // TODO: verificar que el tipo del valor obtenido sea igual al de la declaracionx
                let newSimbolo = new simbolos(variable.simbolo, this.type, variable.identificador, valor);
                ts.agregar(variable.identificador, newSimbolo);
            } else {
                let newSimbolo = new simbolos(variable.simbolo, this.type, variable.identificador, null);
                ts.agregar(variable.identificador, newSimbolo);            }
        }
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }
}