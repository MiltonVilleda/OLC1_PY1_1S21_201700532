import controlador from "../controlador";
import { instruccion } from "../interfaces/instruccion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import nodo from "./nodo";

export default class ast implements instruccion{
    public lista_instrucciones: Array<instruccion>;

    constructor(lista_instrucciones){
        this.lista_instrucciones = lista_instrucciones;
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        for (let instruccion of this.lista_instrucciones){
            instruccion.ejecutar(controlador,ts);
        }
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }
}