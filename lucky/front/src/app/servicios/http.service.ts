import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import {UsuarioEnt} from "../entidades/usuarioEnt"
import { Mensaje } from '../entidades/mensaje';
import { Animal } from '../entidades/animal';
@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private listaUsuarios: UsuarioEnt[];
  private usuario: UsuarioEnt;
  private animal: Animal

  //private nombreUsuario: Usuario[];

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
  }

  obtenerUsuario(){
    console.log("Hola" + this.usuario.nombre)
    return this.usuario;
  }
  
  guardarAnimal(animal: Animal){
    this.animal = animal;
  }

  consigoAnimal(){
    return this.animal;
  }
  obtenerAnimal(idAnimal: String){
    let id=this.clientHttp.get<Mensaje>("http://127.0.0.1:4000/api/lucky/perfil-animal/"+idAnimal)
    id.subscribe(datos=>{
        console.log(datos.animal);
        this.guardarAnimal(datos.animal);
    });
  }
 }

