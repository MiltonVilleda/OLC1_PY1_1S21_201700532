import nodo from "src/clases/ast/nodo";
import controlador from "src/clases/controlador";
import { instruccion } from "src/clases/interfaces/instruccion";
import { tablaSimbolos } from "src/clases/tablaSimbolos/tablaSimbolos";

export default class break_ implements instruccion{
    constructor(){ }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        return this
    }
    recorrer(): nodo {
        let padre = new nodo('break', "")
        return padre
    }

}