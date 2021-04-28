import * as fs from 'fs'
import { Component } from '@angular/core';
import * as analizador from '../clases/analizar'
import simbolos from 'src/clases/tablaSimbolos/simbolos';
import { simbolo } from 'src/clases/interfaces/simbolo';
import errores from 'src/clases/ast/errores';
import { graphviz } from "d3-graphviz";
import { wasmFolder } from "@hpcc-js/wasm";
import nodo from 'src/clases/ast/nodo';
import pestana from 'src/clases/pestana';

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
  errores2: Array<errores>
  contador: number = 0
  vent_focus: string ="pestana1"
  nombre: string = ""
  lista_p = new Array<pestana>()
  file_: File

  ejecutar(): void {
    this.tabla2 = new Array<simbolo>()
    this.errores2 = new Array<errores>()
    let ana = new analizador.analizador();
    this.consola = ""
    if (this.contenido != "") {
      let ejecutar = ana.ejecutar(this.contenido);
      this.consola = ejecutar.consola;
      this.tabla2 = ejecutar.ts
      this.errores2 = ejecutar.errores
    }
    this.recorrer()
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
  recorrer() {
    let ana = new analizador.analizador();
    if (this.contenido != "") {
      let nodo_ast: nodo = ana.recorrer(this.contenido)
      console.log(nodo_ast)
      //console.log("RAIZ: "+nodo_ast.token)
      let grafo = nodo_ast.GraficarSintactico()
      //console.log(grafo)
      //wasmFolder('https://cdn.jsdeliver.net/npm/@hpcc-js/wasm@0.3.13/dist')
      wasmFolder('/assets/@hpcc-js/wasm/dist')
      graphviz('#grafico').renderDot(grafo)
    }
  }
  getText(input: HTMLInputElement){
    var files = input.files
    var x: File = files[0]
    var fr = new FileReader()
    console.log("LEER")
    //console.log(fs.readFileSync(x.name,'utf-8'))
    //console.log(fr.readAsText
    console.log("TEXT")
    console.log(x.name)
    fr.onload = async function (e) {
      console.log(e.target.result)
    }
  }
  openFile(input: HTMLInputElement){
    var files = input.files
    var x: File = files[0]
    //let y = readFile(x.name)
    console.log(x.text)
    var fr = new FileReader()
    console.log("TEXT")
    console.log(x.name)
    fr.onload = function (e) {
      //document.getElementById("xxx").innerText = e.target.result.toString()
      document.getElementById("xxx").innerHTML = e.target.result.toString()
      //document.getElementById("xxx")
      console.log(e.target.result)
    }
    fr.readAsText(x)
  }
  cambioP(nombre){
    for (var i = 0; i < this.lista_p.length; i++){
      if (this.lista_p[i].nombre == nombre){
        this.contenido =  this.lista_p[i].cadena
      }
    }
  }
  getContador(){
    return this.contador++
  }
  set_vent(vent){
    this.vent_focus=vent;
  }
  getVent(){
    return this.vent_focus
  }
  linkedList(pestana,nombre){
    var obj = new pestana(pestana,nombre)
    obj.pestana = pestana
    obj.nombre = nombre
    this.lista_p.push(obj)
  }
  delete_tape(pestana){
    /*for (var i = 0; i < this.lista_p.length; i++){
      if (this.lista_p[i].pestana == pestana){
        delete this.lista_p[i]
      }
    }*/
  }
}
