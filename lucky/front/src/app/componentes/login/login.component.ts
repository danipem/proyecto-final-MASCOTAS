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

  constructor(private clientHttp: HttpService, private router: Router) {
    this.usuario = new UsuarioEnt();
    this.usuario.email = "";
    this.usuario.password = "";
  }

  clickIniciarSesion() {
    this.clientHttp.iniciarUsuarioBD(this.usuario);
    this.router.navigate(['/home']);

  }

  ngOnInit() {
  }


}
