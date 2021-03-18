import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import evaluar from 'src/clases/evaluar';
import * as analizador from '../clases/analizar'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  contenido: string = "";
  consola: string = "";

  ejecutar(): void{
    this.consola = ""
    let ana = new analizador.analizador();
    if (this.contenido != ""){
      let arreglo: Array<evaluar> = ana.ejecutar(this.contenido);
      for (let num of arreglo){
        this.consola += "El valor es: " + num.get_resultado() + "\n"
      }
    }
  }
}
