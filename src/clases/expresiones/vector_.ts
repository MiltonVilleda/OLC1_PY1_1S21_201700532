import errores from "../ast/errores";
import nodo from "../ast/nodo";
import controlador from "../controlador";
import { expresion } from "../interfaces/expresion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import Tipo, { tipo } from "../tablaSimbolos/tipo";
import primitivo from "./primitivo";

export default class vector_ implements expresion {
    //tipo CORA CORC ID IGUAL NEW tipo CORA e CORC
    public tipo_: Tipo
    public size: expresion
    public valor: Array<expresion>
    public linea: number
    public columna: number
    constructor(tipo, size, valor, linea, columna) {
        this.tipo_ = tipo
        this.size = size
        this.valor = valor
        this.linea = linea
        this.columna = columna
    }
    getTipo(controlador: controlador, ts: tablaSimbolos) {
        if (this.tipo_.type == tipo.ENTERO) {
            return tipo.VECTOR_INT
        } else if (this.tipo_.type == tipo.DOUBLE) {
            return tipo.VECTOR_DOUBLE
        } else if (this.tipo_.type == tipo.BOOLEANO) {
            return tipo.VECTOR_BOOLEAN
        } else if (this.tipo_.type == tipo.CADENA) {
            return tipo.VECTOR_STRING
        } else if (this.tipo_.type == tipo.CARACTER) {
            return tipo.VECTOR_CHAR
        }
    }
    getValor(controlador: controlador, ts: tablaSimbolos) {
        if (this.size != null) {
            let size_aux = this.size.getValor(controlador, ts)
            let tipo_size = this.size.getTipo(controlador, ts)
            let new_val: primitivo
            if (tipo_size == tipo.ENTERO || tipo_size == tipo.DOUBLE) {
                this.valor = new Array<expresion>()
                if (this.tipo_.type == tipo.ENTERO || this.tipo_.type == tipo.DOUBLE) {
                    new_val = new primitivo(0, 0, 0)
                } else if (this.tipo_.type == tipo.BOOLEANO) {
                    new_val = new primitivo(true, 0, 0)
                } else if (this.tipo_.type == tipo.CARACTER || this.tipo_.type == tipo.CADENA) {
                    new_val = new primitivo(" ", 0, 0)
                }
                for (let i = 0; i < size_aux; i++) {
                    this.valor.push(new_val)
                }
                return this.valor
            }
        } else {
            let new_val = new Array<expresion>()
            for (let i = 0; i < this.valor.length; i++) {
                let val = this.valor[i]
                let val_ = val.getValor(controlador, ts)
                console.log("TIPOS EN EL VECTOR")
                console.log(this.tipo_.type)
                console.log(val.getTipo(controlador, ts))
                if ((this.tipo_.type == val.getTipo(controlador, ts)) || (this.tipo_.type == tipo.ENTERO && val.getTipo(controlador, ts) == tipo.DOUBLE && !val_.toString().includes('.'))) {
                    new_val.push(this.valor[i])
                } else {
                    let error = new errores('Semantico', `El valor ${val_} no se puede asignar a un vector de tipo ${this.tipo_.stype}`, this.linea, this.columna)
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: El valor ${val_} no se puede asignar a un vector de tipo ${this.tipo_.stype}`);
                }
            }
            if (new_val.length > 0) {
                this.valor = new_val
                this.size = new primitivo(this.valor.length, 0, 0)
                return this.valor
            }
        }
        return null
    }
    recorrer(): nodo {
        let padre = new nodo("Vector", "")
        for (let exp of this.valor){
            padre.addHijo(exp.recorrer())
        }
        return padre
    }
}