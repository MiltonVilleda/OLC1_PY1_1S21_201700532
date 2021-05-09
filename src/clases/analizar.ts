//import * as sintactico from '../analizadores/gramatica';
import interprete from '../analizadores/interprete';
import controlador from './controlador';
import primitivo from './expresiones/primitivo';
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
            ts_global.nombre = "global"
            ast.ejecutar(controlador_, ts_global);
            let arr_nombres: Array<string> = new Array<string>()
            let tabla_array: Array<simbolo> = new Array<simbolo>()
            let arreglo = this.getSimbolos(ts_global, tabla_array, arr_nombres)
            console.log(arr_nombres)
            console.log("Errores")
            console.log(controlador_.errores)
            let retorno = { "errores": controlador_.errores, "consola": controlador_.consola, "ts": arreglo }
            return retorno;
        } catch (error) {
            console.log("Error al analizar");
            console.log(error);
            return error
        }
    }
    getSimbolos(ts: tablaSimbolos, tabla_array, arr_nombres: Array<string>) {
        //console.log("EVALUA LA TABLA: "+ts.nombre)
        if (!arr_nombres.includes(ts.nombre)) {
            //console.log("SE AGREGA")
            arr_nombres.push(ts.nombre)
            let x = Array.from(ts.tabla.keys())
            let simbol
            let tipo
            let identificador
            let valor
            let entorno
            let linea
            let columna
            for (let clave of x) {
                simbol = ""
                tipo = ""
                identificador = ""
                valor = ""
                entorno = ""
                linea = 0
                columna = 0
                //console.log("ENCUENTRA: "+ts.getSimbolo(clave).identificador)
                let tipo_simbol: number = ts.getSimbolo(clave).simbolo
                if (tipo_simbol == 1 || tipo_simbol == 2 || tipo_simbol == 3 || tipo_simbol == 4 || tipo_simbol == 5) {
                    switch (tipo_simbol) {
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
                        default:
                            break;
                    }
                    tipo = ts.getSimbolo(clave).tipo.stype
                    identificador = ts.getSimbolo(clave).identificador
                    valor = ts.getSimbolo(clave).valor
                    if (valor instanceof Array) {
                        let cadena: string = ""
                        for (let val of valor) {
                            let val_ = val as primitivo
                            cadena += val_.primitivo + " "
                        }
                        valor = cadena
                    }
                    entorno = ts.nombre
                    linea = ts.getSimbolo(clave).linea
                    columna = ts.getSimbolo(clave).columna
                    tabla_array.push(new simbolo(simbol, tipo, identificador, valor, entorno, linea, columna))
                }
            }
            for (let tabla of ts.siguientes) {
                this.getSimbolos(tabla, tabla_array, arr_nombres)
            }
        }
        return tabla_array
    }
    recorrer(input): any {
        try {
            let ast = interprete.parse(input);
            let nodo_ast = ast.recorrer()
            return nodo_ast
        } catch (err) {
            console.log(err);
        }
    }
}