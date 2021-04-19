import { ThrowStmt } from "@angular/compiler";
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
    public linea: number;
    public columna: number

    constructor(simbolo: number, tipo: tipo, identificador: string, valor: any, linea: number, columna: number,lista_param?, metodo?) {
        this.simbolo = simbolo;
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor;
        this.lista_param = lista_param;
        this.metodo = metodo;
        this.linea = linea;
        this.columna = columna;
    }

    setValor(valor): void{
        this.valor = valor;
    }
}