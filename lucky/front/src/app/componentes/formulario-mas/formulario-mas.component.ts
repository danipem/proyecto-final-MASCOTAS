import { Component, OnInit } from '@angular/core';
import { UsuarioEnt } from 'src/app/entidades/usuarioEnt';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-formulario-mas',
  templateUrl: './formulario-mas.component.html',
  styleUrls: ['./formulario-mas.component.sass']
})
export class FormularioMasComponent implements OnInit {

  usuarioRegistrado: UsuarioEnt
  primero : Boolean;
  segundo : Boolean;


  constructor(private httpService: HttpService) {
    this.primero = false;
    this.segundo = true;
   }

  ngOnInit() {

    this.usuarioRegistrado = this.httpService.obtenerUsuario();

  }

}
