//import * as sintactico from '../analizadores/gramatica';
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
            let retorno = { "Errores:" : controlador_.errores, "Consola:" : controlador_.consola }
            return retorno;
        }catch(error){
            console.log("Error al analizar")
            console.log(error)
            return error
        }
    }
}