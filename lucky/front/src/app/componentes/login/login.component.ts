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

  constructor(private clientHttp: HttpService, private route : Router) {
    this.usuario = new UsuarioEnt();
    this.usuario.email = "guillermino@gmail.com";
    this.usuario.password = "8910";
  }

  clickIniciarSesion() {
    //console.log('Click OK')
    this.clientHttp.iniciarUsuarioBD(this.usuario);
    this.usuario = this.clientHttp.obtenerUsuario();
    this.route.navigate(["/home"]);

  }

  ngOnInit() {
  }


}
