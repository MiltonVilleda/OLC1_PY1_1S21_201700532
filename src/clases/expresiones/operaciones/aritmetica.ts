import { ReturnStatement } from "@angular/compiler/src/output/output_ast";
import nodo from "../../ast/nodo";
import controlador from "../../controlador";
import { expresion } from "../../interfaces/expresion";
import { tablaSimbolos } from "../../tablaSimbolos/tablaSimbolos";
import { tipo } from "../../tablaSimbolos/tipo";
import operacion, { operador } from "./operacion";

export default class aritmetica extends operacion implements expresion {

    constructor(e1, operador, e2, linea, columna, expU) {
        super(e1, operador, e2, linea, columna, expU)
    }

    getTipo(controlador: controlador, ts: tablaSimbolos) {
        let valor = this.getValor(controlador, ts);

        if(typeof valor === 'number'){   
            return tipo.DOUBLE;
        }else if(typeof valor === 'string'){
            return tipo.CADENA;
        }else if(typeof valor === 'boolean'){
            return tipo.BOOLEANO;
        }
    }
    getValor(controlador: controlador, ts: tablaSimbolos) {
        let valor_e1;
        let valor_e2;
        let valor_U;

        if (this.expU == false) {
            valor_e1 = this.e1.getValor(controlador, ts);
            valor_e2 = this.e2.getValor(controlador, ts);
        } else {
            valor_U = this.e1.getValor(controlador, ts);
        }

        switch (this.operador) {
            case operador.SUMA:
                if (typeof valor_e1 === 'number') {
                    if (typeof valor_e2 === 'number') {
                        return valor_e1 + valor_e2;
                    } else if (typeof valor_e2 === 'boolean') {
                        let num = 1;
                        if (valor_e2 == false) {
                            num = 0;
                        }
                        return valor_e1 + num;
                    } else if (typeof valor_e2 === 'string') {
                        if (valor_e2.length == 1) {
                            let ascii = valor_e2.charCodeAt(0);
                            return valor_e2 + ascii;
                        } else {
                            return valor_e1 + valor_e2;
                        }
                    }
                } else if (typeof valor_e1 === 'boolean'){
                    if (typeof valor_e2 === 'number'){
                        let num = 1;
                        if (valor_e1 == false){
                            num = 0;
                        }
                        return num + valor_e2;
                    } else if (typeof valor_e2 === 'boolean'){
                        // TODO: error semantico
                    } else if (typeof valor_e2 === 'string'){
                        // TODO:
                    }
                }
                break;
            case operador.UNARIO:
                if (typeof valor_e1 === 'number'){
                    return -valor_e1;
                }else{
                    // TODO: error
                }
                break;
            default:
                // TODO: error inesperado
                break;
        }
    }
    recorrer(): nodo {
        throw new Error("Method not implemented.");
    }

}