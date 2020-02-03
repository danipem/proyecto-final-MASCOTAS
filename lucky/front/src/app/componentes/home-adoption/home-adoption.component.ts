import { Component, OnInit } from '@angular/core';
import {UsuarioEnt} from "../../entidades/usuarioEnt";
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-home-adoption',
  templateUrl: './home-adoption.component.html',
  styleUrls: ['./home-adoption.component.sass']
})
export class HomeAdoptionComponent implements OnInit {

  nombreUsuario: String;
  objUsuario: UsuarioEnt;

  constructor(private httpClient : HttpService) { }

  ngOnInit() {
    
    this.objUsuario = this.httpClient.obtenerUsuario();
    console.log(this.objUsuario);
    this.nombreUsuario = this.objUsuario.nombre.charAt(0).toUpperCase()+ this.objUsuario.nombre.slice(1);
  }

}
