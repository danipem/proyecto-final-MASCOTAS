import { Component, OnInit } from '@angular/core';
import { UsuarioEnt } from "../../entidades/usuarioEnt";
import { HttpService } from '../../servicios/http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioEnt;
  objetable;

  constructor(private clientHttp: HttpService, private route : Router) {
    this.usuario = new UsuarioEnt();
    this.usuario.email = "";
    this.usuario.password = "";
  }

  clickIniciarSesion() {
    this.objetable = this.clientHttp.iniciarUsuarioBD(this.usuario);
    this.objetable.subscribe(datos => {
      if(datos.valido === true){
        this.usuario = datos.usuario;
        this.clientHttp.guardarUsuario(this.usuario);
        this.route.navigate(["/home"]);
      }
    })
    //this.usuario = this.clientHttp.obtenerUsuario();
  }

  ngOnInit() {
  }


}
