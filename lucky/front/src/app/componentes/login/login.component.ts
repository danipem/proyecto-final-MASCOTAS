import { Component, OnInit } from '@angular/core';
import { UsuarioEnt } from 'src/app/entidades/usuarioEnt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioEnt

  constructor() {
    this.usuario.email = "";
    this.usuario.password = "";
  }

  clickIniciarSesion() {
    console.log('Click OK')
    this.usuario
  }
  

  ngOnInit() {
  }

  clickCrearUsuario():void{
    console.log(('Ese clickeo bueno'));
    
  }

}
