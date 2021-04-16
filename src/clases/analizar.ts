//import * as sintactico from '../analizadores/gramatica';
import { ControlContainer } from '@angular/forms';
import * as interprete from '../analizadores/interprete';
import controlador from './controlador';
import { tablaSimbolos } from './tablaSimbolos/tablaSimbolos';

export class analizador{
    public ejecutar (input): any{
        console.log("Analiza la entrada");
        try{
            //let salida = sintactico.parse(input);
            let ast = interprete.parse(input);
            let controlador_ = new controlador();
            let ts_global = new tablaSimbolos(null);
            ast.ejecutar(controlador_,ts_global);
            let retorno = { "errores" : controlador_.errores, "consola" : controlador_.consola, "ts" : ts_global }
            return retorno;
        }catch(error){
            console.log("Error al analizar");
            console.log(error);
            return error
        }
    }
}