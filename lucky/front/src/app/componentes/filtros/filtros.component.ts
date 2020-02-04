import { Component, OnInit } from '@angular/core';

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

  constructor() { 
    this.filtros = false;
  }

  ngOnInit() {
    document.getElementById("tipo").setAttribute("style", "display: none");
  }



  muestraAlgo(event){
    
    const animal = event.currentTarget.dataset.tipo;
    //alert(event.currentTarget.dataset.tipo);
    this.especie = animal;
    this.filtros = true;
    console.log(this.especie);

    switch(animal){
      case "perro":
        document.getElementById(animal).setAttribute("src", "../../../assets/iconos/perrop_2.png");
        document.getElementById("gato").setAttribute("src", "../../../assets/iconos/cat.png");
        document.getElementById("mamifero").setAttribute("src", "../../../assets/iconos/035CoatiCopy.png");
        document.getElementById("ave").setAttribute("src", "../../../assets/iconos/ave.png");
        this.escribeTitulo(animal);
        break;
      case "gato":
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
        document.getElementById("perro").setAttribute("src", "../../../assets/iconos/perrop.png");
        document.getElementById("gato").setAttribute("src", "../../../assets/iconos/cat.png");
        document.getElementById("mamifero").setAttribute("src", "../../../assets/iconos/035CoatiCopy.png");
        document.getElementById(animal).setAttribute("src", "../../../assets/iconos/aveRoja.png");
        this.escribeTitulo(animal);
        break;
    }
  }

  seleccionaGenero(event){
    const tipo = event.currentTarget.dataset.genero;
    
    if(tipo === "macho"){
      document.getElementById("macho").setAttribute("src", "../../../assets/iconos/male_2.png");
      document.getElementById("hembra").setAttribute("src", "../../../assets/iconos/female.png");

    }else{
      document.getElementById("hembra").setAttribute("src", "../../../assets/iconos/female_2.png");
      document.getElementById("macho").setAttribute("src", "../../../assets/iconos/male.png");

    }
    this.filtros = true;
    this.genero = tipo;
    console.log(this.genero);
  }

  seleccionaMedida(event){
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
    this.width = tipo;
    console.log(this.width);

    }

  escribeTitulo(animal){
    document.getElementById("tipo").setAttribute("style", "display: block");
    document.getElementById("tipoTitulo").innerText = "Tipo de " + animal;
  }
}

