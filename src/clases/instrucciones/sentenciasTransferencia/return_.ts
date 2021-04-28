import nodo from "src/clases/ast/nodo";
import controlador from "src/clases/controlador";
import { expresion } from "src/clases/interfaces/expresion";
import { instruccion } from "src/clases/interfaces/instruccion";
import { tablaSimbolos } from "src/clases/tablaSimbolos/tablaSimbolos";

class return_ implements instruccion{
    public valor_retorno: expresion
    constructor(valor_retorno){
        this.valor_retorno = valor_retorno
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        if (this.valor_retorno != null){
            return this.valor_retorno.getValor(controlador,ts)
        } else {
            return this
        }
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }
}

export default return_