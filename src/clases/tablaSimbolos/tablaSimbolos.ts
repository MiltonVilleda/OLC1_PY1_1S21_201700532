import simbolos from "./simbolos";

export class tablaSimbolos {
    public ant: tablaSimbolos;
    public tabla: Map<string, simbolos>;

    constructor(ant: tablaSimbolos) {
        this.ant = ant;
        this.tabla = new Map<string, simbolos>();
    }

    agregar(id: string, simbolo: simbolos){
        this.tabla.set(id.toLowerCase(), simbolo);
    }

    existe(id: string): boolean{
        let ts: tablaSimbolos = this;
        while (ts != null){
            let existe = ts.tabla.get(id);
            if (existe != null){
                return true;
            }
            ts = ts.ant;
        }
        return false;
    }

    existeAtual(id: string): boolean{
        let ts: tablaSimbolos = this;
        let existe = ts.tabla.get(id);
        if (existe != null){
            return true;
        }
        return false;
    }

    getSimbolo(id: string){
        let ts: tablaSimbolos = this;
        while (ts != null){
            let existe = ts.tabla.get(id);
            if (existe != null){
                return existe;
            }
            ts = ts.ant;
        }
        return null;
    }
}