import { RecursiveTemplateAstVisitor } from "@angular/compiler";

export enum tipo {
    ENTERO,
    DOUBLE,
    BOOLEANO,
    CARACTER,
    CADENA,
    VOID,
    VECTOR,
    VECTOR_INT,
    VECTOR_DOUBLE,
    VECTOR_BOOLEAN,
    VECTOR_STRING,
    VECTOR_CHAR,
    LISTA_INT,
    LISTA_DOUBLE,
    LISTA_BOOLEAN,
    LISTA_STRING,
    LISTA_CHAR
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
        } else if (stype == 'VECTOR_INT'){
            return tipo.VECTOR_INT
        } else if (stype == 'VECTOR_DOUBLE'){
            return tipo.VECTOR_DOUBLE
        } else if (stype == 'VECTOR_BOOLEAN'){
            return tipo.VECTOR_BOOLEAN
        } else if (stype == 'VECTOR_STRING'){
            return tipo.VECTOR_STRING
        } else if (stype == 'VECTOR_CHAR'){
            return tipo.VECTOR_CHAR
        } else if (stype == 'LISTA_INT'){
            return tipo.LISTA_INT
        } else if (stype == 'LISTA_DOUBLE'){
            return tipo.LISTA_DOUBLE
        } else if (stype == 'LISTA_BOOLEAN'){
            return tipo.LISTA_BOOLEAN
        } else if (stype == 'LISTA_STRING'){
            return tipo.LISTA_STRING
        } else if (stype == 'LISTA_CHAR'){
            return tipo.LISTA_CHAR
        }
    }

    getStringType(): string{
        return this.stype;
    }
}