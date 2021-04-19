export class simbolo {
    simbol: string
    tipo: string
    identificador: string
    valor: any
    linea: number
    columna: number
    constructor(simbol,tipo,identificador,valor,linea,columna){
        this.simbol = simbol
        this.tipo = tipo
        this.identificador = identificador
        this.valor = valor
        this.linea = linea
        this.columna = columna
    }
}