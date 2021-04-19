import { execSync } from "node:child_process";
import { report } from "node:process";
import controlador from "../controlador";
import declaracion from "../instrucciones/declaracion";
import exec from "../instrucciones/exec";
import funcion from "../instrucciones/funcion";
import { instruccion } from "../interfaces/instruccion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import nodo from "./nodo";

export default class ast implements instruccion {
    public lista_instrucciones: Array<instruccion>;

    constructor(lista_instrucciones) {
        this.lista_instrucciones = lista_instrucciones;
    }
    ejecutar(controlador: controlador, ts: tablaSimbolos) {
        let ejecutar: boolean = false
        for (let instruccion of this.lista_instrucciones) {
            if (instruccion instanceof funcion) {
                let funcion = instruccion as funcion
                funcion.agregarSimboloFuncion(controlador, ts)
            }
        }
        for (let instruccion of this.lista_instrucciones) {
            if (instruccion instanceof exec && ejecutar == false){
                instruccion.ejecutar(controlador,ts)
                ejecutar = true
            } else if (ejecutar){
                // TODO reporter error
                return
            }
            if (instruccion instanceof declaracion) {
                instruccion.ejecutar(controlador, ts)
            }
        }
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }
}