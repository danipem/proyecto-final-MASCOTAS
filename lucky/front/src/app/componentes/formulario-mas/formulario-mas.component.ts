import { Component, OnInit, ɵSWITCH_TEMPLATE_REF_FACTORY__POST_R3__ } from '@angular/core';
import { UsuarioEnt } from 'src/app/entidades/usuarioEnt';
import { HttpService } from 'src/app/servicios/http.service';
import { temporaryDeclaration } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-formulario-mas',
  templateUrl: './formulario-mas.component.html',
  styleUrls: ['./formulario-mas.component.sass']
})
export class FormularioMasComponent implements OnInit {

  usuarioRegistrado: UsuarioEnt
  primero : Boolean;
  segundo : Boolean;
  tercero : Boolean;


  constructor(private httpService: HttpService) {
    this.primero = true;
    this.segundo = false;
    this.tercero = false;
   }

  ngOnInit() {

    this.usuarioRegistrado = this.httpService.obtenerUsuario();

  }
  primeraVista(){
    this.primero = true;
    this.segundo = false;
    this.tercero = false;
  }

  segundaVista(){
    this.primero = false;
    this.segundo = true;
    this.tercero = false;
  }
  terceraVista(){
    this.primero = false;
    this.segundo = false;
    this.tercero = true;
  }
  acepta(){
    const acepta = document.getElementById("formulariomassolicitudaceptada")
    acepta.setAttribute("style", "display: block")
    const azul = document.getElementById("formulariomasacepta")
    azul.setAttribute("style", "background-color: rgb(189, 210, 214)")
  }

}