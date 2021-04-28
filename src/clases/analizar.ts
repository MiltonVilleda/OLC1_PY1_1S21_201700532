//import * as sintactico from '../analizadores/gramatica';
import { ControlContainer } from '@angular/forms';
import * as interprete from '../analizadores/interprete';
import nodo from './ast/nodo';
import controlador from './controlador';
import { simbolo } from './interfaces/simbolo';
import { tablaSimbolos } from './tablaSimbolos/tablaSimbolos';

export class analizador {
    public ejecutar(input): any {
        console.log("Analiza la entrada");
        try {
            //let salida = sintactico.parse(input);
            let ast = interprete.parse(input);
            let controlador_ = new controlador();
            let ts_global = new tablaSimbolos(null);
            ast.ejecutar(controlador_, ts_global);
            let tabla_array = this.getSimbolos(ts_global)
            let retorno = { "errores": controlador_.errores, "consola": controlador_.consola, "ts": tabla_array }
            return retorno;
        } catch (error) {
            console.log("Error al analizar");
            console.log(error);
            return error
        }
    }
    getSimbolos(ts) {
        let x = Array.from(ts.tabla.keys())
        let tabla_array: Array<simbolo> = new Array<simbolo>()
        let simbol
        let tipo
        let identificador
        let valor
        let linea
        let columna
        for (let clave of x) {
            simbol = ""
            tipo = ""
            identificador = ""
            valor = ""
            linea = 0
            columna = 0
            switch (ts.getSimbolo(clave).simbolo) {
                case 1:
                    simbol = "Variable"
                    break;
                case 2:
                    simbol = "Funcion"
                    break;
                case 3:
                    simbol = "Metodo"
                    break;
                case 4:
                    simbol = "Vector"
                    break;
                case 5:
                    simbol = "Lista"
                    break;
                case 6:
                    simbol = "Parametro"
                    break;
                default:
                    break;
            }
            tipo = ts.getSimbolo(clave).tipo.stype
            identificador = ts.getSimbolo(clave).identificador
            valor = ts.getSimbolo(clave).valor
            linea = ts.getSimbolo(clave).linea
            columna = ts.getSimbolo(clave).columna
            tabla_array.push(new simbolo(simbol,tipo,identificador,valor,linea,columna))
        }
        return tabla_array
    }
    recorrer(input):any{
        try {
            let ast = interprete.parse(input);
            let nodo_ast = ast.recorrer()
            return nodo_ast
        } catch (err) {
            console.log(err);
        }
    }
}