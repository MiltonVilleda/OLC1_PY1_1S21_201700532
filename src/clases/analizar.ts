//import * as sintactico from '../analizadores/gramatica';
import * as interprete from '../analizadores/interprete';

export class analizador{
    public ejecutar (input): any{
        console.log("Analiza la entrada");
        try{
            //let salida = sintactico.parse(input);
            let salida = interprete.parse(input);
            return salida
        }catch(error){
            console.log("Error al analizar")
            console.log(error)
            return error
        }
    }
}