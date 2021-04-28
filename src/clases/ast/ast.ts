import { execSync } from "node:child_process";
import { CONNREFUSED } from "node:dns";
import { report } from "node:process";
import controlador from "../controlador";
import declaracion from "../instrucciones/declaracion";
import exec from "../instrucciones/exec";
import funcion from "../instrucciones/funcion";
import { instruccion } from "../interfaces/instruccion";
import { tablaSimbolos } from "../tablaSimbolos/tablaSimbolos";
import errores from "./errores";
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
            if (instruccion instanceof exec && ejecutar == false) {
                instruccion.ejecutar(controlador, ts)
                ejecutar = true
            } else if (ejecutar) {
                let error = new errores('Semantico', `Se ha encontrado mas de un metodo exec`, 0, 0);
                controlador.errores.push(error);
                controlador.appEnd(`Error semantico: Se ha encontrado mas de un metodo exec`);
                return
            }
            if (instruccion instanceof declaracion) {
                instruccion.ejecutar(controlador, ts)
            }
        }
    }
    recorrer(): nodo {
        let raiz = new nodo("ENTRADA", "")
        for (let instruccion of this.lista_instrucciones) {
            raiz.addHijo(instruccion.recorrer())
        }
        return raiz
    }
}