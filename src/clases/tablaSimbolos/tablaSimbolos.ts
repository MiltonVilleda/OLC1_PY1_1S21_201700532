import simbolos from "./simbolos";

export class tablaSimbolos {
    public nombre: string
    public ant: tablaSimbolos;
    public siguientes: Array<tablaSimbolos>
    public tabla: Map<string, simbolos>;

    //constructor(nombre,ant: tablaSimbolos) {
    constructor(ant: tablaSimbolos) {
        this.nombre = ""
        this.ant = ant;
        this.siguientes = new Array<tablaSimbolos>()
        this.tabla = new Map<string, simbolos>();
        if (ant != null){
            ant.siguientes.push(this)
        }
    }

    agregar(id: string, simbolo: simbolos){
        this.tabla.set(id.toLowerCase(), simbolo);
    }

    existe(id: string): boolean{
        let ts: tablaSimbolos = this;
        while (ts != null){
            let existe = ts.tabla.get(id.toLocaleLowerCase());
            if (existe != null){
                return true;
            }
            ts = ts.ant;
        }
        return false;
    }

    existeAtual(id: string): boolean{
        let ts: tablaSimbolos = this;
        let existe = ts.tabla.get(id.toLocaleLowerCase());
        if (existe != null){
            return true;
        }
        return false;
    }

    getSimbolo(id: string){
        let ts: tablaSimbolos = this;
        while (ts != null){
            let existe = ts.tabla.get(id.toLowerCase());
            if (existe != null){
                return existe;
            }
            ts = ts.ant;
        }
        return null;
    }
}