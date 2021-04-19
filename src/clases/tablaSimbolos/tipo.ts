export enum tipo {
    ENTERO,
    DOUBLE,
    BOOLEANO,
    CARACTER,
    CADENA,
    VOID
}
export default class Tipo {
    public type: tipo;
    public stype: string;
    constructor(stype: string) {
        this.stype = stype
        this.type = this.getTipo(stype);
    }
    
    getTipo(stype: string): tipo{
        if (stype == 'DOUBLE'){
            return tipo.DOUBLE
        } else if (stype == 'ENTERO'){
            return tipo.ENTERO
        } else if (stype == 'STRING'){
            return tipo.CADENA
        } else if (stype == 'CHAR'){
            return tipo.CARACTER
        } else if (stype == 'BOOLEAN'){
            return tipo.BOOLEANO
        } else if (stype == 'VOID'){
            return tipo.VOID
        }
    }

    getStringType(): string{
        return this.stype;
    }
}