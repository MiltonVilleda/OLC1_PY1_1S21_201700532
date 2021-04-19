import { Component } from '@angular/core';
import * as analizador from '../clases/analizar'
import simbolos from 'src/clases/tablaSimbolos/simbolos';
import { simbolo } from 'src/clases/interfaces/simbolo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  contenido: string = "";
  consola: string = "";
  tabla_map: Map<string, simbolos>
  tabla2: Array<simbolo>

  ejecutar(): void {
    this.tabla2 = new Array<simbolo>()
    this.consola = ""
    let ana = new analizador.analizador();

    if (this.contenido != "") {
      let ejecutar = ana.ejecutar(this.contenido);
      this.consola = ejecutar.consola;
      this.tabla2 = ejecutar.ts
      console.log("X"+this.tabla2+"X")
      //console.log(this.tabla2)
      //document.getElementById("").innerHTML = ejecutar.ts;
    }
    /*
    let ts = new tablaSimbolos(null);
    let cont = new controlador();
    if (this.contenido != "") {
      let arreglo: Array<evaluar> = ana.ejecutar(this.contenido);
      for (let num of arreglo) {
        //this.consola += "El valor es: " + String(num.resultado) + "\n"
        //this.consola += "El valor es: " + String(num.resultado.getValor(cont,ts)) + "\n"
        this.consola += "El valor es: " + num.resultado.getValor(cont,ts) + "\n"
        //Evaluar[10+11];
      }
    }
    */
  }
}
