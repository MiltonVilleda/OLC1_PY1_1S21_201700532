export default class errores {
    public tipo: string;
    public descripcion: string;
    public linea: number;
    public columna: number;

    constructor(tipo, descripcion, linea, columna){
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }
}