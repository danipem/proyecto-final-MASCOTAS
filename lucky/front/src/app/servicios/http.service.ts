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
  private animal: Animal;
  private animales: Animal[];

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

  modificarUsuario(usuario: UsuarioEnt){

    let id = usuario._id;

    let modificado = this.clientHttp.put<Mensaje>("http://127.0.0.1:4000/api/lucky/modificar/"+id,usuario);

    modificado.subscribe(datos => {
      if(datos.valido === true){
        this.guardarUsuario(datos.usuario);
      }else{
        alert(datos.mensaje);
      }
    })
  }

  obtenerTodosAnimales(){

    let todosAnimales = this.clientHttp.get<Mensaje>("http://127.0.0.1:4000/api/lucky/animales");

    todosAnimales.subscribe(datos => {

      if(datos.valido === true){
        this.guardarAnimales(datos.animales);
      }else{
        alert(datos.mensaje);
      }

    });

  }

   async obtenerAnimal(idAnimal: String){
     //console.log(idAnimal);
     
    let id= await this.clientHttp.get<Mensaje>("http://127.0.0.1:4000/api/lucky/perfil-animal/"+idAnimal)
    
    await id.subscribe(datos=>{
      if(datos.valido === true){
        //this.guardarAnimal(datos.animal);
        sessionStorage.setItem("animal", JSON.stringify(datos.animal))
      }else{
        alert(datos.mensaje)
      }
        
    });
  }

  async obtenerTipoAnimal(especie : String){

    let tipos = await  this.clientHttp.get<Mensaje>("http://127.0.0.1:4000/api/lucky/tiposAnimales/"+especie);
    tipos.subscribe(datos =>{
      if(datos.valido === true){
        
        this.guardarAnimales(datos.animales)
      
      }else{
        alert(datos.mensaje);
      }
    })
  }


    obtenerFiltrosAnimal(filtros){
    let id= this.clientHttp.post<Mensaje>("http://127.0.0.1:4000/api/lucky/filtros/",filtros)
    id.subscribe(datos=>{
      alert(datos.valido);
      if(datos.valido === true){
        this.guardarAnimales(datos.animales);
      }else{
        alert(datos.mensaje)
      }
        
    });
  }
  
  guardarAnimal(animal: Animal){
    this.animal = animal;
    sessionStorage.setItem("animal", JSON.stringify(this.animal))
  }

  consigoAnimal(){
    //if(typeof this.animal === "undefined" || this.animal === null){
      this.animal = JSON.parse(sessionStorage.getItem("animal"))
    //}
    return this.animal;
  }

  guardarUsuario(usuario){
    this.usuario = usuario;
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
  }

  obtenerUsuario(){
    if (typeof this.usuario === "undefined"  || this.usuario == null) {
      this.usuario = JSON.parse(sessionStorage.getItem("usuario"));
    }
    console.log("Hola" + JSON.stringify(this.usuario));
    return this.usuario;
  }
  
  guardarAnimales(animal : Animal[]){

    this.animales = animal;
    sessionStorage.setItem("animales", JSON.stringify(this.animales))
  }

  consigoAnimales(){
    if(typeof this.animales === "undefined" || this.animales === null){
      this.animales = JSON.parse(sessionStorage.getItem("animales"))
    }
    return this.animales;
  }
  
 }

