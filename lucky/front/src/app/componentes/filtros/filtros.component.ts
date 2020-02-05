import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/servicios/http.service';
import { Animal } from 'src/app/entidades/animal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.sass']
})
export class FiltrosComponent implements OnInit {

  especie : String;
  genero : String;
  width : String;
  ciudad : String;
  tipo : String;
  edad : String;
  filtros: Boolean;
  opciones;

  arrayAnimales: Animal[];

  constructor(private httpService: HttpService, private route: Router) { 
    this.filtros = false;
    this.opciones = new Array();
  }

  ngOnInit() {
    document.getElementById("tipo").setAttribute("style", "display: none");
  }


/*
TODO: Mejorar el codigo, html con event y removeChild. Eliminar filtros
*/
  muestraAlgo(){
    
    const animal = event.currentTarget.dataset.tipo;
    //alert(event.currentTarget.dataset.tipo);
    this.especie = animal.charAt(0).toUpperCase() + animal.slice(1);
    this.filtros = true;
    console.log(this.especie);

    
    this.eliminaHijos();

    switch(animal){
      case "perro":
        this.httpService.obtenerTipoAnimal(this.especie);        
        this.arrayAnimales = this.httpService.consigoAnimales();
        
    
        this.obtenTipos(this.arrayAnimales);

        document.getElementById(animal).setAttribute("src", "../../../assets/iconos/perrop_2.png");
        document.getElementById("gato").setAttribute("src", "../../../assets/iconos/cat.png");
        document.getElementById("mamifero").setAttribute("src", "../../../assets/iconos/035CoatiCopy.png");
        document.getElementById("ave").setAttribute("src", "../../../assets/iconos/ave.png");
        this.escribeTitulo(animal);
        break;
      case "gato":
        
        this.httpService.obtenerTipoAnimal(this.especie);        
        this.arrayAnimales = this.httpService.consigoAnimales();
        
        
        this.obtenTipos(this.arrayAnimales);
        

        document.getElementById("perro").setAttribute("src", "../../../assets/iconos/perrop.png");
        document.getElementById("mamifero").setAttribute("src", "../../../assets/iconos/035CoatiCopy.png");
        document.getElementById("ave").setAttribute("src", "../../../assets/iconos/ave.png");
        document.getElementById(animal).setAttribute("src", "../../../assets/iconos/cat_2.png");
        this.escribeTitulo(animal);
        break;
      case "conejo":
        this.escribeTitulo(animal);
        break;
      case "cobaya":
        this.escribeTitulo(animal);
        break;
      case "mamifero":
        document.getElementById("perro").setAttribute("src", "../../../assets/iconos/perrop.png");
        document.getElementById("gato").setAttribute("src", "../../../assets/iconos/cat.png");
        document.getElementById(animal).setAttribute("src", "../../../assets/iconos/035CoatiCopy_2.png");
        document.getElementById("ave").setAttribute("src", "../../../assets/iconos/ave.png");
        this.escribeTitulo(animal);
        break;
      case "huron":
        this.escribeTitulo(animal);
        break;
      case "pez":
        this.escribeTitulo(animal);
        break;
      case "reptil":
        this.escribeTitulo(animal);
        break;
      case "anfibio":
        this.escribeTitulo(animal);
        break;
      case "aracnido":
        this.escribeTitulo(animal);
        break;
      case "ave":
        
        this.httpService.obtenerTipoAnimal(this.especie);        
        this.arrayAnimales = this.httpService.consigoAnimales();
        
    
        this.obtenTipos(this.arrayAnimales);
       

        document.getElementById("perro").setAttribute("src", "../../../assets/iconos/perrop.png");
        document.getElementById("gato").setAttribute("src", "../../../assets/iconos/cat.png");
        document.getElementById("mamifero").setAttribute("src", "../../../assets/iconos/035CoatiCopy.png");
        document.getElementById(animal).setAttribute("src", "../../../assets/iconos/aveRoja.png");
        this.escribeTitulo(animal);

        break;
    }

    
  }

  eliminaHijos(){
    
    var tipo = document.getElementById("tipos");

    var algo = document.getElementsByName("animal");

    if(algo.length == 0){

    }else{
    console.log(algo.length);

    for(let i = 0; i< algo.length; i++){
      tipo.removeChild(algo[i]);
      this.opciones = new Array();
      }
    }
  }

  obtenTipos(arrayAnimales){
    for(let i= 0; i < arrayAnimales.length; i++){
      if(this.opciones.includes(arrayAnimales[i].datos.tipo)){
        console.log("Existe");
      }else{
        this.opciones.push(arrayAnimales[i].datos.tipo);
        this.addToSelect(arrayAnimales[i].datos.tipo);
      }
    }
  }

  /*
  */
  addToSelect(especie : String){

    document.getElementById("tipos").appendChild(this.generateComponent(especie));

  }

  generateComponent(texto){
    var option = document.createElement("option")
    option.id = texto;
    option.setAttribute("name", "animal")
    option.setAttribute("value", texto);
    option.innerHTML = texto;
    return option;
  }

  
  seleccionaGenero(){
    
    const tipo = event.currentTarget.dataset.genero;
    
    if(tipo === "macho"){
      document.getElementById("macho").setAttribute("src", "../../../assets/iconos/male_2.png");
      document.getElementById("hembra").setAttribute("src", "../../../assets/iconos/female.png");

    }else{
      document.getElementById("hembra").setAttribute("src", "../../../assets/iconos/female_2.png");
      document.getElementById("macho").setAttribute("src", "../../../assets/iconos/male.png");

    }
    this.filtros = true;
    this.genero = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    console.log(this.genero);
  }


  seleccionaMedida(){
    const tipo = event.currentTarget.dataset.width;

    if(tipo === "small"){
      document.getElementById("small").setAttribute("src","../../../assets/iconos/groupCopy_2.png")
      document.getElementById("mediano").setAttribute("src","../../../assets/iconos/group_6@2x.png")
      document.getElementById("grande").setAttribute("src","../../../assets/iconos/group_6@3x.png")
      
    }else if (tipo === "mediana"){
      document.getElementById("small").setAttribute("src", "../../../assets/iconos/group_6.png");
      document.getElementById("mediano").setAttribute("src", "../../../assets/iconos/groupCopy_2.png");
      document.getElementById("grande").setAttribute("src","../../../assets/iconos/group_6@3x.png");

    }else{

      document.getElementById("small").setAttribute("src", "../../../assets/iconos/group_6.png");
      document.getElementById("mediano").setAttribute("src", "../../../assets/iconos/group_6@2x.png");
      document.getElementById("grande").setAttribute("src","../../../assets/iconos/groupCopy_3.png")
    }
    this.filtros = true;
    this.width = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    console.log(this.width);

    }

  escribeTitulo(animal){
    document.getElementById("tipo").setAttribute("style", "display: block");
    document.getElementById("tipoTitulo").innerText = "Tipo de " + animal;
  }

  aplicarFiltros(){
    let ciudad = (<HTMLInputElement>document.getElementById("ciudad")).value;
    this.ciudad = ciudad;

    let edad = (<HTMLInputElement>document.getElementById("edad")).value;
    this.edad = edad;

    let filtros = {
      ciudad: this.ciudad,
      edad: this.edad,
      especie: this.especie,
      size: this.width,
      genero: this.genero
    }
    
    this.httpService.obtenerFiltrosAnimal(filtros);
    this.route.navigate(["/adopcion"]);
    
  }

  
}

