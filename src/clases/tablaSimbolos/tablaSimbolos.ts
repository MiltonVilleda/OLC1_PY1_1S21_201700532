import simbolos from "./simbolos";

export class tablaSimbolos {
    public ant: tablaSimbolos;
    public tabla: Map<string, simbolos>;

    constructor(ant: tablaSimbolos) {
        this.ant = ant;
        this.tabla = new Map<string, simbolos>();
    }
}