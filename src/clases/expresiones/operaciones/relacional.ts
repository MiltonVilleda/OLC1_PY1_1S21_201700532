import { BreadcrumbModule } from "angular-bootstrap-md";
import errores from "src/clases/ast/errores";
import nodo from "src/clases/ast/nodo";
import controlador from "src/clases/controlador";
import { expresion } from "src/clases/interfaces/expresion";
import { tablaSimbolos } from "src/clases/tablaSimbolos/tablaSimbolos";
import { tipo } from "src/clases/tablaSimbolos/tipo";
import operacion, { operador } from "./operacion";

export default class relacional extends operacion implements expresion {

    constructor(e1, operador, e2, linea, columna, expU) {
        super(e1, operador, e2, linea, columna, expU)
    }

    getTipo(controlador: controlador, ts: tablaSimbolos) {
        return tipo.BOOLEANO
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
            case operador.MENORQUE:
                if (typeof valor_e1 === 'number') {
                    if (typeof valor_e2 === 'number') {
                        if (valor_e1 < valor_e2) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (typeof valor_e2 === 'string' && valor_e2.length == 1) {
                        let ascii = valor_e2.charCodeAt(0);
                        if (valor_e1 < ascii) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                    }
                } else if (typeof valor_e1 === 'string' && valor_e1.length == 1) {
                    if (typeof valor_e2 === 'number') {
                        let ascii = valor_e1.charCodeAt(0);
                        if (ascii < valor_e2) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (typeof valor_e2 === 'string' && valor_e2.length == 1) {
                        let ascii_e1 = valor_e1.charCodeAt(0);
                        let ascii_e2 = valor_e2.charCodeAt(0);
                        if (ascii_e1 < ascii_e2) {
                            return true;
                        } else {
                            return false;
                        }
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
            case operador.MENORIGUAL:
                if (typeof valor_e1 === 'number') {
                    if (typeof valor_e2 === 'number') {
                        if (valor_e1 <= valor_e2) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (typeof valor_e2 === 'string' && valor_e2.length == 1) {
                        let ascii = valor_e2.charCodeAt(0);
                        if (valor_e1 <= ascii) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                    }
                } else if (typeof valor_e1 === 'string' && valor_e1.length == 1) {
                    if (typeof valor_e2 === 'number') {
                        let ascii = valor_e1.charCodeAt(0);
                        if (ascii <= valor_e2) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (typeof valor_e2 === 'string' && valor_e2.length == 1) {
                        let ascii_e1 = valor_e1.charCodeAt(0);
                        let ascii_e2 = valor_e2.charCodeAt(0);
                        if (ascii_e1 <= ascii_e2) {
                            return true;
                        } else {
                            return false;
                        }
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
            case operador.MAYORQUE:
                if (typeof valor_e1 === 'number') {
                    if (typeof valor_e2 === 'number') {
                        if (valor_e1 > valor_e2) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (typeof valor_e2 === 'string' && valor_e2.length == 1) {
                        let ascii = valor_e2.charCodeAt(0);
                        if (valor_e1 > ascii) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                    }
                } else if (typeof valor_e1 === 'string' && valor_e1.length == 1) {
                    if (typeof valor_e2 === 'number') {
                        let ascii = valor_e1.charCodeAt(0);
                        if (ascii > valor_e2) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (typeof valor_e2 === 'string' && valor_e2.length == 1) {
                        let ascii_e1 = valor_e1.charCodeAt(0);
                        let ascii_e2 = valor_e2.charCodeAt(0);
                        if (ascii_e1 > ascii_e2) {
                            return true;
                        } else {
                            return false;
                        }
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
            case operador.MAYORIGUAL:
                if (typeof valor_e1 === 'number') {
                    if (typeof valor_e2 === 'number') {
                        if (valor_e1 >= valor_e2) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (typeof valor_e2 === 'string' && valor_e2.length == 1) {
                        let ascii = valor_e2.charCodeAt(0);
                        if (valor_e1 >= ascii) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                    }
                } else if (typeof valor_e1 === 'string' && valor_e1.length == 1) {
                    if (typeof valor_e2 === 'number') {
                        let ascii = valor_e1.charCodeAt(0);
                        if (ascii >= valor_e2) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (typeof valor_e2 === 'string' && valor_e2.length == 1) {
                        let ascii_e1 = valor_e1.charCodeAt(0);
                        let ascii_e2 = valor_e2.charCodeAt(0);
                        if (ascii_e1 >= ascii_e2) {
                            return true;
                        } else {
                            return false;
                        }
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
            case operador.IGUALIGUAL:
                if (typeof valor_e1 === 'number') {
                    if (typeof valor_e2 === 'number') {
                        if (valor_e1 == valor_e2) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (typeof valor_e2 === 'string' && valor_e2.length == 1) {
                        let ascii = valor_e2.charCodeAt(0);
                        if (valor_e1 == ascii) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else if (typeof valor_e1 === 'string') {
                    if (valor_e1.length == 1) {
                        if (typeof valor_e2 === 'number') {
                            let ascii = valor_e1.charCodeAt(0);
                            if (ascii == valor_e2) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (typeof valor_e2 === 'string' && valor_e2.length == 1) {
                            let ascii_e1 = valor_e1.charCodeAt(0);
                            let ascii_e2 = valor_e2.charCodeAt(0);
                            if (ascii_e1 == ascii_e2) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                        }
                    } else {
                        if (typeof valor_e2 === 'string') {
                            if (valor_e1 == valor_e2) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                        }
                    }
                } else {
                    let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                }
                break;
            case operador.DIFERENTE:
                if (typeof valor_e1 === 'number') {
                    if (typeof valor_e2 === 'number') {
                        if (valor_e1 != valor_e2) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (typeof valor_e2 === 'string' && valor_e2.length == 1) {
                        let ascii = valor_e2.charCodeAt(0);
                        if (valor_e1 != ascii) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else if (typeof valor_e1 === 'string') {
                    if (valor_e1.length == 1) {
                        if (typeof valor_e2 === 'number') {
                            let ascii = valor_e1.charCodeAt(0);
                            if (ascii != valor_e2) {
                                return true;
                            } else {
                                return false;
                            }
                        } else if (typeof valor_e2 === 'string' && valor_e2.length == 1) {
                            let ascii_e1 = valor_e1.charCodeAt(0);
                            let ascii_e2 = valor_e2.charCodeAt(0);
                            if (ascii_e1 != ascii_e2) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                        }
                    } else {
                        if (typeof valor_e2 === 'string') {
                            if (valor_e1 != valor_e2) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
                        }
                    }
                } else {
                    let error = new errores('Semantico', `La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.appEnd(`Error semantico en la linea ${this.linea} en la columna ${this.columna}: La operacion ${valor_e1} ${this.soperador} ${valor_e2} no es posible`);
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