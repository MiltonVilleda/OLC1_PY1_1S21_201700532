import * as sintactico from '../analizadores/gramatica'
export class analizador{
    public ejecutar (input): any{
        console.log("Analiza la entrada");
        try{
            let salida = sintactico.parse(input);
            return salida
        }catch(error){
            console.log("Error al analizar")
            return "Error al analizar"
        }
    }
}