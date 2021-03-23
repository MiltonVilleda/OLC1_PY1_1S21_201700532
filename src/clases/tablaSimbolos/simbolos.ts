import tipo from "./tipo";

export default class simbolos {
    public simbolo: number;
    //Variables
    public tipo: tipo;
    public identificador: string;
    public valor: any;
    //Funciones|Metodos
    public lista_param: Array<simbolos>;
    public metodo: boolean;

    constructor(simbolo: number, tipo: tipo, identificador: string, valor: any, lista_param?, metodo?) {
        // TODO: asignacion
    }
}