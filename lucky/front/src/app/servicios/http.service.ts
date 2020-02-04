import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import {UsuarioEnt} from "../entidades/usuarioEnt"
import { Mensaje } from '../entidades/mensaje';
@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private listaUsuarios: UsuarioEnt[];
  private usuario: UsuarioEnt;
  
  constructor(private clientHttp: HttpClient) {
    //this.nombreUsuario = [];
    this.listaUsuarios = [];
    //this.cargaLocalStrg();

    if(this.listaUsuarios == null || typeof this.listaUsuarios === "undefined"){
      this.listaUsuarios =[];
    }
  }

  insertarUsuariosBD(usuario: UsuarioEnt){

    let registro = this.clientHttp.post<Mensaje>("http://127.0.0.1:4000/api/lucky/registro", usuario);
    registro.subscribe(datos =>{
      if(datos.valido){
        alert(datos.mensaje);
      }else{
        alert(datos.mensaje);
      }

    })


  }

  existeEmail(usuario : UsuarioEnt, funCallbk: any){
    
    let comprobacion = this.clientHttp.post<Mensaje>(`http://127.0.0.1:4000/api/lucky/compraremail73hg4h4`,usuario);
    comprobacion.subscribe(datosMsj =>{
        funCallbk(datosMsj.valido ) ;        
    });

}

  iniciarUsuarioBD(usuario: UsuarioEnt){
    
    let login = this.clientHttp.post<Mensaje>("http://127.0.0.1:4000/api/lucky/login", usuario);
    let datos;
    login.subscribe(datosMsj =>{
        if(datosMsj.mensaje === "error" && datosMsj.valido=== false){
          alert("Error")
        }else if(datosMsj.mensaje === "incorrecto" && datosMsj.valido === false){
          alert("Usuario Incorrecto");
        }else{
          
          this.guardarUsuario(datosMsj.usuario);
          //this.guardarLocalStrg();
        }
        

    });

  }
/*
  guardarLocalStrg(){

    let usuarioLocalStorage= JSON.stringify(this.obtenerUsuario());

    window.localStorage.setItem("usuario", usuarioLocalStorage);

  }

  cargaLocalStrg(){
    let obtenDatosLStr = window.localStorage.getItem("usuarioRegistrado");
    console.log("HEY" +JSON.stringify(obtenDatosLStr));
    return this.usuario = JSON.parse(obtenDatosLStr);
  }

  listLocalStrg(){

    return this.listaUsuarios;

  }*/

  guardarUsuario(usuario){
    this.usuario = usuario;
    sessionStorage.setItem("usuario", JSON.stringify(this.usuario));
  }

  obtenerUsuario(){

    if(typeof this.usuario === "undefined" || this.usuario === null){
      this.usuario = JSON.parse(sessionStorage.getItem("usuario"));
    }
    console.log("Hola" + this.usuario.nombre)
    return this.usuario;
  }
}
