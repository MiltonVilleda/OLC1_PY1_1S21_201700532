import nodo from "src/clases/ast/nodo";
import controlador from "src/clases/controlador";
import { instruccion } from "src/clases/interfaces/instruccion";
import { tablaSimbolos } from "src/clases/tablaSimbolos/tablaSimbolos";

class continue_ implements instruccion{
    constructor(){ }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        return this
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }

}

export default continue_