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
    
    this.infUsu.insertarUsuariosBD(this.usuarioNuevo);
    /*Esto nos permite crear un nuevo Usuario vacio, no hace falta la clonacion del usuario */
    this.usuarioNuevo = new UsuarioEnt();

  }

  alPerderFocoEmail() {
     let exite = this.infUsu.existeEmail(this.usuarioNuevo.email);
     
     if(exite === true){
      alert("No existe")
    }else{
      alert("existe");
    }
  }

  ngOnInit() {
  }
 
}
