import errores from "./ast/errores";
import { instruccion } from "./interfaces/instruccion";

export default class controlador {
    public errores: Array<errores>;
    public consola: string;
    constructor() {
        this.errores = new Array<errores>();
        this.consola = "";
    }

    public appEnd(consola: string){
        this.consola += consola + "\n";
    }
}