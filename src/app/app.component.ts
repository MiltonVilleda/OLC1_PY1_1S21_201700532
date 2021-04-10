import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import evaluar from '../clases/evaluar';
import * as analizador from '../clases/analizar'
import { tablaSimbolos } from '../clases/tablaSimbolos/tablaSimbolos';
import controlador from '../clases/controlador';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  contenido: string = "";
  consola: string = "";

  ejecutar(): void {

    this.consola = ""
    let ana = new analizador.analizador();

    if (this.contenido != ""){
      let ejecutar = ana.ejecutar(this.contenido);
      this.consola = ejecutar.consola;
      document.getElementById("").innerHTML = ejecutar.ts;
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
