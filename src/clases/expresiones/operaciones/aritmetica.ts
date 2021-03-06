import { ReturnStatement } from "@angular/compiler/src/output/output_ast";
import { BrowserStack } from "protractor/built/driverProviders";
import errores from "src/clases/ast/errores";
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

        if (typeof valor === 'number') {
            return tipo.DOUBLE;
        } else if (typeof valor === 'string' && valor.length == 1) {
            return tipo.CARACTER;
        } else if (typeof valor === 'string') {
            return tipo.CADENA;
        } else if (typeof valor === 'boolean') {
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
                            return valor_e1 + ascii;
                        } else {
                            return valor_e1 + valor_e2;
                        }
                    }
                } else if (typeof valor_e1 === 'boolean') {
                    if (typeof valor_e2 === 'number') {
                        let num = 1;
                        if (valor_e1 == false) {
                            num = 0;
                        }
                        return num + valor_e2;
                    } else if (typeof valor_e2 === 'string') {
                        if (valor_e2.length == 1) {
                            let error = new errores('Semantico', `La operacion ${valor_e1} ${this.operador} ${valor_e2} no es posible`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                        } else {
                            return valor_e1 + valor_e2;
                        }
                    } else {
                        let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                    }
                } else if (typeof valor_e1 === 'string') {
                    if (valor_e1.length == 1) {
                        if (typeof valor_e2 === 'number') {
                            let ascii = valor_e1.charCodeAt(0);
                            return ascii + valor_e2;
                        } else if (typeof valor_e2 === 'string') {
                            return valor_e1 + valor_e2;
                        } else if (typeof valor_e2 === 'boolean') {
                            let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                        }
                    } else {
                        if (typeof valor_e2 === 'number') {
                            return valor_e1 + valor_e2;
                        } else if (typeof valor_e2 === 'string') {
                            return valor_e1 + valor_e2;
                        } else if (typeof valor_e2 === 'boolean') {
                            return valor_e1 + valor_e2;
                        }
                    }
                }
                break;
            case operador.RESTA:
                if (typeof valor_e1 === 'number') {
                    if (typeof valor_e2 === 'number') {
                        return valor_e1 - valor_e2;
                    } else if (typeof valor_e2 === 'boolean') {
                        let num = 1;
                        if (valor_e2 == false) {
                            num = 0;
                        }
                        return valor_e1 - num;
                    } else if (typeof valor_e2 === 'string' && valor_e2.length == 1) {
                        let ascii = valor_e2.charCodeAt(0);
                        return valor_e1 - ascii;
                    } else {
                        let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                    }
                } else if (typeof valor_e1 === 'boolean') {
                    if (typeof valor_e2 === 'number') {
                        let num = 1;
                        if (valor_e1 == false) {
                            num = 0;
                        }
                        return num - valor_e2;
                    } else {
                        let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                    }
                } else if (typeof valor_e1 === 'string' && valor_e1.length == 1) {
                    if (typeof valor_e2 === 'number') {
                        let ascii = valor_e1.charCodeAt(0);
                        return ascii - valor_e2;
                    } else {
                        let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                    }
                } else {
                    let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                }
                break;
            case operador.MULTIPLICACION:
                if (typeof valor_e1 === 'number') {
                    if (typeof valor_e2 === 'number') {
                        return valor_e1 * valor_e2;
                    } else if (typeof valor_e2 === 'string' && valor_e2.length == 1) {
                        let ascii = valor_e2.charCodeAt(0);
                        return valor_e1 * ascii;
                    } else {
                        let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                    }
                } else if (typeof valor_e1 === 'string' && valor_e1.length == 1) {
                    if (typeof valor_e2 === 'number') {
                        let ascii = valor_e1.charCodeAt(0);
                        return ascii * valor_e2;
                    } else {
                        let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                    }
                } else {
                    let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                }
                break;
            case operador.DIVISION:
                if (typeof valor_e1 === 'number') {
                    if (typeof valor_e2 === 'number') {
                        return valor_e1 / valor_e2;
                    } else if (typeof valor_e2 === 'string' && valor_e2.length == 1) {
                        let ascii = valor_e2.charCodeAt(0);
                        return valor_e1 / ascii;
                    } else {
                        let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                    }
                } else if (typeof valor_e1 === 'string' && valor_e1.length == 1) {
                    if (typeof valor_e2 === 'number') {
                        let ascii = valor_e1.charCodeAt(0);
                        return ascii / valor_e2;
                    } else {
                        let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                    }
                } else {
                    let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                }
                break;
            case operador.POTENCIA:
                if (typeof valor_e1 === 'number') {
                    if (typeof valor_e2 === 'number') {
                        let num = Math.pow(valor_e1, valor_e2)
                        return num
                    } else {
                        let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                    }
                } else {
                    let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                }
                break;
            case operador.MODULO:
                if (typeof valor_e1 === 'number') {
                    if (typeof valor_e2 === 'number') {
                        return valor_e1 % valor_e2;
                    } else {
                        let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                    }
                } else {
                    let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                }
                break;
            case operador.UNARIO:
                if (typeof valor_e1 === 'number') {
                    return -valor_e1;
                } else {
                    let error = new errores('Semantico', `La operacion ${this.soperador} ${valor_e1} no es posible`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${this.soperador} ${valor_e1} no es posible`);
                }
                break;
            default:
                let error = new errores('Semantico', `Error inesperado en la operacion`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: Error inesperado en la operacion`);
                break;
        }
    }
    recorrer(): nodo {
        let padre = new nodo("exp", "")
        if (this.expU) {
            padre.addHijo(new nodo(this.soperador, ""))
            padre.addHijo(this.e1.recorrer())
        } else {
            padre.addHijo(this.e1.recorrer())
            padre.addHijo(new nodo(this.soperador, ""))
            padre.addHijo(this.e2.recorrer())
        }
        return padre
    }

}