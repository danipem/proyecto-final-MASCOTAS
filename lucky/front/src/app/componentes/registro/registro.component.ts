import { Component, OnInit } from '@angular/core';
import { UsuarioEnt } from "../../entidades/usuarioEnt";
import { HttpService } from "../../servicios/http.service";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.sass']
})
export class RegistroComponent /*implements OnInit*/ {
  usuarioNuevo: UsuarioEnt;
  camposInvalid = false;

  
  constructor(private infUsu: HttpService ) {
    this.usuarioNuevo = new UsuarioEnt();
    this.usuarioNuevo.nombre = "";
    this.usuarioNuevo.apellidos = "";
    this.usuarioNuevo.edad;
    this.usuarioNuevo.email = "";
    this.usuarioNuevo.tlf = "";
    this.usuarioNuevo.dni = "";
    this.usuarioNuevo.ciudad = "";
    this.usuarioNuevo.codPostal;
    this.usuarioNuevo.password = "";
    
    
   }

  registroComponentClick(): void{
    console.log('Click OK');
    console.log('Nombre:' + this.usuarioNuevo.nombre);
    console.log('Apellidos:' + this.usuarioNuevo.apellidos);
    console.log('Edad:' + this.usuarioNuevo.edad);
    console.log('Dni:' + this.usuarioNuevo.dni);
    console.log('Email:' + this.usuarioNuevo.email);
    console.log('Ciudad:' + this.usuarioNuevo.ciudad);
    console.log('Codigo POstal:' + this.usuarioNuevo.codPostal);
    console.log('Email:' + this.usuarioNuevo.email);
    console.log('Password: ' + this.usuarioNuevo.password);
    
    this.infUsu.insertarUsuariosBD(this.usuarioNuevo);
    /*Esto nos permite crear un nuevo Usuario vacio, no hace falta la clonacion del usuario */
    this.usuarioNuevo = new UsuarioEnt();

  }

  // ngOnInit() {
  // }

}
