import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import { instruccion } from "../interfaces/instruccion";
import simbolos from "../tablaSimbolos/simbolos";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import Tipo, { tipo } from "../tablaSimbolos/tipo";
import { expresion } from "../interfaces/expresion";
import vector_ from "../estructuras/vector_";

export default class declaracion implements instruccion {
    public type: Tipo;
    public stype: string;
    public lista_simbolos: Array<simbolos>
    public linea: number;
    public columna: number;

    constructor(type, lista_simbolos, linea, columna) {
        this.type = type;
        this.lista_simbolos = lista_simbolos;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        for (let simbolo of this.lista_simbolos) {
            let variable = simbolo as simbolos;
            variable.tipo = this.type;
            if (ts.existeAtual(variable.identificador)) {
                let error = new errores('Semantico', `La variable ${variable.identificador} ya ha sido declarada en el entorno actual`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.appEnd(`Error semantico: La variable ${variable.identificador} ya ha sido declarada en el entorno actual. Error en la linea ${this.linea} en la columna ${this.columna}`);
                continue;
            }
            if (variable.valor != null) {
                let valor = variable.valor.getValor(controlador, ts);
                let tipo_ = variable.valor.getTipo(controlador, ts);
                if (tipo_ == this.type.type ||
                    (this.type.type == tipo.CARACTER && tipo_ == tipo.CADENA && valor.lenght == 1) ||
                    (tipo_ == tipo.DOUBLE && this.type.type == tipo.ENTERO && !valor.toString().includes('.')) ||
                    (this.type.type == tipo.CADENA && tipo_ == tipo.CARACTER) ||
                    (this.type.type == tipo.VECTOR_INT && tipo_ == tipo.ENTERO) ||
                    (this.type.type == tipo.VECTOR_DOUBLE && tipo_ == tipo.DOUBLE) ||
                    (this.type.type == tipo.VECTOR_BOOLEAN && tipo_ == tipo.BOOLEANO) ||
                    (this.type.type == tipo.VECTOR_CHAR && tipo_ == tipo.CARACTER) ||
                    (this.type.type == tipo.VECTOR_STRING && tipo_ == tipo.CADENA) ||
                    (this.type.type == tipo.LISTA_INT && tipo_ == tipo.ENTERO) ||
                    (this.type.type == tipo.LISTA_DOUBLE && tipo_ == tipo.DOUBLE) ||
                    (this.type.type == tipo.LISTA_BOOLEAN && tipo_ == tipo.BOOLEANO) ||
                    (this.type.type == tipo.LISTA_CHAR && tipo_ == tipo.CARACTER) ||
                    (this.type.type == tipo.LISTA_STRING && tipo_ == tipo.CADENA)
                    ){
                    let newSimbolo = new simbolos(variable.simbolo, this.type, variable.identificador, valor, this.linea, this.columna);
                    ts.agregar(variable.identificador, newSimbolo);
                } else {
                    console.log("ERROR DECLARACION")
                    console.log(this.type.type)
                    console.log(tipo_)
                    let error = new errores('Semantico', `La variable ${variable.identificador} no es compatible con el valor ${valor}`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La variable ${variable.identificador} no es compatible con el valor ${valor}`);
                }
            } else {
                let newSimbolo = new simbolos(variable.simbolo, this.type, variable.identificador, null, this.linea, this.columna);
                ts.agregar(variable.identificador, newSimbolo);
            }
        }
    }
    recorrer(): nodo {
        let padre = new nodo('declaracion', "")
        let nhijo = new nodo(this.type.stype, "")
        padre.addHijo(nhijo)
        for (let nsimbolo of this.lista_simbolos) {
            if (nsimbolo.simbolo == 1) {
                let hijo = new nodo(nsimbolo.identificador, "")
                if (nsimbolo.valor != null) {
                    padre.addHijo(hijo)
                    padre.addHijo(new nodo("=", ""))
                    padre.addHijo(nsimbolo.valor.recorrer())
                } else {
                    padre.addHijo(hijo)
                }
            } else if (nsimbolo.simbolo == 4){
                padre.addHijo(new nodo(nsimbolo.identificador, ""))
                padre.addHijo(new nodo("=",""))
                padre.addHijo(nsimbolo.valor.recorrer())
            } else if (nsimbolo.simbolo == 5){
                padre.addHijo(new nodo(nsimbolo.identificador, ""))
                padre.addHijo(new nodo("=",""))
                padre.addHijo(nsimbolo.valor.recorrer())
            }
        }
        return padre
    }
}