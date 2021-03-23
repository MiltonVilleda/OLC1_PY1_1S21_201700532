export default class evaluar {
    public resultado: any;

    constructor(resultado: any) {
        this.resultado = resultado;
    }

    get_Resultado(): number {
        return this.resultado;
    }
}