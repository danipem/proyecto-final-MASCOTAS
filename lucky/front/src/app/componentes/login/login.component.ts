import { Component, OnInit } from '@angular/core';
import { UsuarioEnt } from "../../entidades/usuarioEnt";
import { HttpService } from '../../servicios/http.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioEnt;

  constructor(private clientHttp: HttpService) {
    this.usuario = new UsuarioEnt();
    this.usuario.email = "";
    this.usuario.password = "";
  }

  clickIniciarSesion() {
    console.log('Click OK')
    this.clientHttp.iniciarUsuarioBD(this.usuario);
    console.log("el usuario seleccionado es " + this.usuario.nombre)

  }
  
  ngOnInit() {
  }

  clickCrearUsuario():void{
    console.log(('Ese clickeo bueno'));
    
  }

}
