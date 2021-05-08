export class simbolo {
    simbol: string
    tipo: string
    identificador: string
    valor: any
    entorno: string
    linea: number
    columna: number
    constructor(simbol, tipo, identificador, valor, entorno, linea, columna) {
        this.simbol = simbol
        this.tipo = tipo
        this.identificador = identificador
        this.valor = valor
        this.entorno = entorno
        this.linea = linea
        this.columna = columna
    }
}