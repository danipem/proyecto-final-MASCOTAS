import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import {UsuarioEnt} from "../entidades/usuarioEnt"
import { Mensaje } from '../entidades/mensaje';
@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private listaUsuarios: UsuarioEnt[];

  //private nombreUsuario: Usuario[];

  constructor(private clientHttp: HttpClient) {
    //this.nombreUsuario = [];
    this.listaUsuarios = [];
    this.cargaLocalStrg();

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
          //TODO: MEJORAR LA RUTA
          window.location.href= "http://localhost:4200/home";
          datos = JSON.stringify(datosMsj.usuario);
          this.listaUsuarios.push(datos);
          //this.guardarLocalStrg();
        }

    });

  }
/*
  //Pasamos el objeto usuario con los datos que cogemos del formulario.
  //si el usuario es insertado correctamente en el array retornamos true para mostrar
  //un mensaje de usuario insertado correctamente
  insertar(usuario: Usuario ){

    let existeEmail = false;

    for( let usu of this.listaUsuarios){

      if(usu.email === usuario.email){
        existeEmail = true;
        break;
      }
    }

    if(existeEmail){
      //alert(`El email ${usuario.email} ya existe en la base de datos.`);
      return false;
    }else{
      this.addToArray(usuario);
      return true;
    }

  }

  //Vamos a guardar el objeto en la local storage del navegador. El navegador solo admite
  //textos numeros y booleans, por eso el array de objeto hay que convertirlo en json y
  // posteriormente en texto.
  guardarLocalStrg(){

    let textoJsonUsuario = JSON.stringify(this.listaUsuarios);

    //Con window.localStorage accedemos a la local storage
    //Con set item guardamos en la cache el listado de objetos en tipo string añadiendole un nombre
    window.localStorage.setItem("listaUsuarios", textoJsonUsuario);

  }

  eliminarDeLaLocalStrg(posicion: number){

    this.listaUsuarios.splice(posicion,1);
    this.guardarLocalStrg()
    return true;

  }

  addToArray(user: Usuario){
    //Ejemplo clonado
    //let clonado = usuario.clonar();
    //this.listaUsuarios.push(clonado);
    this.listaUsuarios.push(user);
    this.guardarLocalStrg();

    find({ciudad: "Madrdrid", especie: "perro", })
  }
*/
  guardarLocalStrg(){

    let usuarioLocalStorage= JSON.stringify(this.listaUsuarios);

    window.localStorage.setItem("usuarioRegistrado", usuarioLocalStorage);

  }

  cargaLocalStrg(){
    let obtenDatosLStr = window.localStorage.getItem("usuarioRegistrado");

     this.listaUsuarios = JSON.parse(obtenDatosLStr);
  }

  listLocalStrg(){

    return this.listaUsuarios;

  }

}
