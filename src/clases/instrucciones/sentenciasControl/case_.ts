import { expresion } from "src/clases/interfaces/expresion";
import { instruccion } from "src/clases/interfaces/instruccion";

export default class case_ {
    public exp: expresion
    public lista_instrucciones: Array<instruccion>
    constructor (exp, lista_instrucciones){
        this.exp = exp
        this.lista_instrucciones = lista_instrucciones
    }
}